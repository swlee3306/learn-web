#!/usr/bin/env bash
set -euo pipefail

# /learn 통합 QA (클러스터 내부 전용)
# - kubectl로 learn-web pod IP를 찾아서 직접 호출
# - 로그인/진행도/XP/문제풀이 페이지 스모크를 실제 사용자 플로우에 가깝게 검증

NS="${NS:-personal}"
APP_LABEL="${APP_LABEL:-app=learn-web}"
TIMEOUT_S="${TIMEOUT_S:-5}"

need() { command -v "$1" >/dev/null 2>&1 || { echo "Missing dependency: $1" >&2; exit 2; }; }
need kubectl
need curl
need grep
need sed
need tr

pod_name=$(kubectl -n "$NS" get pod -l "$APP_LABEL" -o jsonpath='{.items[0].metadata.name}')
pod_ip=$(kubectl -n "$NS" get pod -l "$APP_LABEL" -o jsonpath='{.items[0].status.podIP}')
image=$(kubectl -n "$NS" get deploy learn-web -o=jsonpath='{.spec.template.spec.containers[0].image}')

BASE="http://${pod_ip}:3000/learn"
JAR="${JAR:-/tmp/learn-qa-cookie.txt}"
rm -f "$JAR"

say() { printf "%s\n" "$*"; }

req_code() {
  local url="$1"
  curl -m "$TIMEOUT_S" -s -o /dev/null -w "%{http_code}" "$url" || true
}

assert_code() {
  local expected="$1"; shift
  local url="$1"; shift || true
  local code
  code=$(req_code "$url")
  if [[ "$code" != "$expected" ]]; then
    say "FAIL code expected=$expected got=$code url=$url" >&2
    exit 1
  fi
  say "OK   $code $url"
}

assert_json_field() {
  local json="$1"
  local needle="$2"
  if ! printf "%s" "$json" | grep -q "$needle"; then
    say "FAIL json missing: $needle" >&2
    say "json=$json" >&2
    exit 1
  fi
}

say "== learn integration QA =="
say "pod=$pod_name ip=$pod_ip image=$image base=$BASE"

# 1) Routes smoke
assert_code 307 "$BASE"
assert_code 200 "$BASE/ko"
assert_code 200 "$BASE/ko/me"
assert_code 200 "$BASE/ko/web/mission-1"
assert_code 200 "$BASE/ko/problems"
assert_code 200 "$BASE/ko/problems/1"

# 2) Unauthed API expectations
una_me=$(curl -m "$TIMEOUT_S" -s "$BASE/api/me")
assert_json_field "$una_me" '"ok":true'
assert_json_field "$una_me" '"user":null'

# 3) Register + login (username 기반)
USER_BASE="${USER:-itest}"
# username: 3~20 chars, [a-zA-Z0-9_]+
# keep it short to avoid hitting the 20-char limit.
user_prefix=$(printf "%s" "$USER_BASE" | tr -cd 'a-zA-Z0-9_' | cut -c1-6)
[[ -z "$user_prefix" ]] && user_prefix="itest"
short_ts=$(( $(date +%s) % 1000000 ))
short_r=$(( RANDOM % 1000 ))
USER="${user_prefix}_${short_ts}_${short_r}"
PASS="${PASS:-testpass123!}"

say "-- register user=$USER"
reg=$(curl -m "$TIMEOUT_S" -s -c "$JAR" -H 'content-type: application/json' \
  -d "{\"username\":\"$USER\",\"password\":\"$PASS\"}" \
  "$BASE/api/auth/register")
assert_json_field "$reg" '"ok":true'

say "-- me (authed)"
me=$(curl -m "$TIMEOUT_S" -s -b "$JAR" "$BASE/api/me")
assert_json_field "$me" '"ok":true'
assert_json_field "$me" "\"username\":\"$USER\""

say "-- progress/me (initial)"
prog=$(curl -m "$TIMEOUT_S" -s -b "$JAR" "$BASE/api/progress/me")
assert_json_field "$prog" '"ok":true'
assert_json_field "$prog" '"totalXp":0'
assert_json_field "$prog" '"level":1'

# 4) Change password (auth-only flow) then re-login
say "-- change password"
NEWPASS="${NEWPASS:-newpass123$}"
chpw=$(curl -m "$TIMEOUT_S" -s -b "$JAR" -H 'content-type: application/json' \
  -d "{\"currentPassword\":\"$PASS\",\"newPassword\":\"$NEWPASS\"}" \
  "$BASE/api/auth/change-password")
assert_json_field "$chpw" '"ok":true'

say "-- logout"
lo=$(curl -m "$TIMEOUT_S" -s -b "$JAR" -c "$JAR" -X POST "$BASE/api/auth/logout")
assert_json_field "$lo" '"ok":true'

say "-- login with new password"
li=$(curl -m "$TIMEOUT_S" -s -c "$JAR" -H 'content-type: application/json' \
  -d "{\"username\":\"$USER\",\"password\":\"$NEWPASS\"}" \
  "$BASE/api/auth/login")
assert_json_field "$li" '"ok":true'
PASS="$NEWPASS"

# 5) Complete missions 1..5 and validate server-side XP/streak
for mid in mission-1 mission-2 mission-3 mission-4 mission-5; do
  say "-- complete $mid"
  resp=$(curl -m "$TIMEOUT_S" -s -b "$JAR" -H 'content-type: application/json' \
    -d "{\"missionId\":\"$mid\"}" \
    "$BASE/api/progress/complete")
  assert_json_field "$resp" '"ok":true'
done

say "-- progress/me (after completes)"
prog2=$(curl -m "$TIMEOUT_S" -s -b "$JAR" "$BASE/api/progress/me")
assert_json_field "$prog2" '"ok":true'
# expected totalXp = (12+15+18+20+22)*10 = 870
assert_json_field "$prog2" '"totalXp":870'
# streak is day-based (not mission count). Completing multiple missions today should yield streak=1.
assert_json_field "$prog2" '"streak":1'

# 5) Uncomplete mission-5 and validate XP decreases
say "-- uncomplete mission-5"
resp=$(curl -m "$TIMEOUT_S" -s -b "$JAR" -H 'content-type: application/json' \
  -d '{"missionId":"mission-5"}' \
  "$BASE/api/progress/uncomplete")
assert_json_field "$resp" '"ok":true'

say "-- progress/me (after uncomplete)"
prog3=$(curl -m "$TIMEOUT_S" -s -b "$JAR" "$BASE/api/progress/me")
assert_json_field "$prog3" '"ok":true'
# mission-5 minutes=22 -> 220xp, so 870-220=650
assert_json_field "$prog3" '"totalXp":650'

# 6) Problems page sanity (HTML contains expected Korean title)
html=$(curl -m "$TIMEOUT_S" -s "$BASE/ko/problems")
if ! printf "%s" "$html" | grep -q '문제 풀이'; then
  say "FAIL problems page missing title text" >&2
  exit 1
fi
say "OK   problems page contains title text"

say "== PASS =="
