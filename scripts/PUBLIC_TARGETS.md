# Explicit test and deployment targets

As of 2026-09-14, `deploy-k3s.sh` requires `K8S_DIR` and `external-smoke.sh`
requires `BASE`. Personal path and internal endpoint defaults were removed.
Supply these values through your private deployment/test environment.

Example endpoints under `example.invalid` are documentation-only and do not work.
The deployment script can build/import images and apply Kubernetes resources;
setting `K8S_DIR` is not authorization to use an existing production cluster.
The E2E script can also operate a browser and resolve a pod address when BASE is
absent; that behavior is unchanged and the E2E script was not executed in this review.

The following test exercises only missing-input exits, before deployment or HTTP
commands are reached:

```sh
python3 -m unittest discover -s tests -p test_public_targets.py -v
```

Shell/JavaScript syntax checks do not prove deployment success. No cluster,
operating host or application endpoint was contacted during these checks.
Historical paths/endpoints may remain in Git history until separately addressed.
