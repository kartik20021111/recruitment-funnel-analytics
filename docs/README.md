# Project Summary

## The Question
Out of 1,000 people who applied for jobs, exactly where did 
the other 960 go, why, and what did it cost in time?

## The Dataset
1,000 applicant records across 10 departments and 6 source channels.
Jan 2023 to Mar 2025. 37 columns including all stage dates, 
time calculations, SLA compliance flags, and offer decline reasons.

## The Methodology
Two stage columns — Funnel Stage Reached and Current Stage — 
to enable accurate cumulative funnel counts.
NETWORKDAYS for all time calculations to exclude weekends.
Time to Fill tracked separately from Time to Hire.
Four SLA columns with named stage owners.
Offer Decline Reason separated from Dropout Reason.

## The Key Numbers
- 1,000 applied. 40 joined. 4.0% hire rate.
- 139 On Hold. 732 Rejected. 82 Withdrew.
- Avg Time to Hire: 55.2 days. Avg Time to Fill: 51.8 days.
- SLA4 compliance: 33%. Offer decline rate: 32.9%.
- Employee Referral conversion: 5.5%. LinkedIn: 3.5%.

## The Tools
Google Sheets — data layer
Gemini in Sheets — formula generation
Airtable — pipeline tracking
Looker Studio — operational dashboard (7 pages)
Observable — custom visualisations (11 charts)
Notion — stakeholder hub
Obsidian — methodology documentation
GitHub — version control and portfolio

## Live Links
- [Dashboard](https://datastudio.google.com/reporting/7e1570b5-a045-428e-9aa9-a97edfcbcef5)
- [Notebook](https://observablehq.com/@kartik-sharma/recruitment-funnel-analytics-people-analytics-proj)
- [Hub](https://app.notion.com/p/Recruitment-Analytics-Project-Master-Hub-3750c9009543804ab2f7f8070eac66f4?source=copy_link)
