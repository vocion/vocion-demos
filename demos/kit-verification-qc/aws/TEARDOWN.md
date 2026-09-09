# Kit Verification QC demo — AWS resources and teardown

Everything the demo created in AWS (account `<aws-account-id>`, profile `metacto`, region `us-east-1`) is tagged
`Project=kitqc-demo`, `Owner=metacto`, `TearDown=true` where the service supports tags. Nothing runs
outside these resources.

| Resource | Name / ARN | Cost while it exists | Notes |
|---|---|---|---|
| S3 bucket | `metacto-kitqc-demo-<aws-account-id>` | ~49 MB storage (cents) | `templates/<kit>/<good|bad>/`, `inbox/`, `manifests/`, `output/` (training output). Public access blocked; bucket policy grants `rekognition.amazonaws.com` read/write. |
| Rekognition Custom Labels project | `arn:aws:rekognition:us-east-1:<aws-account-id>:project/kitqc-condition/1788362445840` | none | Datasets: train (64) + test (8), 4 labels `<kit>_good` / `<kit>_bad`. |
| Rekognition model (project version) | `…/project/kitqc-condition/version/v1/1788362705155` | Training: ~$1/hr while `TRAINING_IN_PROGRESS`. **Inference: ~$4/hr per inference unit while `RUNNING`** — stop it after the demo. | Started/stopped by `start-model.sh` / `stop-model.sh`. |

There is **no** Lambda, EventBridge rule, IAM role, SageMaker endpoint or Greengrass deployment. The S3 events → workflow
trigger described in the brief is not built.

## Day-to-day cost control

```bash
./aws/stop-model.sh     # after every demo — the model endpoint is the only meaningful running cost
./aws/start-model.sh    # ~10–15 min before a demo; waits until RUNNING
```

## Full teardown

```bash
./aws/teardown.sh       # stops + deletes the model, deletes datasets + project, empties + deletes the bucket
```

The local Vocion side (database `vocion_kit_verification_qc`, the workspace, the seed) is untouched by teardown; the
`kit-photos` source and any `inspection` rows will simply point at a bucket that no longer exists.
