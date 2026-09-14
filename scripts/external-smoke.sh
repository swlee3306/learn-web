#!/usr/bin/env bash
set -euo pipefail

# External smoke check (public URL).
# Usage:
#   BASE=https://example.invalid/learn ./scripts/external-smoke.sh

# NOTE: When running *inside the same LAN* as the server, some routers block
# hairpin NAT (NAT loopback). In that case the public domain may time out.
# Supply your authorized test endpoint explicitly; no default target is contacted.
BASE="${BASE:?Set the authorized test endpoint explicitly}"
TIMEOUT_S="${TIMEOUT_S:-8}"

need() { command -v "$1" >/dev/null 2>&1 || { echo "Missing dependency: $1" >&2; exit 2; }; }
need curl

say() { printf "%s\n" "$*"; }

code() {
  local url="$1"
  # -L: follow redirects (we still print final code)
  local out
  if out=$(curl -L -m "$TIMEOUT_S" -sS -o /dev/null -w "%{http_code}" "$url" 2>/dev/null); then
    printf "%s" "$out"
  else
    printf "000"
  fi
}

assert_code() {
  local expected="$1"; shift
  local url="$1"; shift || true
  local got
  got=$(code "$url")
  if [[ "$got" != "$expected" ]]; then
    say "FAIL expected=$expected got=$got url=$url" >&2
    exit 1
  fi
  say "OK   $got $url"
}

say "== learn external smoke =="
say "base=$BASE"

# Root often redirects to locale.
root_code=$(code "$BASE/")
if [[ "$root_code" != "200" && "$root_code" != "307" && "$root_code" != "308" ]]; then
  say "FAIL unexpected root code=$root_code url=$BASE/" >&2
  exit 1
fi
say "OK   $root_code $BASE/"

assert_code 200 "$BASE/ko"
assert_code 200 "$BASE/api/health"

say "== PASS =="
