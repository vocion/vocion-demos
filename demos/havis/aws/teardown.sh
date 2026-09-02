#!/usr/bin/env bash
# Delete every AWS resource the Havis demo created. Irreversible. Asks once.
set -euo pipefail
export AWS_PROFILE="${AWS_PROFILE:-metacto}" AWS_DEFAULT_REGION=us-east-1
BUCKET="metacto-havis-demo-339712698650"
PROJECT="arn:aws:rekognition:us-east-1:339712698650:project/havis-kit-condition/1788362445840"
echo "This deletes bucket s3://$BUCKET and Rekognition project $PROJECT (model + datasets)."
read -r -p "Type 'havis' to continue: " ANS; [ "$ANS" = "havis" ] || { echo "aborted"; exit 1; }

for ARN in $(aws rekognition describe-project-versions --project-arn "$PROJECT" --output text --query 'ProjectVersionDescriptions[].ProjectVersionArn' 2>/dev/null); do
  S=$(aws rekognition describe-project-versions --project-arn "$PROJECT" --version-names "$(basename "$(dirname "$ARN")")" --output text --query 'ProjectVersionDescriptions[0].Status')
  if [ "$S" = "RUNNING" ] || [ "$S" = "STARTING" ]; then aws rekognition stop-project-version --project-version-arn "$ARN" >/dev/null; echo "stopping $ARN"; fi
  for i in $(seq 1 40); do S=$(aws rekognition describe-project-versions --project-arn "$PROJECT" --output text --query "ProjectVersionDescriptions[?ProjectVersionArn=='$ARN'].Status | [0]"); case "$S" in RUNNING|STARTING|STOPPING|TRAINING_IN_PROGRESS) sleep 15;; *) break;; esac; done
  aws rekognition delete-project-version --project-version-arn "$ARN" >/dev/null && echo "deleted model $ARN"
done
for D in $(aws rekognition describe-project-versions --project-arn "$PROJECT" --output text --query 'length(ProjectVersionDescriptions)' >/dev/null 2>&1; aws rekognition describe-projects --project-names havis-kit-condition --output text --query 'ProjectDescriptions[0].Datasets[].DatasetArn' 2>/dev/null); do
  aws rekognition delete-dataset --dataset-arn "$D" >/dev/null && echo "deleted dataset $D"
done
sleep 5
aws rekognition delete-project --project-arn "$PROJECT" >/dev/null && echo "deleted project"
aws s3 rm "s3://$BUCKET" --recursive --quiet && aws s3api delete-bucket --bucket "$BUCKET" && echo "deleted bucket"
echo "done — nothing tagged Project=havis-demo remains"
