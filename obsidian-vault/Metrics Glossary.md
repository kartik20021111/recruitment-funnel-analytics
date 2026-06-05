# Metrics Glossary

**Time to Hire** — Business days from Date Applied to Date Joined.
Measures the candidate's journey through the process.

**Time to Fill** — Calendar/business days from Date Requisition Opened
to Date Offer Accepted. Measures the organization's hiring velocity
from when the need was identified.

**NETWORKDAYS to Hire** — Same as TTH but explicitly using Excel's
NETWORKDAYS function to exclude weekends. More accurate for SLA tracking.

**Stage Conversion Rate** — Candidates reaching Stage N / 
Candidates reaching Stage N-1. Expressed as a percentage.
Not to be confused with application-to-stage rate.

**Offer Acceptance Rate** — Offer Accepted / Offer Made.
Should be tracked separately from join rate because
no-shows after acceptance are a different failure mode.

**SLA Compliance Rate** — % of candidates processed within the 
agreed time window at each stage. Each SLA has a different owner
and a different remediation.

**Funnel Stage Reached** — The furthest stage a candidate achieved,
regardless of their final outcome. Used for cumulative funnel counts.

**Current Stage** — The candidate's final disposition:
Joined, Offer Accepted, Withdrew, Rejected, On Hold.
Not the same as Funnel Stage Reached.

**Source Quality Index** — App-to-join conversion rate by channel.
The correct way to compare channels, not application volume.

→ All these metrics are applied in [[KPI Dashboard]]
→ Design rationale in [[Methodology]]
