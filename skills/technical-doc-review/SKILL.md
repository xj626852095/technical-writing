---
name: technical-doc-review
description: Review technical documentation against quality standards.
  Provides structured feedback with severity levels, quality scoring
  using the health formula, and actionable improvement recommendations.
trigger_on:
  - "review.*documentation"
  - "check.*documentation.*quality"
  - "documentation.*audit"
  - "score.*documentation"
  - "documentation.*health"
---

# Technical Documentation Review

Review technical documentation systematically against quality standards.

## Task Detection

### Review Mode

**Triggers:**
- "review.*documentation"
- "check.*documentation.*quality"
- "documentation.*audit"
- "score.*documentation"
- "documentation.*health"

**Workflow:**
1. Read documentation completely
2. Evaluate against review checklist (all 5 categories)
3. Categorize findings by severity (Must Fix, Should Fix, Nice to Have, Question)
4. Calculate health score when metrics available
5. Provide structured feedback with approval status
6. Generate actionable improvement recommendations

## Review Checklist

### Content Quality

- [ ] **Purpose is clear** - The document's goal is stated upfront
- [ ] **Audience is appropriate** - Content matches the reader's knowledge level
- [ ] **Information is complete** - All necessary topics are covered
- [ ] **Information is accurate** - Technical details are correct
- [ ] **Instructions are actionable** - Steps can be followed as written
- [ ] **Examples are complete** - Code samples work without modification

### Clarity and Readability

- [ ] **Language is clear** - Avoids jargon unless defined
- [ ] **Structure is logical** - Information flows in a sensible order
- [ ] **Headings are descriptive** - Readers can scan to find what they need
- [ ] **Tone is consistent** - Voice and style match other documentation
- [ ] **Explanations are concise** - Respects the reader's time

### Accuracy and Currency

- [ ] **Code examples run** - All code has been tested
- [ ] **Commands work** - Shell commands produce the stated results
- [ ] **Links are valid** - All references point to existing resources
- [ ] **Version information is current** - Software versions are up to date
- [ ] **Screenshots match** - Images reflect the current UI

### Grammar and Style

- [ ] **No spelling errors** - Run a spell checker
- [ ] **Proper grammar** - Sentences are well-formed
- [ ] **Consistent terminology** - Product names and technical terms match style guide
- [ ] **Follows style guide** - Adheres to project documentation standards

### Accessibility

- [ ] **Images have alt text** - Descriptive text for screen readers
- [ ] **Links are descriptive** - Not "click here"
- [ ] **Code has language specified** - Proper syntax highlighting
- [ ] **Contrast is sufficient** - Text is readable for visually impaired users

## Feedback Categories

### 1. Must Fix (Blocks Publication)

**Definition:** Critical issues that prevent documentation from being published.

**Examples:**
- Broken or missing code examples
- Factual errors that mislead users
- Missing critical steps in procedures
- Security vulnerabilities in documentation
- Broken links to essential resources
- Outdated version information causing errors

**Format:**
```markdown
**Must Fix:** [Issue description]
**Impact:** [Why this blocks publication]
**Location:** [Specific section or line]
**Suggestion:** [How to fix it]
```

### 2. Should Fix (Important Improvements)

**Definition:** Important issues that significantly impact documentation quality but don't block publication.

**Examples:**
- Unclear explanations that confuse readers
- Missing context or background information
- Poor organization that hinders navigation
- Inconsistent terminology
- Insufficient examples
- Accessibility issues (missing alt text, poor contrast)

**Format:**
```markdown
**Should Fix:** [Issue description]
**Impact:** [How this affects user experience]
**Location:** [Specific section or line]
**Suggestion:** [How to improve it]
```

### 3. Nice to Have (Optional Enhancements)

**Definition:** Minor improvements that would enhance documentation but are not essential.

**Examples:**
- Additional examples or use cases
- Formatting improvements
- Minor style guide inconsistencies
- Extra explanatory notes
- Alternative approaches
- Performance tips

**Format:**
```markdown
**Nice to Have:** [Enhancement description]
**Benefit:** [How this would improve the document]
**Location:** [Specific section or line]
**Suggestion:** [What to add]
```

### 4. Question (Needs Clarification)

**Definition:** Points that require clarification from the author or subject matter expert.

**Examples:**
- Ambiguous statements
- Unclear technical details
- Missing prerequisites
- Uncertain version requirements
- Conflicting information
- Assumptions that need verification

**Format:**
```markdown
**Question:** [What needs clarification]
**Context:** [Where this appears in the document]
**Options:** [Possible interpretations or approaches]
```

## Health Score

### Health Score Formula

```
Health Score (0-100) = (0.3 × Coverage) + (0.3 × Quality) + (0.2 × Usage) + (0.2 × Support)
```

### Metric Definitions

#### Coverage (0-100)

**Definition:** Percentage of features, APIs, or functionality documented.

**Calculation:**
```markdown
(Number of documented features / Total features) × 100
```

**Example:**
- Total API endpoints: 150
- Documented endpoints: 135
- Coverage: 90%

**Benchmarks:**
- Excellent: 95%+
- Good: 80-94%
- Fair: 60-79%
- Needs Improvement: <60%

#### Quality (0-100)

**Definition:** Composite score based on accuracy, completeness, and user feedback.

**Calculation:**
```markdown
(User Success Rate × 0.4) +
(Accuracy Rate × 0.4) +
(Link Health × 0.2)
```

**Components:**
- **User Success Rate:** (% of users who complete tasks successfully)
- **Accuracy Rate:** (100 - % of documentation bug reports)
- **Link Health:** (% of valid, non-broken links)

**Benchmarks:**
- Excellent: 90%+
- Good: 75-89%
- Fair: 60-74%
- Needs Improvement: <60%

#### Usage (0-100)

**Definition:** How effectively documentation is being used by target audience.

**Calculation:**
```markdown
(Page View Score × 0.5) +
(Search Success Rate × 0.3) +
(Average Time on Page Score × 0.2)
```

**Components:**
- **Page View Score:** Traffic relative to importance (normalized 0-100)
- **Search Success Rate:** (% of searches with successful results)
- **Time on Page Score:** Appropriate reading time (not too short, not too long)

**Benchmarks:**
- Excellent: High engagement on important pages
- Good: Moderate engagement, some discoverability issues
- Fair: Low engagement or poor discoverability
- Needs Improvement: Minimal usage or frequent failed searches

#### Support (0-100)

**Definition:** Documentation's impact on reducing support burden.

**Calculation:**
```markdown
(Deflection Rate × 0.7) +
(Resolution Time Score × 0.3)
```

**Components:**
- **Deflection Rate:** (% of support tickets resolved by documentation)
- **Resolution Time Score:** Ratio of resolution time with docs vs without (inverse)

**Benchmarks:**
- Excellent: 60%+ deflection, 50%+ time reduction
- Good: 40-59% deflection, 30-49% time reduction
- Fair: 20-39% deflection, 10-29% time reduction
- Needs Improvement: <20% deflection, <10% time reduction

### Score Categories

- **90-100: Excellent** - Documentation exceeds standards, minimal issues
- **70-89: Good** - Documentation meets standards, some improvement areas
- **50-69: Fair** - Documentation has significant gaps, needs attention
- **<50: Needs Improvement** - Documentation requires major overhaul

### Example Calculation

```markdown
Coverage: 85% × 0.3 = 25.5
Quality:   90% × 0.3 = 27.0
Usage:    75% × 0.2 = 15.0
Support:  80% × 0.2 = 16.0

Health Score: 83.5 / 100 (Good)
```

### When Metrics Are Unavailable

If quantitative metrics are not available, use a simplified qualitative assessment:

```markdown
Health Score (0-100) =
  (Coverage Score × 0.4) +
  (Quality Score × 0.6)

Where:
  Coverage Score: Subjective assessment (0-100) based on
    - Are all major features documented?
    - Are there obvious gaps?
    - Is essential information complete?

  Quality Score: Subjective assessment (0-100) based on
    - Is information accurate?
    - Is writing clear and concise?
    - Are examples complete and tested?
    - Is document well-organized?
```

## Approval Criteria

### Required Criteria

Documentation can be published when:

- ✅ **All "Must Fix" issues are resolved**
- ✅ **80% of "Should Fix" issues are resolved** (or documented with timeline)
- ✅ **Remaining "Nice to Have" items are documented** (not lost)
- ✅ **At least one reviewer has approved** (for peer-reviewed content)

### Publication Steps

1. **Merge approved changes** - Incorporate all accepted feedback
2. **Update documentation version** - Increment version number or date
3. **Deploy to production** - Publish to live documentation site
4. **Announce changes** - Notify stakeholders of significant updates
5. **Archive review feedback** - Store review comments for future reference

## Review Output Template

```markdown
# Documentation Review: [Document Title]

**Reviewer:** [Name]
**Date:** [YYYY-MM-DD]
**Document Version:** [Version or commit hash]
**Health Score:** [X/100 - Category]

---

## Executive Summary

**Overall Assessment:** [Excellent/Good/Fair/Needs Improvement]

**Summary:** [2-3 sentences summarizing the overall quality and main findings]

**Key Strengths:**
- [Strength 1]
- [Strength 2]
- [Strength 3]

**Primary Concerns:**
- [Concern 1]
- [Concern 2]

**Recommendation:** [Approved/Approved with changes/Needs revision]

---

## Content Quality

### Strengths
- [List what's done well]

### Issues
**Must Fix:** [Count]
**Should Fix:** [Count]
**Nice to Have:** [Count]
**Question:** [Count]

[Detailed findings by category]

---

## Clarity and Readability

### Strengths
- [List what's done well]

### Issues
**Must Fix:** [Count]
**Should Fix:** [Count]
**Nice to Have:** [Count]
**Question:** [Count]

[Detailed findings by category]

---

## Accuracy and Currency

### Strengths
- [List what's done well]

### Issues
**Must Fix:** [Count]
**Should Fix:** [Count]
**Nice to Have:** [Count]
**Question:** [Count]

[Detailed findings by category]

---

## Grammar and Style

### Strengths
- [List what's done well]

### Issues
**Must Fix:** [Count]
**Should Fix:** [Count]
**Nice to Have:** [Count]
**Question:** [Count]

[Detailed findings by category]

---

## Accessibility

### Strengths
- [List what's done well]

### Issues
**Must Fix:** [Count]
**Should Fix:** [Count]
**Nice to Have:** [Count]
**Question:** [Count]

[Detailed findings by category]

---

## Recommendations

### Priority 1 (Must Fix Before Publication)
1. [Must fix item 1]
2. [Must fix item 2]

### Priority 2 (Should Fix Soon)
1. [Should fix item 1]
2. [Should fix item 2]

### Priority 3 (Nice to Have)
1. [Enhancement 1]
2. [Enhancement 2]

### Questions for Author
1. [Question 1]
2. [Question 2]

---

## Approval Status

**Status:** ⬜ Approved | ⬜ Approved with changes | ⬜ Needs revision | ⬜ Not approved

**Approver:** [Name]
**Date:** [YYYY-MM-DD]
**Comments:** [Any additional comments]

---

## Health Score Details

**Coverage:** [X/100]
- [Rationale or supporting data]

**Quality:** [X/100]
- [Rationale or supporting data]

**Usage:** [X/100]
- [Rationale or supporting data]

**Support:** [X/100]
- [Rationale or supporting data]

**Calculation:** [Show the formula application]
```

## Cross-References

### Satellite Skills

- **technical-doc-writer:** Core documentation writing skill
- **technical-doc-templates:** Document templates for common doc types
- **technical-doc-diagrams:** Diagram creation and standards

### Related Skills

- **article-writing:** For reviewing blog posts and tutorials
- **doc-coauthoring:** Collaborative documentation review

### Quick Commands

```bash
# Review documentation
skill technical-doc-review "Review README.md"

# Check documentation quality
skill technical-doc-review "Audit docs/api/ directory"

# Score documentation health
skill technical-doc-review "Calculate health score for user guide"
```
