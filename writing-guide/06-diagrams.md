# Creating Diagrams with draw.io

When and how to use diagrams effectively in software development.

## Purpose

Diagrams help when:
- Explaining complex relationships
- Showing system architecture
- Illustrating data flows
- Documenting deployment topologies
- Onboarding new developers

## What to Use Diagrams

### Use Diagrams For

- System architecture (high-level overview)
- Data flow through components
- Sequence of operations
- Network topology
- Deployment architecture

### Don't Use For

- Simple linear processes (text is clearer)
- Implementation details (code comments are better)
- Temporary workarounds (fix the code instead)
- Obsolete architectures (update the diagram)

## draw.io Quick Start

### What is draw.io?

https://www.drawio.com/ (diagrams.net) is a free, web-based diagramming tool. You can refer to [example-diagrams](https://www.drawio.com/example-diagrams).

**Key advantages:**
- Free and no installation required
- Export to PNG, SVG, PDF
- Version control friendly (.drawio is XML)
- Large library of built-in shapes

### Getting Started

1. Go to [diagrams.net](https://diagrams.net) or [drawio.com](https://www.drawio.com)
2. Click "Create New Diagram"
3. Select a template or start blank
4. Drag shapes from left panel to canvas
5. Double-click shapes to add text
6. Connect shapes with arrows
7. File → Export as → PNG

### Interface Overview

```
+----------------------------------+
|  File  Edit  View  Arrange        |
+----------------------------------+
| Shapes  |    Canvas              |
| General |                        |
| Arrows  |                        |
|         |                        |
+----------------------------------+
```


## Diagram Standards

### File Naming

Use kebab-case matching the diagram subject:
```
images/
├── system-overview.png
├── data-flow.png
├── deployment-architecture.png
└── api-sequence.png
```

### File Format

| Format | Purpose |
|--------|---------|
| .drawio | Source file (always commit) |
| .png | Documentation (max width: 800px) |

**Always commit both .drawio and .png files.**

### Markdown Syntax

```markdown
![Alt text](relative/path/to/image.png)
```

## Common Diagram Types 

### 1. System Architecture & Deployment
**Use when:** High-level system overview, infrastructure layout
- [aws-simple-architecture.drawio](../resources/diagram-sources/aws-simple-architecture.drawio)
- <img src="../resources/diagram-sources/simple-aws-architecture.png" style="max-width:60%;" />

### 2. Sequence & Flow Diagrams
**Use when:** API flows, authentication, multi-step processes
- [sequence-diagram-examples.drawio](../resources/diagram-sources/sequence-diagram-examples.drawio)
- <img src="../resources/diagram-sources/uml-sequence-example.png" style="max-width:60%;" />
- [flowchart.xml](../resources/diagram-sources/flowchart.xml)
- <img src="../resources/diagram-sources/template-basic-flowchart.png" style="max-width:60%;" />

### 3. ER Diagram & Data Model
**Use when:** Database schema, data relationships
- [er-diagram-example.drawio](../resources/diagram-sources/er-diagram-example.drawio)
- <img src="../resources/diagram-sources/er-diagram-example.png" style="max-width:60%;" />

### 4. C4 Model (system context, container, component & class diagrams)
**Use when:** Software architecture documentation
- [c4-component.drawio](../resources/diagram-sources/c4-component.drawio)
- <img src="../resources/diagram-sources/c4-component.png" style="max-width:60%;" />


## Accessibility

Diagrams should be accessible to all users, including those with visual impairments or color vision deficiencies.

### Color Choices

Use color-blind friendly palettes:

**Recommended Colors (Safe for All Types):**

| Color | Hex | Use Case |
|-------|-----|----------|
| Blue | #0052CC | Primary elements, flow |
| Orange | #FF991F | Highlights, warnings |
| Green | #00875A | Success, positive paths |
| Red | #DE350B | Errors, negative paths |
| Purple | #6554C0 | Secondary elements |
| Gray | #42526E | Neutral, background |

**Avoid:**
- Red/green combinations (problematic for red-green color blindness)
- Reliance on color alone to convey meaning
- Low contrast color combinations

### Contrast Requirements

Ensure sufficient contrast between elements:

- **Text and background:** Minimum 4.5:1 contrast ratio
- **Important elements:** Minimum 7:1 contrast ratio
- **Lines and shapes:** Use distinct borders when colors are similar

**Testing Tools:**
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Chrome DevTools Lighthouse audit
- Color Oracle simulator (simulates color blindness)

### Alternative Text

All diagrams must have descriptive alt text:

```markdown
![Architecture diagram showing three-tier system with load balancer,
application servers, and database cluster](images/architecture.png)
```

**Guidelines:**
- Describe the purpose of the diagram
- Mention key components and relationships
- Keep under 125 characters when possible
- Avoid "image of" or "diagram showing" redundancies

### Patterns and Textures

Don't rely on color alone:

```markdown
Use patterns to distinguish elements:
- Solid fill: Primary elements
- Striped: Secondary elements
- Dotted border: Optional/external elements
- Hatched: Deprecated elements
```

### Vector vs Raster

Choose appropriate format:

| Format | When to Use | Accessibility Benefits |
|--------|-------------|------------------------|
| SVG (vector) | Icons, simple diagrams | Scalable, can be read by screen readers |
| PNG (raster) | Complex diagrams, screenshots | Fixed appearance, compatible alt text |

### Text in Diagrams

Keep text in diagrams accessible:

- **Minimum font size:** 14px at 100% zoom
- **High contrast:** Dark text on light background or vice versa
- **Avoid decorative fonts:** Use sans-serif fonts
- **Limit text:** Use legends and labels instead

**Best Practice:**
```markdown
Place explanatory text outside the diagram:

❌ Bad: Long explanations inside diagram boxes

✅ Good: Concise labels in diagram, detailed legend below
```

### Testing for Accessibility

**Manual Checklist:**
- [ ] All images have alt text
- [ ] Colors have sufficient contrast
- [ ] Information not conveyed by color alone
- [ ] Text is readable at 100% zoom
- [ ] Diagram makes sense when grayscale
- [ ] SVG files have title/desc tags

**Automated Checks:**
```bash
# Check alt text with markdown linter
markdownlint docs/**/*.md --rule MD045

# Verify image files exist
markdown-link-check docs/**/*.md
```

**Grayscale Test:**
Convert diagram to grayscale to ensure information remains clear:
- draw.io: View → Format Diagram → Grayscale
- Check that all elements are distinguishable


## See Also

- [draw.io Examples](https://www.drawio.com/example-diagrams) - Browse by category
- [Architecture Documentation](03-architecture.md) - Documenting system design
