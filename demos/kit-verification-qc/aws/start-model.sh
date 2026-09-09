#!/usr/bin/env bash
# Start the Rekognition Custom Labels model (1 inference unit, ~$4/hr). Waits until RUNNING.
set -euo pipefail
export AWS_PROFILE="${AWS_PROFILE:-metacto}" AWS_DEFAULT_REGION=us-east-1
PROJECT="arn:aws:rekognition:us-east-1:<aws-account-id>:project/kitqc-condition/1788362445840"
ARN=$(aws rekognition describe-project-versions --project-arn "$PROJECT" --output text --query 'ProjectVersionDescriptions[0].ProjectVersionArn')
STATUS=$(aws rekognition describe-project-versions --project-arn "$PROJECT" --output text --query 'ProjectVersionDescriptions[0].Status')
echo "model: $ARN ($STATUS)"
case "$STATUS" in
  RUNNING) echo "already running"; exit 0;;
  TRAINING_COMPLETED|STOPPED) aws rekognition start-project-version --project-version-arn "$ARN" --min-inference-units 1 >/dev/null; echo "starting…";;
  STARTING) echo "already starting…";;
  *) echo "cannot start from status $STATUS"; exit 1;;
esac
for i in $(seq 1 60); do
  S=$(aws rekognition describe-project-versions --project-arn "$PROJECT" --output text --query 'ProjectVersionDescriptions[0].Status')
  echo "  $S"; [ "$S" = "RUNNING" ] && { echo "RUNNING — remember ./aws/stop-model.sh afterwards"; exit 0; }
  sleep 15
done
echo "timed out waiting for RUNNING"; exit 1
