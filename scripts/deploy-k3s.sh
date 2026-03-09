#!/usr/bin/env bash
set -euo pipefail

# Deploy learn-web to a single-node k3s cluster on the same machine.
#
# Default assumptions:
# - docker is available locally (build happens here)
# - k3s uses containerd, so we import the image via `k3s ctr`
# - Kubernetes namespace: personal
# - App is served under /learn (see k8s/learn/*)
#
# Usage examples:
#   TAG=0.1.38 ./scripts/deploy-k3s.sh
#   TAG=0.1.39 NS=personal ./scripts/deploy-k3s.sh
#   TAG=dev-$(date +%Y%m%d-%H%M) ./scripts/deploy-k3s.sh
#
# Optional flags:
#   SKIP_IMPORT=1   # skip k3s image import (if your cluster can pull the image)
#   APPLY_ONLY=1    # skip docker build/import, just apply manifests + rollout

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
K8S_DIR="${K8S_DIR:-/home/sulee/.openclaw/workspace/k8s/learn}"
NS="${NS:-personal}"
DEPLOY="${DEPLOY:-learn-web}"
# container name in k8s/learn/learn-web.yaml is "web"
CONTAINER="${CONTAINER:-web}"
TAG="${TAG:-0.1.38}"
IMAGE="learn-web:${TAG}"
APPLY_INGRESS="${APPLY_INGRESS:-0}"

need() { command -v "$1" >/dev/null 2>&1 || { echo "Missing dependency: $1" >&2; exit 2; }; }
need kubectl
need bash

if [[ "${APPLY_ONLY:-0}" != "1" ]]; then
  need docker
  need sudo
  need k3s
fi

say() { printf "%s\n" "$*"; }

say "== deploy learn-web to k3s =="
say "root=${ROOT_DIR}"
say "k8s_dir=${K8S_DIR}"
say "ns=${NS} image=${IMAGE}"

if [[ "${APPLY_ONLY:-0}" != "1" ]]; then
  say "[1/4] docker build ${IMAGE}"
  (cd "${ROOT_DIR}" && docker build -t "${IMAGE}" .)

  if [[ "${SKIP_IMPORT:-0}" != "1" ]]; then
    say "[2/4] import image into k3s containerd"
    # Stream docker save into k3s ctr (no temp tarball).
    docker save "${IMAGE}" | sudo -n k3s ctr images import -
  else
    say "[2/4] SKIP_IMPORT=1 (skipping k3s image import)"
  fi
else
  say "[1/4] APPLY_ONLY=1 (skipping docker build/import)"
fi

say "[3/4] apply manifests"
# Base deployment/service
kubectl apply -f "${K8S_DIR}/learn-web.yaml"
# Optional ingress (off by default to avoid conflicts with existing ingress rules)
if [[ "${APPLY_INGRESS}" == "1" && -f "${K8S_DIR}/learn-ingress.yaml" ]]; then
  kubectl apply -f "${K8S_DIR}/learn-ingress.yaml"
else
  say "[3/4] ingress: skip (set APPLY_INGRESS=1 to apply ${K8S_DIR}/learn-ingress.yaml)"
fi

say "[4/4] set image + rollout"
kubectl -n "${NS}" set image "deploy/${DEPLOY}" "${CONTAINER}=${IMAGE}"
kubectl -n "${NS}" rollout status "deploy/${DEPLOY}" --timeout=120s

say "== DONE =="
