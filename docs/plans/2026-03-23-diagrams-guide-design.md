# Design: Rewrite 06-diagrams.md for draw.io

**Date:** 2026-03-23
**Status:** Approved
**Author:** Claude + User collaboration

## Overview

Rewrite `writing-guide/06-diagrams.md` to focus exclusively on draw.io as the diagramming tool for software development. Remove all PlantUML content and provide practical guidance for common software diagrams.

## Goals

1. Focus only on draw.io (no PlantUML)
2. Cover common software development diagrams:
   - System Architecture & Deployment
   - Sequence & Flow Diagrams
   - ER Diagram & Data Model
   - C4 Model
3. Standard version (3-4 pages with steps, best practices, common mistakes)
4. Concise structure with merged diagram types

## Document Structure

### Section 1: Header (Purpose + When to Use)

**Purpose:** Explain when diagrams are helpful
**When to Use:** Clear guidance on use/don't use cases

### Section 2: draw.io Quick Start

**Content:**
- What is draw.io (brief intro)
- Key advantages (free, web-based, VCS friendly)
- Getting Started (7 quick steps)
- Interface Overview (simple diagram)

### Section 3: Diagram Standards

**Content:**
- File Naming (kebab-case convention)
- File Format table (.drawio + .png)
- Markdown syntax example
- Rule: Always commit both files

### Section 4: Common Diagram Types (Merged)

**4.1 System Architecture & Deployment**
- Use case description
- Key elements (shapes & what they represent)
- Step-by-step drawing process (5 steps)
- Best practices (3 bullet points)
- Common mistakes (3 bullet points)

**4.2 Sequence & Flow Diagrams**
- Use case description
- Key elements
- Step-by-step (5 steps)
- Best practices
- Common mistakes

**4.3 ER Diagram & Data Model**
- Use case description
- Key elements
- Step-by-step (5 steps)
- Best practices
- Common mistakes

**4.4 C4 Model**
- Use case description
- 3 levels explained
- Best practices

### Section 5: Best Practices Summary

**Content:**
- 4 good diagram practices
- Common mistakes (bad vs good example)

### Section 6: See Also

**Links:**
- draw.io Examples
- Architecture Documentation (03-architecture.md)

## Changes from Current Version

| Current | New |
|---------|-----|
| draw.io + PlantUML | draw.io only |
| 5 separate diagram types with PlantUML code | 4 merged diagram types with practical steps |
| No step-by-step guidance | 5-step process for each diagram type |
| Generic best practices | Specific best practices per diagram type |
| Links to diagram-sources/ | Links to drawio.com example-diagrams |

## Estimated Length

Approximately 3-4 pages (similar to current length but more practical content)

## References

- [drawio Example Diagrams](https://www.drawio.com/example-diagrams)
- Current `writing-guide/06-diagrams.md`
- Related `writing-guide/03-architecture.md`
