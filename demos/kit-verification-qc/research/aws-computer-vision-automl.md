# AWS computer vision + AutoML — research notes

*Captured 2026-09-02 from an AI-search session (lightly cleaned; vendor claims
unverified). Context: the manufacturer — detect wrong or missing parts in a package assembly
layout. Images are organized by template id with Good / Bad labelled examples.*

## AWS AutoML options for computer vision

| Service | What it is | Fit |
|---|---|---|
| **Amazon Rekognition Custom Labels** | Fully managed CV service; build custom image/video analysis models with AutoML from as few as ~10 images per label. Built-in labelling UI, managed training, hosted inference endpoint (start/stop, billed per inference-hour). | Fastest path. Image classification (Good/Bad per template) and object detection (bounding boxes per part). |
| **Amazon SageMaker Canvas** | No-code visual workspace with AutoML to build, train and deploy models, including image classification and object detection. | When the team wants a no-code UI but more control over data/experiments than Rekognition offers. |
| **AutoGluon** (open source, AWS) | Python AutoML library: image classification, object detection, text, tabular with minimal code, trained on EC2/SageMaker. | Code-first path; gives us model artifacts we own and can host anywhere (SageMaker endpoint, edge). |

Quote (AWS Open Source Blog): "Using AutoGluon, you can train state-of-the-art
machine learning models for image classification, object detection, text
classification, and tabular data prediction with little to no prior experience in
machine learning."

## Recommended workflow for "wrong or missing parts in an assembly layout"

Use **Rekognition Custom Labels** (or SageMaker Canvas) — both do object detection
and anomaly localization, which is what QC needs.

1. **Prepare and upload the dataset**
   - Fixed camera angle, consistent lighting.
   - Include perfectly assembled layouts, layouts with missing parts, and layouts with wrong parts.
   - Store raw images in S3. (the manufacturer already has these organized by template id, Good/Bad.)
2. **Label the images**
   - Bounding boxes around every individual part; descriptive labels (`correct_bolt`, `missing_washer`, `wrong_bracket`).
   - Rekognition Custom Labels' built-in labelling UI, or SageMaker Ground Truth for larger teams.
3. **Train the AutoML model**
   - One click; the service handles model selection, feature engineering, hyperparameter tuning.
   - Evaluate precision / recall / F1 per label.
4. **Deploy and integrate**
   - Host the model on a managed endpoint.
   - Send production-line photos to the endpoint via the AWS SDK.
   - Parse the JSON response: are the required labels present and correctly positioned?

## Cloud vs edge

| Deployment | AWS services | Best for |
|---|---|---|
| Cloud AutoML | Rekognition Custom Labels | High-accuracy auditing, lower line speeds, easy setup |
| Edge AutoML | SageMaker Edge Manager + AWS IoT Greengrass | Millisecond decisions on a fast conveyor, offline operation, on-prem cameras |

## Open questions to bring to the manufacturer

- Cycle time / line speed — does a 1–3 s cloud round-trip fit, or is this an edge case?
- Any existing on-prem edge device (NVIDIA Jetson, industrial PC) at the pack station?
- Image inventory: how many templates, how many Good/Bad examples per template, are Bad
  examples labelled by *what* is wrong (missing vs wrong part) or just "Bad"?
- Are the images already bounding-box labelled, or only classified whole-image?

## Sources (as cited in the session)

- Amazon Rekognition — https://aws.amazon.com/rekognition/
- Amazon SageMaker Canvas (no-code ML) — https://aws.amazon.com/sagemaker/canvas/
- AWS Open Source Blog — "Machine learning with AutoGluon, an open source AutoML library"
