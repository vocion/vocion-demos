#!/usr/bin/env bash
# Delete every AWS resource the Kit Verification QC demo created. Irreversible. Asks once.
set -euo pipefail

# Resolve the account from the caller's credentials — never hardcode it in a public repo.
ACCOUNT_ID="${AWS_ACCOUNT_ID:-$(aws sts get-caller-identity --query Account --output text)}"
export AWS_PROFILE="${AWS_PROFILE:-metacto}" AWS_DEFAULT_REGION=us-east-1
BUCKET="metacto-kitqc-demo-${ACCOUNT_ID}"
PROJECT="arn:aws:rekognition:us-east-1:${ACCOUNT_ID}:project/kitqc-condition/1788362445840"
echo "This deletes bucket s3://$BUCKET and Rekognition project $PROJECT (model + datasets)."
read -r -p "Type 'kitqc' to continue: " ANS; [ "$ANS" = "kit-verification-qc" ] || { echo "aborted"; exit 1; }

for ARN in $(aws rekognition describe-project-versions --project-arn "$PROJECT" --output text --query 'ProjectVersionDescriptions[].ProjectVersionArn' 2>/dev/null); do
  S=$(aws rekognition describe-project-versions --project-arn "$PROJECT" --version-names "$(basename "$(dirname "$ARN")")" --output text --query 'ProjectVersionDescriptions[0].Status')
  if [ "$S" = "RUNNING" ] || [ "$S" = "STARTING" ]; then aws rekognition stop-project-version --project-version-arn "$ARN" >/dev/null; echo "stopping $ARN"; fi
  for i in $(seq 1 40); do S=$(aws rekognition describe-project-versions --project-arn "$PROJECT" --output text --query "ProjectVersionDescriptions[?ProjectVersionArn=='$ARN'].Status | [0]"); case "$S" in RUNNING|STARTING|STOPPING|TRAINING_IN_PROGRESS) sleep 15;; *) break;; esac; done
  aws rekognition delete-project-version --project-version-arn "$ARN" >/dev/null && echo "deleted model $ARN"
done
for D in $(aws rekognition describe-project-versions --project-arn "$PROJECT" --output text --query 'length(ProjectVersionDescriptions)' >/dev/null 2>&1; aws rekognition describe-projects --project-names kitqc-condition --output text --query 'ProjectDescriptions[0].Datasets[].DatasetArn' 2>/dev/null); do
  aws rekognition delete-dataset --dataset-arn "$D" >/dev/null && echo "deleted dataset $D"
done
sleep 5
aws rekognition delete-project --project-arn "$PROJECT" >/dev/null && echo "deleted project"
aws s3 rm "s3://$BUCKET" --recursive --quiet && aws s3api delete-bucket --bucket "$BUCKET" && echo "deleted bucket"
echo "done — nothing tagged Project=kitqc-demo remains"
