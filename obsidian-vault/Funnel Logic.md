# Funnel Logic

## The Core Problem with Stage Counting
Most ATS-generated funnel reports count candidates currently 
sitting at each stage. This is wrong for analysis.

A candidate who reached Offer Made and withdrew disappears from 
the Offer Made count — making the pipeline look smaller.
A candidate on hold at Shortlisted inflates that stage count
without contributing to any conversion downstream.

## How This Dataset Solves It
Two separate columns:
- **Funnel Stage Reached** — the furthest stage a candidate achieved
- **Current Stage** — their final outcome (Joined, Rejected, Withdrew, On Hold)

Funnel counts are calculated cumulatively:
"How many candidates REACHED this stage?" not
"How many are currently labelled at this stage?"

## The Correct Funnel for This Dataset
| Stage | Reached | % of Applied | Stage Conv |
|---|---|---|---|
| Applied | 1,000 | 100% | — |
| Shortlisted | 350 | 35% | 35% |
| Interview Scheduled | 220 | 22% | 63% |
| Interview Done | 165 | 16.5% | 75% |
| Offer Made | 70 | 7% | 42% |
| Offer Accepted | 47 | 4.7% | 67% |
| Joined | 40 | 4.0% | 85% |

## Where the Funnel Bleeds Most
The biggest drop-off is Applied → Shortlisted (65% lost).
This is normal in volume hiring. The signal to watch is whether
that 65% are being rejected for the right reasons.
→ See [[Insights Log]] and [[Red Flags]]

## Why the On Hold Problem is Invisible in Standard Reports
139 candidates are On Hold. They sit outside the funnel.
Standard reports show them as "active" — they inflate your
pipeline health metrics without contributing to hires.
A 30-day max On Hold policy would force re-evaluation 
and surface the true rejection count.
→ Referenced in [[Red Flags]]
