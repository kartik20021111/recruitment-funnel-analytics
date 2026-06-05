# SLA Analysis

## What Each SLA Measures
| SLA  | Stage                           | Window          | Owner          |
| ---- | ------------------------------- | --------------- | -------------- |
| SLA1 | Application → Shortlist         | 5 business days | Recruiter      |
| SLA2 | Shortlist → Interview Scheduled | 7 business days | Recruiter + HM |
| SLA3 | Interview Done → Feedback       | 3 business days | Hiring Panel   |
| SLA4 | Offer Made → Offer Accepted     | 5 business days | Recruiter      |

## Compliance Rates (from dataset)
- SLA1: 55% (194 Yes / 156 No)
- SLA2: 69% (152 Yes / 68 No)
- SLA3: 100% (165 Yes — flag for data quality review)
- SLA4: 33% (23 Yes / 47 No) ← critical failure

## What 100% SLA3 Compliance Signals
This likely means SLA3 was only populated for candidates where
feedback was given promptly, not for all interview records.
In a real system you would check if SLA3 = blank vs SLA3 = No.
This is a data quality annotation worth flagging in any presentation.
→ [[Methodology]]

## SLA4 Root Cause Analysis
33% compliance means 67% of offers sit beyond the 5-day window.
Likely causes in priority order:
1. Approval chain delays — offer letter requires 2–3 sign-offs
2. Recruiter not following up proactively after day 2
3. Candidate fielding competing offers and stalling for time
4. Verbal offer given, formal letter delayed

## Benchmark Context
Industry benchmark for offer acceptance SLA in mid-size tech/MNC:
3–5 business days. Anything beyond 7 days loses >40% of candidates
to competing offers (SHRM 2023 Talent Acquisition Benchmarking).
→ [[Insights Log]], [[Red Flags]]
