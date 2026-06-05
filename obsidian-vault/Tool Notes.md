# Tool Notes

## Google Sheets + Gemini
**Used for:** Pivot tables, NETWORKDAYS formulas, COUNTIFS,
conditional formatting, funnel summary, channel performance table.

**What worked:** Gemini built COUNTIFS correctly on first attempt
when column names were clean. Conditional formatting prompts
worked well. NETWORKDAYS formula prompt required one correction
(needed to specify empty cell handling).

**Lesson:** Keep column headers simple — no slashes, brackets,
or special characters. Gemini misreads them in formula references.

**Verdict:** Replaces 80% of manual formula work for analysts who
know what output they want. Not a replacement for knowing Excel.
→ [[Methodology]]

---

## Airtable
**Used for:** Pipeline kanban view, linked HM/department tables,
Interface dashboard, automations for follow-up triggers.

**What worked:** Linked records (Applicant → Hiring Manager) make
clicking through to a manager's full pipeline effortless.
Kanban view is genuinely useful for daily recruiter workflow.

**What was tricky:** Free tier automations cap at 100/month —
hit this in testing for a 350-record pipeline. Needs Pro plan 
for production use.

**Verdict:** Operational tool (daily recruiter use), not analytical
tool (reporting). Use alongside Google Sheets, not instead.


---

## Obsidian
**Used for:** This vault — methodology documentation, insight logging,
analytical thinking capture.

**What worked:** Graph View makes the links between concepts visual.
Showing [[Methodology]] → [[SLA Analysis]] → [[Red Flags]] 
as a connected graph communicates analytical rigor better than 
any slide deck.

**What was tricky:** Default vault has no folder structure.
Kept it flat for this project (all notes in root). Works fine
at 10–15 notes. Would need folder structure above 30 notes.

**Verdict:** Every analyst doing a multi-tool project should maintain
something like this. The alternative is insights scattered across
chat windows, Notion pages, and mental notes — all irrecoverable.

---

## Looker Studio ← add after Phase 4
## Power BI ← add after Phase 4

 [[KPI Dashboard]]
