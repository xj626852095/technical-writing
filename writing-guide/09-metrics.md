# Documentation Metrics

Measuring and improving documentation quality over time.

## Purpose

Documentation metrics help you:
- **Identify gaps** - Find missing or inadequate content
- **Track quality** - Monitor documentation health
- **Prioritize work** - Focus on high-impact improvements
- **Demonstrate value** - Show the impact of documentation efforts
- **Justify investment** - Build a business case for resources

## Core Metrics

### 1. Coverage Metrics

Measure how well your documentation covers your product.

#### Documentation Coverage

```markdown
## Coverage Formula

(Number of documented features / Total features) × 100

## Example
- Total API endpoints: 150
- Documented endpoints: 135
- Coverage: 90%

## Benchmark
- Excellent: 95%+
- Good: 80-94%
- Needs work: <80%
```

#### README Completeness

```markdown
## Essential Sections Checklist

Every README should have:
- [ ] Title and description
- [ ] Overview
- [ ] Quick Start
- [ ] Usage examples
- [ ] Configuration
- [ ] API/Interface reference (if applicable)

Score: (Completed sections / 6) × 100
```

### 2. Quality Metrics

Assess the accuracy and usefulness of documentation.

#### Accuracy Rate

```markdown
## How to Measure

Track documentation bug reports:
- Total documentation issues reported
- Issues filed per month
- Percentage of issues that are factual errors

## Target
- Critical errors: <1% of content
- Minor errors: <5% of content
- Typos/grammar: <2% of content
```

#### User Success Rate

```markdown
## How to Measure

Survey users after reading documentation:
- Were you able to complete your task?
- Was the information easy to find?
- Was anything confusing or missing?

## Target
- Task completion: >85%
- Easy to find: >80%
- Nothing missing: >75%
```

#### Link Health

```markdown
## How to Measure

Run automated link checking:
- Total links in documentation
- Broken links (404, 500, timeout)
- Percentage of healthy links

## Tools
```bash
# Check all markdown files
markdown-link-check docs/**/*.md

# Check specific page
mdl docs/README.md
```

## Target
- Broken links: 0%
- Redirects: <5%
```

### 3. Usage Metrics

Understand how documentation is being used.

#### Page Views

```markdown
## Key Metrics

- Most viewed pages (top 20)
- Average time on page
- Exit pages (where users leave)
- Traffic sources (where users come from)

## Tools
- Google Analytics
- Plausible (privacy-friendly)
- Internal analytics platforms

## Analysis

High views + low time on page = Content may be confusing
Low views on important pages = Discoverability issue
```

#### Search Queries

```markdown
## What to Track

- Most common search terms
- Searches with no results
- Click-through rate on search results

## Insights

Frequent searches for a topic =
Missing content or poor organization

No results searches =
Content gaps to fill
```

### 4. Support Metrics

Measure documentation's impact on support burden.

#### Deflection Rate

```markdown
## Formula

(Support tickets answered by documentation /
Total support tickets) × 100

## How to Track

Tag support tickets that can be resolved
by existing documentation.

## Target
- Good: 40-60% deflection
- Excellent: 60%+ deflection
```

#### Time to Resolution

```markdown
## What to Measure

Average time to resolve support tickets
with and without good documentation.

## Impact

Good documentation reduces resolution time
by 50-75%.

## Target
- With docs: <15 minutes
- Without docs: <60 minutes
```

## Measuring User Feedback

### Surveys

```markdown
## Documentation Satisfaction Survey

After completing a task, ask users:

1. How helpful was the documentation?
   (1-5 scale, 5 = very helpful)

2. What were you trying to do?
   [Open text]

3. Did you find what you needed?
   (Yes / No / Partially)

4. What could be improved?
   [Open text]

## Timing
- After major updates
- Quarterly sampling
- Post-support interaction
```

### Feedback Widgets

```markdown
## Page-Level Feedback

Add to the bottom of each documentation page:

"Was this page helpful?"
👍 Yes  👎 No

If No: "What was missing or confusing?"
[Open text field]

## Implementation

```html
<div class="feedback-widget">
  <p>Was this helpful?</p>
  <button>Yes</button>
  <button>No</button>
  <textarea id="feedback-text"></textarea>
</div>
```

## Health Score

Calculate an overall documentation health score.

```markdown
## Health Score Formula

(0.3 × Coverage) +
(0.3 × Quality) +
(0.2 × Usage) +
(0.2 × Support) =
Health Score (0-100)

## Score Categories

90-100: Excellent
70-89:  Good
50-69:  Fair
<50:    Needs Improvement

## Example Calculation

Coverage: 85% × 0.3 = 25.5
Quality:   90% × 0.3 = 27.0
Usage:    75% × 0.2 = 15.0
Support:  80% × 0.2 = 16.0

Health Score: 83.5 / 100 (Good)
```

## Dashboards

Create a documentation metrics dashboard.

```markdown
## Key Dashboard Elements

### Executive Summary
- Overall health score
- Trend (improving/declining)
- Top 3 priorities

### Coverage Section
- Documentation coverage percentage
- Undocumented features list
- Coverage by category

### Quality Section
- Documentation issues (open/closed)
- Average age of content
- Link health status

### Usage Section
- Top 10 most viewed pages
- Least viewed important pages
- Search query analysis

### Support Section
- Deflection rate
- Top documentation-related tickets
- Resolution time comparison
```

## Setting Targets

```markdown
## SMART Goals for Documentation

### Bad Goal
"Improve documentation"

### Good Goal
"Increase API documentation coverage from 75% to 90%
within Q2, reducing API-related support tickets by 20%."

## Target Setting Framework

1. **Measure baseline** - Know where you start
2. **Set realistic targets** - 10-20% improvement is good
3. **Define timeline** - When will you achieve it?
4. **Identify actions** - What will you do to get there?
5. **Track progress** - Review metrics monthly

## Example Targets

| Metric | Current | Target | Date |
|--------|---------|--------|------|
| Coverage | 75% | 90% | Q2 2026 |
| Health Score | 72 | 85 | Q2 2026 |
| Broken links | 15 | 0 | Q1 2026 |
| Deflection rate | 35% | 50% | Q3 2026 |
```

## Tools for Measuring

### Automated Tools

```bash
# Link checking
markdown-link-check docs/**/*.md

# Spell checking
markdown-spellcheck docs/

# SEO analysis
markdown-toc --insert docs/

# Coverage analysis
grep -r "TODO" docs/  # Find content gaps
```

### Analytics Platforms

| Tool | Type | Best For |
|------|------|----------|
| Google Analytics | Web analytics | Traffic, user behavior |
| Plausible | Privacy analytics | Traffic (GDPR compliant) |
| Hotjar | User behavior | Heatmaps, recordings |
| Algolia | Site search | Search analytics |
| Custom | Support integration | Ticket deflection tracking |

## Reporting

### Monthly Report Template

```markdown
## Documentation Metrics Report - [Month]

### Executive Summary
- Health score: X/Y (change from last month)
- Key achievements
- Top concerns

### Coverage Update
- Overall coverage: X%
- New pages added: N
- Pages updated: N
- Undocumented features: N

### Quality Update
- Issues reported: N
- Issues resolved: N
- Link health: X%
- Last review date: YYYY-MM-DD

### Usage Update
- Total page views: N
- Top page: [Page name]
- Lowest viewed important page: [Page name]
- Search queries with no results: N

### Support Impact
- Deflection rate: X%
- Documentation tickets: N
- Average resolution time: X minutes

### Priorities for Next Month
1. [Priority 1]
2. [Priority 2]
3. [Priority 3]
```

## Continuous Improvement

```markdown
## The Metrics-Driven Improvement Cycle

1. Measure current state
2. Identify gaps and issues
3. Set improvement targets
4. Make targeted improvements
5. Re-measure impact
6. Adjust strategy
7. Repeat

## Frequency

- Daily: Automated checks (links, spelling)
- Weekly: Review new content
- Monthly: Full metrics review
- Quarterly: Strategy adjustment
- Annually: Comprehensive audit
```

## Common Pitfalls

```markdown
## What to Avoid

❌ Vanity Metrics
Measuring page views without context

❌ Gaming the System
Creating low-quality content to boost numbers

❌ Analysis Paralysis
Spending more time measuring than improving

❌ Ignoring Qualitative Feedback
Focusing only on numbers, not user comments

❌ Setting Unrealistic Targets
Expecting 100% coverage overnight

## What to Do Instead

✅ Focus on actionable metrics
✅ Correlate metrics with user outcomes
✅ Balance quantitative and qualitative data
✅ Use metrics to identify priorities
✅ Celebrate incremental progress
```

## See Also

- [Review Process](08-review-process.md) - Quality assurance practices
- [Style Guide](07-style-guide.md) - Writing conventions
- [Documentation Principles](01-principles.md) - Why good documentation matters
