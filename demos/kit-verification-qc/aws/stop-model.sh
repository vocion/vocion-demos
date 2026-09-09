#!/usr/bin/env bash
# Stop the Rekognition Custom Labels model endpoint (ends the ~$4/hr inference charge).
set -euo pipefail
export AWS_PROFILE="${AWS_PROFILE:-metacto}" AWS_DEFAULT_REGION=us-east-1
PROJECT="arn:aws:rekognition:us-east-1:<aws-account-id>:project/kitqc-condition/1788362445840"
ARN=$(aws rekognition describe-project-versions --project-arn "$PROJECT" --output text --query 'ProjectVersionDescriptions[0].ProjectVersionArn')
STATUS=$(aws rekognition describe-project-versions --project-arn "$PROJECT" --output text --query 'ProjectVersionDescriptions[0].Status')
echo "model: $ARN ($STATUS)"
if [ "$STATUS" = "RUNNING" ] || [ "$STATUS" = "STARTING" ]; then
  aws rekognition stop-project-version --project-version-arn "$ARN" >/dev/null && echo "stopping…"
else
  echo "not running — nothing to stop"
fi
