// ── CHART 1: FUNNEL BAR CHART ──────────────────────────────────

{
  const funnelOrder = ["Applied","Shortlisted","Interview Scheduled",
    "Interview Done","Offer Made","Offer Accepted","Joined"]

  const counts = funnelOrder.map(stage => ({
    stage,
    count: raw.filter(d => {
      const stageNum = funnelOrder.indexOf(d["Funnel Stage Reached"])
      return stageNum >= funnelOrder.indexOf(stage)
    }).length
  }))

  return Plot.plot({
    title: "Recruitment Funnel — Cumulative Candidates at Each Stage",
    marginLeft: 180,
    marginRight: 80,
    marginTop: 30,
    marginBottom: 20,
    width: 900,
    height: 380,
    x: {label: "Candidates", domain: [0, 1100]},
    y: {label: null},
    marks: [
      Plot.barX(counts, {
        x: "count",
        y: "stage",
        sort: {y: null},
        fill: "#1A73E8",
        tip: true
      }),
      Plot.text(counts, {
        x: "count",
        y: "stage",
        text: d => d.count.toString(),
        dx: 12,
        fontSize: 12,
        fontWeight: "bold",
        fill: "#333333"
      })
    ]
  })
}

// ── CHART 2: SOURCE CHANNEL BUBBLE CHART ──────────────────────

{
  const sources = ["LinkedIn","Employee Referral","Job Board",
    "Campus Recruitment","Agency","Walk-in"]

  const bubbleData = sources.map(src => {
    const candidates = raw.filter(d => d["Source Channel"] === src)
    const joined = candidates.filter(d => d["Current Stage"] === "Joined")
    const tthValues = joined.map(d => d["Total Time to Hire (Days)"]).filter(d => d > 0)
    return {
      source: src,
      applications: candidates.length,
      joined: joined.length,
      avgTTH: tthValues.length ?
        Math.round(tthValues.reduce((a,b) => a+b, 0) / tthValues.length) : 0
    }
  })

  return Plot.plot({
    title: "Source Channel ROI — Volume vs Quality vs Speed",
    subtitle: "Bubble size = Avg Time to Hire. Higher up = more hires.",
    marginLeft: 60,
    marginRight: 120,
    marginTop: 50,
    marginBottom: 60,
    width: 800,
    height: 420,
    x: {
      label: "Total Applications →",
      domain: [0, 340],
      grid: true
    },
    y: {
      label: "↑ Candidates Joined",
      domain: [0, 18],
      grid: true
    },
    r: {range: [8, 22]},
    marks: [
      Plot.dot(bubbleData, {
        x: "applications",
        y: "joined",
        r: "avgTTH",
        fill: "source",
        fillOpacity: 0.65,
        stroke: "white",
        strokeWidth: 1.5,
        tip: true
      }),
      Plot.text(bubbleData, {
        x: "applications",
        y: "joined",
        text: d => d.source === "Campus Recruitment" ? "Campus" : d.source,
        dy: -20,
        fontSize: 10,
        fontWeight: "600",
        fill: "#222222"
      }),
      Plot.text(bubbleData, {
        x: "applications",
        y: "joined",
        text: d => `${d.joined} hires`,
        dy: 24,
        fontSize: 9,
        fill: "#555555"
      })
    ]
  })
}

// ── CHART 3: Candidate Outcomes by Department Bar Chart ──────────────────────

{
  const departments = [...new Set(raw.map(d => d.Department))].sort()
  const outcomes = ["Joined","Withdrew","On Hold","Rejected"]
  const colors = {"Joined":"#34A853","Withdrew":"#FBBC04","On Hold":"#9AA0A6","Rejected":"#EA4335"}

  const stackData = departments.flatMap(dept =>
    outcomes.map(outcome => ({
      dept,
      outcome,
      count: raw.filter(d => d.Department === dept && d["Current Stage"] === outcome).length
    }))
  )

  return Plot.plot({
    title: "Candidate Outcomes by Department",
    marginLeft: 120,
    width: 800,
    height: 400,
    x: {percent: true, label: "% of Applicants"},
    y: {label: null},
    color: {domain: outcomes, range: Object.values(colors), legend: true},
    marks: [
      Plot.barX(stackData, Plot.stackX({
        x: "count",
        y: "dept",
        fill: "outcome",
        order: outcomes,
        tip: true
      }))
    ]
  })
}

// ── CHART 4: Hiring Manager SLA Compliance — Speed by Stage Heatmap──────────────────────

{
  const hms = [...new Set(raw.map(d => d["Hiring Manager"]))].sort()
  const stageCols = [
    {key: "Days: Applied to Shortlist", label: "Apply→SL"},
    {key: "Days: Shortlist to Interview Sched", label: "SL→Intv"},
    {key: "Days: Interview Sched to Done", label: "Intv Sched→Done"},
    {key: "Days: Interview Done to Offer", label: "Intv→Offer"},
    {key: "Days: Offer to Acceptance", label: "Offer→Accept"}
  ]

  const heatData = hms.flatMap(hm =>
    stageCols.map(({key, label}) => {
      const vals = raw
        .filter(d => d["Hiring Manager"] === hm && d[key] > 0)
        .map(d => d[key])
      return {
        hm,
        stage: label,
        avg: vals.length ? Math.round(vals.reduce((a,b)=>a+b,0)/vals.length) : null
      }
    })
  )

  return Plot.plot({
    title: "Hiring Manager Speed by Stage (Avg Business Days)",
    subtitle: "Deeper red = slower. Use this to identify SLA breaches.",
    marginLeft: 80,
    marginTop: 60,
marginBottom: 20,
    width: 820,
    height: 700,
    x: {label: null, tickRotate: 0, tickSize: 0},
    y: {label: null},
    color: {
      type: "sequential",
      scheme: "YlOrRd",
      label: "Avg Days",
      legend: true
    },
    marks: [
      Plot.cell(heatData.filter(d => d.avg !== null), {
        x: "stage",
        y: "hm",
        fill: "avg",
        tip: true
      }),
      Plot.text(heatData.filter(d => d.avg !== null), {
        x: "stage",
        y: "hm",
        text: d => d.avg.toString(),
        fontSize: 10,
        fill: "black"
      })
    ]
  })
}

// ── CHART 5: Candidate Flow — From Source to Outcome Sankey──────────────────────

{
  const sources = ["LinkedIn","Employee Referral","Job Board","Campus Recruitment","Agency","Walk-in"]
  const outcomes = ["Joined","Rejected","On Hold","Withdrew"]

  const nodeNames = [...sources, ...outcomes]
  const nodeIndex = Object.fromEntries(nodeNames.map((n,i) => [n,i]))

  const linkMap = {}
  raw.forEach(d => {
    const src = d["Source Channel"]
    const out = d["Current Stage"]
    if (!src || !out) return
    const key = `${src}|${out}`
    linkMap[key] = (linkMap[key] || 0) + 1
  })

  const links = Object.entries(linkMap).map(([key, value]) => {
    const [src, tgt] = key.split("|")
    return {source: nodeIndex[src], target: nodeIndex[tgt], value}
  }).filter(l => l.source !== undefined && l.target !== undefined)

  const {sankey, sankeyLinkHorizontal} = d3Sankey
  const sankeyGen = sankey()
    .nodeWidth(18)
    .nodePadding(14)
    .extent([[1, 50],[800, 500]])

  const graph = sankeyGen({
    nodes: nodeNames.map((name,i) => ({name, index:i})),
    links: links.map(l => ({...l}))
  })

  const sourceColors = {
    "LinkedIn":"#4285F4","Employee Referral":"#34A853",
    "Job Board":"#FBBC04","Campus Recruitment":"#EA4335",
    "Agency":"#9C27B0","Walk-in":"#FF6D00"
  }
  const outcomeColors = {
    "Joined":"#1E8E3E","Rejected":"#C5221F","On Hold":"#9AA0A6","Withdrew":"#E37400"
  }

const svg = d3.create("svg")
    .attr("viewBox","0 0 820 520")
    .attr("width","100%")
    .style("font","11px sans-serif")

  svg.append("text")
    .attr("x", 410)
    .attr("y", 28)
    .attr("text-anchor", "middle")
    .attr("font-size","15px")
    .attr("font-weight","bold")
    .attr("fill","#1a1a1a")
    .text("Candidate Flow: Source Channel → Final Outcome")

  const link = svg.append("g")
    .attr("fill","none")
    .selectAll("path")
    .data(graph.links).join("path")
    .attr("d", sankeyLinkHorizontal())
    .attr("stroke", d => sourceColors[d.source.name] || "#aaa")
    .attr("stroke-width", d => Math.max(1, d.width))
    .attr("stroke-opacity", 0.35)

  const node = svg.append("g")
    .selectAll("g")
    .data(graph.nodes).join("g")

  node.append("rect")
    .attr("x", d => d.x0).attr("y", d => d.y0)
    .attr("width", d => d.x1-d.x0).attr("height", d => d.y1-d.y0)
    .attr("fill", d => sourceColors[d.name] || outcomeColors[d.name] || "#ccc")
    .attr("rx", 3)

  node.append("text")
    .attr("x", d => d.x0 < 400 ? d.x1 + 8 : d.x0 - 8)
    .attr("y", d => (d.y0 + d.y1) / 2)
    .attr("dy", "0.35em")
    .attr("text-anchor", d => d.x0 < 400 ? "start" : "end")
    .attr("font-size", "11px")
    .attr("font-weight", "500")
    .attr("fill", "#222222")
    .each(function(d) {
      const el = d3.select(this)
      const shortNames = {
        "Campus Recruitment": "Campus",
        "Employee Referral": "Referral",
        "Job Board": "Job Board"
      }
      const displayName = shortNames[d.name] || d.name
      el.append("tspan")
        .attr("font-weight","600")
        .text(displayName)
      el.append("tspan")
        .attr("font-weight","400")
        .attr("fill","#666666")
        .text(` (${d.value})`)
    })

  return svg.node()
}

// ── CHART 6: Application Volume by Quarter Line Bar ──────────────────────

{
  const quarterlyData = d3.rollups(
    raw.filter(d => d["Date Applied"]),
    v => v.length,
    d => {
      const date = new Date(d["Date Applied"])
      const q = Math.floor(date.getMonth() / 3) + 1
      return `${date.getFullYear()}-Q${q}`
    }
  ).map(([quarter, count]) => ({quarter, count}))
   .sort((a,b) => a.quarter.localeCompare(b.quarter))

  return Plot.plot({
    title: "Application Volume by Quarter",
    subtitle: "Hiring activity and seasonality across 2023–2025",
    marginLeft: 60,
    marginRight: 40,
    marginTop: 50,
    marginBottom: 60,
    width: 820,
    height: 360,
    x: {
      label: "Quarter",
      tickRotate: -35,
      tickSize: 4,
      grid: false
    },
    y: {
      label: "Applications",
      grid: true,
      domain: [0, d3.max(quarterlyData, d => d.count) + 25]
    },
    marks: [
      Plot.ruleY([0]),
      Plot.line(quarterlyData, {
        x: "quarter",
        y: "count",
        stroke: "#1A73E8",
        strokeWidth: 2.5,
        curve: "monotone-x"
      }),
      Plot.dot(quarterlyData, {
        x: "quarter",
        y: "count",
        fill: "#1A73E8",
        stroke: "white",
        strokeWidth: 2,
        r: 5,
        tip: true
      }),
      Plot.text(quarterlyData, {
        x: "quarter",
        y: "count",
        text: d => d.count.toString(),
        dy: -14,
        fontSize: 11,
        fontWeight: "600",
        fill: "#1a1a1a"
      })
    ]
  })
}

// ── CHART 7: Rejection Treemap 7. Why Candidates Are Rejected — Treemap Analysis ──────────────────────

{
  const rejData = d3.rollups(
    raw.filter(d => d["Rejection Reason"] && d["Rejection Reason"] !== "None"),
    v => v.length,
    d => d["Rejection Reason"]
  ).map(([reason, count]) => ({reason, count,
    type: ["Better Fit Found","Skills Mismatch","Low Test Score","Poor Communication",
           "Culture Fit Issue"].includes(reason) ? "Company-controlled" : "External"
  }))

  const root = d3.treemap()
    .size([700, 380])
    .padding(2)
    (d3.hierarchy({children: rejData}).sum(d => d.count))

  const svg = d3.create("svg")
    .attr("viewBox","0 0 720 420")
    .attr("width","100%")

  svg.append("text").attr("x",10).attr("y",20)
    .attr("font-weight","bold").attr("font-size","14px")
    .text("Rejection Reasons — Treemap (larger = more frequent)")

  const colors = {"Company-controlled":"#EA4335","External":"#4285F4"}

  const leaf = svg.append("g").attr("transform","translate(0,30)")
    .selectAll("g").data(root.leaves()).join("g")
    .attr("transform", d => `translate(${d.x0},${d.y0})`)

  leaf.append("rect")
    .attr("width", d => d.x1-d.x0)
    .attr("height", d => d.y1-d.y0)
    .attr("fill", d => colors[d.data.type])
    .attr("fill-opacity", 0.75)
    .attr("rx", 3)

  leaf.append("text")
    .attr("x", 6).attr("y", 16)
    .attr("font-size","10px").attr("fill","white").attr("font-weight","bold")
    .text(d => d.data.reason)

  leaf.append("text")
    .attr("x", 6).attr("y", 30)
    .attr("font-size","12px").attr("fill","white")
    .text(d => d.data.count)

  return svg.node()
}

// ── CHART 8: SLA Compliance by Stage — Where the Process Breaks Bar──────────────────────

{
  const slaData = [
    {sla: "SLA1: Apply→Shortlist (5 days)", compliant: 193, total: 349, owner: "Recruiter"},
    {sla: "SLA2: Shortlist→Interview (7 days)", compliant: 152, total: 219, owner: "Recruiter + HM"},
    {sla: "SLA3: Interview→Feedback (3 days)", compliant: 164, total: 164, owner: "Hiring Panel"},
    {sla: "SLA4: Offer→Acceptance (5 days)", compliant: 23, total: 70, owner: "Recruiter"}
  ].map(d => ({...d, rate: d.compliant / d.total, pct: (d.compliant / d.total * 100).toFixed(1) + "%"}))

  return Plot.plot({
    title: "SLA Compliance Rate by Stage",
    subtitle: "Target: 80% compliance at every stage. Red = critical failure.",
    marginLeft: 280,
    marginRight: 80,
    marginTop: 40,
    marginBottom: 40,
    width: 820,
    height: 260,
    x: {
      label: "Compliance Rate",
      domain: [0, 1],
      tickFormat: "%",
      grid: true
    },
    y: {label: null},
    color: {
      domain: [0, 0.5, 0.8, 1],
      range: ["#EA4335","#FBBC04","#34A853","#1E8E3E"]
    },
    marks: [
      Plot.barX(slaData, {
        x: "rate",
        y: "sla",
        fill: d => d.rate < 0.5 ? "#EA4335" : d.rate < 0.8 ? "#FBBC04" : "#34A853",
        tip: true
      }),
      Plot.ruleX([0.8], {stroke: "#1a1a1a", strokeDasharray: "4,4", strokeWidth: 1.5}),
      Plot.text(slaData, {
        x: "rate",
        y: "sla",
        text: d => d.pct + " — " + d.owner,
        dx: 8,
        fontSize: 11,
        fontWeight: "600",
        fill: "#222"
      })
    ]
  })
}

// ── CHART 9: Hiring Manager SLA4 Compliance — Offer Stage Accountability Bar─────────────────

{
  const hmSLA4 = [
    {hm: "HM_001", rate: 0.50}, {hm: "HM_002", rate: 0.50},
    {hm: "HM_003", rate: 0.00}, {hm: "HM_004", rate: 0.00},
    {hm: "HM_005", rate: 0.17}, {hm: "HM_006", rate: 0.00},
    {hm: "HM_007", rate: 0.40}, {hm: "HM_008", rate: 0.00},
    {hm: "HM_009", rate: 0.50}, {hm: "HM_010", rate: 0.50},
    {hm: "HM_011", rate: 0.00}
  ].sort((a,b) => a.rate - b.rate)

  return Plot.plot({
    title: "SLA4 Compliance by Hiring Manager (Offer → Acceptance within 5 days)",
    subtitle: "Dashed line = 80% target. Red bars = critical non-compliance.",
    marginLeft: 110,
    marginRight: 120,
    marginTop: 40,
    marginBottom: 40,
    width: 860,
    height: 340,
    x: {
      label: "SLA4 Compliance Rate",
      domain: [0, 1.15],
      tickFormat: "%",
      grid: true
    },
    y: {label: null},
    marks: [
      Plot.barX(hmSLA4, {
        x: "rate",
        y: "hm",
        fill: d => d.rate === 0 ? "#EA4335" : d.rate < 0.5 ? "#FBBC04" : "#34A853",
        tip: true
      }),
      Plot.ruleX([0.8], {stroke:"#1a1a1a", strokeDasharray:"4,4", strokeWidth:1.5}),
     Plot.text(hmSLA4, {
        x: "rate",
        y: "hm",
        text: d => d.rate === 0 ? "0%" : (d.rate * 100).toFixed(0) + "%",
        dx: 10,
        fontSize: 10,
        fontWeight: d => d.rate === 0 ? "700" : "400",
        fill: d => d.rate === 0 ? "#EA4335" : "#333"
      })
    ]
  })
}

// ── CHART 10: Time to Fill vs Time to Hire — The Planning Gap stacked bar ──────────────────────

{
  const deptData = [
    {dept: "Finance",    tth: 45.2, ttf: 43.1},
    {dept: "Operations", tth: 50.9, ttf: 49.2},
    {dept: "Product",    tth: 52.4, ttf: 50.8},
    {dept: "Marketing",  tth: 54.6, ttf: 53.1},
    {dept: "Legal",      tth: 57.8, ttf: 56.2},
    {dept: "Sales",      tth: 58.7, ttf: 57.0},
    {dept: "HR",         tth: 60.4, ttf: 58.9},
    {dept: "Customer Success", tth: 62.7, ttf: 61.0},
    {dept: "Design",     tth: 64.3, ttf: 62.8}
  ]

  const combined = [
    ...deptData.map(d => ({dept: d.dept, days: d.tth, metric: "Time to Hire"})),
    ...deptData.map(d => ({dept: d.dept, days: d.ttf, metric: "Time to Fill"}))
  ]

  return Plot.plot({
    title: "Time to Fill vs Time to Hire by Department",
    subtitle: "Near-identical values signal reactive hiring — reqs open as candidates apply.",
    marginLeft: 140,
    marginRight: 60,
    marginTop: 40,
    marginBottom: 50,
    width: 820,
    height: 380,
    x: {label: "Days", domain: [30, 75], grid: true},
    y: {label: null},
    color: {
      domain: ["Time to Hire", "Time to Fill"],
      range: ["#1A73E8", "#EA4335"],
      legend: true
    },
    marks: [
      Plot.barX(combined, Plot.groupY({x: "mean"}, {
        x: "days",
        y: "dept",
        fill: "metric",
        sort: {y: "-x"},
        tip: true,
        dx: -2
      })),
      Plot.ruleX([45], {stroke:"#34A853", strokeDasharray:"4,4", strokeWidth:1.5}),
      Plot.text([{x: 45, label: "Target: 45 days"}], {
        x: "x", y: 0,
        text: "label",
        fontSize: 10,
        fill: "#34A853",
        dy: -8
      })
    ]
  })
}

// ── CHART 11: Offer Decline Analysis — Why Candidates Said No Bar ──────────────────────

{
  const declineData = [
    {reason: "Location Issues", count: 5},
    {reason: "Salary Too Low", count: 4},
    {reason: "Role Mismatch", count: 4},
    {reason: "Accepted Competing Offer", count: 4},
    {reason: "Personal Reasons", count: 4},
    {reason: "Counter Offer from Employer", count: 2}
  ].sort((a,b) => b.count - a.count)

  const total = declineData.reduce((s,d) => s + d.count, 0)

  return Plot.plot({
    title: "Offer Decline Reasons (23 total declines — 32.9% decline rate)",
    subtitle: "Even distribution across reasons signals candidate disengagement, not a single fixable cause.",
    marginLeft: 200,
    marginRight: 80,
    marginTop: 40,
    marginBottom: 30,
    width: 820,
    height: 280,
    x: {label: "Count", domain: [0, 8], grid: true},
    y: {label: null},
    marks: [
      Plot.barX(declineData, {
        x: "count",
        y: "reason",
        sort: {y: "-x"},
        fill: "#E37400",
        tip: true
      }),
      Plot.text(declineData, {
        x: "count",
        y: "reason",
        text: d => `${d.count} (${(d.count/total*100).toFixed(0)}%)`,
        dx: 8,
        fontSize: 11,
        fontWeight: "600",
        fill: "#333"
      })
    ]
  })
}
