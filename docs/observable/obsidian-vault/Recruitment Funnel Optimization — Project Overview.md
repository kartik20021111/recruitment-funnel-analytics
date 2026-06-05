# Recruitment Funnel Optimization — Project Overview

## Business Problem
Most hiring teams in MNCs track one number: how many people joined.
They cannot tell you where candidates are dropping, which sourcing
channel is worth its cost, or why offers are being declined.
This project builds the infrastructure to answer those questions
using real analytical design — not just a dashboard.

## Why This Project Exists

Most analytics projects are built to demonstrate tools.
This one was built to understand gaps. 

Check [[Real World Context]]
## Dataset Summary
- 1,000 applicant records, Jan 2023 – Mar 2025
- 10 departments, 6 source channels, 30 hiring managers
- 8 core columns added beyond the basic funnel:
  NETWORKDAYS to Hire, Date Requisition Opened, Time to Fill,
  Offer Decline Reason, SLA1–SLA4 compliance flags

## Decisions This Data Should Help Make
1. Which sourcing channel should get more budget next quarter?
2. At which stage is the pipeline leaking most — and why?
3. Which departments have SLA compliance problems?
4. Is the offer decline rate a compensation problem or a speed problem?
5. What is the gap between Time to Hire and Time to Fill — and
   what does that gap tell us about internal process inefficiency?

## How to Navigate This Vault
- [[Methodology]] — every analytical decision with rationale
- [[Funnel Logic]] — how the funnel was designed and why
- [[Insights Log]] — running findings from the data
- [[Red Flags]] — patterns that signal urgent action
- [[SLA Analysis]] — SLA compliance breakdown by stage
- [[Channel Deep Dive]] — sourcing channel ROI analysis
- [[KPI Dashboard]] — master list of metrics being tracked
- [[Metrics Glossary]] — definitions for every metric
- [[Tool Notes]] — working log of every tool used
- [[Interview Prep]] — talking points from this project

## Project Status
- [x] Phase 1 — Data generation (1,000 rows)
- [x] Phase 2 — Excel analytics workbook (5 sheets)
- [x] Phase 3 — Obsidian knowledge base
- [ ] Phase 4 — Looker Studio / Power BI dashboard
- [ ] Phase 5 — LinkedIn post and portfolio write-up