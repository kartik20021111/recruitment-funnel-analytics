# Methodology

## Core Design Philosophy
Every column exists because it answers a question a CHRO or 
hiring manager would plausibly ask in a QBR.
If a column cannot be tied to a decision, it is not in the dataset.

## Funnel Design
→ See [[Funnel Logic]] for full detail.

## Column Design Decisions

### Why NETWORKDAYS instead of calendar days
Calendar days include weekends. Interviews don't happen on weekends.
A gap from Friday to Monday = 1 business day, not 3 calendar days.
Using calendar days overstates delays and penalizes hiring managers
for processes that paused over a weekend. NETWORKDAYS is what
every serious TA analytics function uses for SLA tracking.

### Why Time to Fill is separate from Time to Hire
Time to Hire = application date to joining date (candidate's journey).
Time to Fill = requisition open date to offer acceptance (org's journey).
These measure different things.
A 55-day Time to Fill with a 40-day Time to Hire means 15 days
elapsed between the req opening and the first application arriving —
that's a sourcing activation problem, not a process problem.
Mixing these two hides where the delay actually is.
→ Referenced in [[SLA Analysis]]

### Why Offer Decline Reason is tracked separately from Dropout Reason
Dropout Reason = candidate withdrew during the process.
Offer Decline Reason = candidate rejected the final offer.
These are fundamentally different signals.
Dropout during process = usually speed or communication issue.
Offer declined = usually compensation, competing offer, or
the candidate was never fully committed.
Acting on dropout data to fix offer decline is wasted effort.
→ Referenced in [[Channel Deep Dive]] and [[Red Flags]]

### Why 4 SLA columns
SLA1 = application to shortlist within 5 business days
SLA2 = shortlist to interview scheduled within 7 business days
SLA3 = interview done to feedback within 3 business days
SLA4 = offer made to offer accepted within 5 business days
Each stage has a different owner and a different fix when it fails.
SLA1 failure = recruiter bandwidth issue
SLA2 failure = hiring manager availability issue
SLA3 failure = panel coordination issue
SLA4 failure = offer competitiveness or counter-offer issue
Aggregating them into a single SLA metric destroys accountability.
→ Full analysis in [[SLA Analysis]]

## What is NOT in this dataset and why
- Interview scores: would require a separate linked table
- Referrer name for Employee Referral: privacy concern in real systems
- Offer CTC breakdown (base/bonus/equity): scope not required at funnel level
