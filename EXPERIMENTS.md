# Experiments Log (Template)

Use this file to keep an honest record of what you ran. Professors usually ask for this indirectly.

## Setup
- Machine: (CPU / GPU, RAM)
- OS: Windows
- Python: 3.11
- Dataset(s): (DFDC sample / FaceForensics++ subset / Celeb-DF subset)

## Runs

### Run 1 — Baseline (quick)
- Date:
- Command:
  - `python backend/train.py --dfdc_dir ... --max_per_class 30 --epochs 3 --sequence_length 10 --save_path backend/model_weights.h5`
- Notes:
- Result summary:

### Run 2 — Sequence length ablation
- Date:
- Command:
  - `python backend/train.py ... --sequence_length 6`
  - `python backend/train.py ... --sequence_length 10`
  - `python backend/train.py ... --sequence_length 16`
- Notes:
- Result summary:

### Run 3 — Evaluation
- Date:
- Command:
  - `python backend/evaluate.py --weights backend/model_weights.h5 --dfdc_dir ... --sequence_length 10 --out_dir results --plot`
- Files produced:
  - `results/metrics_*.json`
  - `results/roc_*.png`

