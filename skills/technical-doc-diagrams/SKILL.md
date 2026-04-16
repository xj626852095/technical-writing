---
name: technical-doc-diagrams
description: Create accessible, consistent technical diagrams following
  documentation standards. Covers draw.io workflows, color-blind friendly
  palettes, naming conventions, alt text requirements, and diagram type
  selection.
trigger_on:
  - "create.*diagram"
  - "draw.*architecture"
  - "system.*diagram"
  - "architecture.*diagram"
  - "deployment.*diagram"
  - "sequence.*diagram"
  - "data.*flow.*diagram"
---

# Technical Documentation Diagrams

Create accessible, consistent technical diagrams for documentation.

## When to Use Diagrams

### Use Diagrams For

- **System architecture:** High-level overview of major components and relationships
- **Data flow:** Illustrate how data moves through the system
- **Sequence of operations:** API flows, authentication, multi-step processes
- **Network topology:** Display network infrastructure and connections
- **Deployment architecture:** Document deployment topologies and infrastructure layout
- **Database schema:** Show data relationships and entity structures
- **Complex relationships:** When text alone would be insufficient

### Don't Use For

- **Simple linear processes:** Text is clearer for straightforward steps
- **Implementation details:** Code comments are better for low-level details
- **Temporary workarounds:** Fix the code instead of documenting hacks
- **Obsolete architectures:** Update the diagram to match current reality

## Diagram Type Selection

### System Architecture Diagram

**Use when:** You need to show the high-level structure of your system, including major components and their relationships.

**Best practices:**
- Focus on major components, not implementation details
- Show data flow between components
- Include external systems and APIs
- Use consistent shapes for similar component types
- Add a legend if using custom symbols

**Example components:**
- Load balancers
- Application servers
- Databases
- Caches
- Message queues
- External services

### Deployment Diagram

**Use when:** Documenting infrastructure layout, network topology, or deployment architecture.

**Best practices:**
- Show physical or logical infrastructure
- Include cloud regions, availability zones
- Document network boundaries and security zones
- Indicate scaling mechanisms (horizontal/vertical)
- Label environment (dev/staging/prod)

**Key elements:**
- Servers and containers
- Network boundaries
- Load balancers
- Firewalls and security groups
- Storage systems
- Monitoring and logging

### Sequence Diagram

**Use when:** Illustrating API flows, authentication sequences, or multi-step interactions between components.

**Best practices:**
- Show participants as columns (services, users, databases)
- Use arrows for requests (solid) and responses (dashed)
- Number steps for clarity
- Include error paths and timeouts
- Keep under 10-12 steps

**Common scenarios:**
- API request/response flows
- Authentication and authorization
- Payment processing
- Data synchronization
- Error handling

### Data Flow Diagram (DFD)

**Use when:** Showing how data moves through a system from input to storage.

**Best practices:**
- Show data sources and destinations
- Include processing steps
- Indicate data stores
- Use arrows to show flow direction
- Label data types on connections

**Components:**
- External entities (sources/sinks)
- Processes (transform data)
- Data stores (databases, files)
- Data flows (arrows with labels)

### Entity Relationship Diagram (ER Diagram)

**Use when:** Documenting database schema, data relationships, or data models.

**Best practices:**
- Show entities as tables
- Indicate primary keys (PK) and foreign keys (FK)
- Use crow's foot notation for cardinality
- Include important fields and data types
- Add indexes and constraints as notes

**Relationship types:**
- One-to-one (1:1)
- One-to-many (1:N)
- Many-to-many (M:N) - use junction table

### C4 Component Diagram

**Use when:** Providing software architecture documentation following the C4 model.

**C4 levels:**
1. **System Context:** Your system + users + external systems
2. **Container:** Applications, data stores, microservices
3. **Component:** Internal components of containers
4. **Code:** Class-level details (use sparingly)

**Best practices:**
- Start with context, drill down as needed
- Use consistent color coding
- Include key technologies
- Show major data flows
- Add descriptions for non-obvious elements

### Flowchart

**Use when:** Documenting algorithms, decision processes, or procedural workflows.

**Best practices:**
- Use standard flowchart symbols (diamonds for decisions, rectangles for processes)
- Keep flow linear (left-to-right or top-to-bottom)
- Label all decision branches
- Include start and end points
- Avoid crossing lines when possible

**Common uses:**
- Authentication flows
- Error handling processes
- Deployment procedures
- Troubleshooting guides

### Microservices Pattern

**Use when:** Showing microservices architecture and communication patterns.

**Best practices:**
- Show service boundaries clearly
- Indicate communication protocols (REST, gRPC, messaging)
- Include service mesh or API gateway
- Show data stores per service
- Highlight shared resources

**Key elements:**
- Service boundaries
- API gateway
- Service discovery
- Message broker
- Circuit breakers
- Distributed tracing

## Diagram Standards

### Tool Requirements

- **Primary tool:** draw.io (diagrams.net)
- **Access:** https://diagrams.net or https://www.drawio.com
- **Format:** Export as .drawio (XML source) + .png (image)
- **Version control:** Commit .drawio files for version control

**Why draw.io:**
- Free and web-based (no installation)
- Version control friendly (.drawio is XML)
- Large library of built-in shapes
- Export to PNG, SVG, PDF
- Supports diagrams offline

### File Format Requirements

| Format | Purpose | Required |
|--------|---------|----------|
| .drawio | Source file (XML) | Yes, always commit |
| .png | Documentation image | Yes, for web/docs |
| .svg | Web graphic | Optional, for simple diagrams |
| .pdf | Print documentation | Optional, for formal docs |

**Always commit both .drawio and .png files.**

### Naming Convention

Use kebab-case matching the diagram subject:

```
images/
├── system-overview.png
├── system-overview.drawio
├── data-flow.png
├── data-flow.drawio
├── deployment-architecture.png
├── deployment-architecture.drawio
├── api-sequence.png
├── api-sequence.drawio
└── user-authentication-flow.png
```

**Guidelines:**
- Use descriptive names (not `diagram1.png`)
- Match section or feature name
- Include diagram type if multiple diagrams for same topic
- Keep names under 50 characters

### Sizing Requirements

- **Maximum width:** 800px for web display
- **Height:** No strict limit, but keep under 2000px
- **Export settings:** 96 DPI (default)
- **Aspect ratio:** Fit content, avoid excessive whitespace

**For large diagrams:**
- Consider splitting into multiple diagrams
- Use drill-down approach (overview + detailed views)
- Ensure text remains readable at scaled sizes

### Markdown Syntax

```markdown
![Alt text describing diagram](relative/path/to/image.png)
```

**Example:**
```markdown
![System architecture showing load balancer, application servers,
and database cluster](images/system-overview.png)
```

## Accessibility

Diagrams should be accessible to all users, including those with visual impairments or color vision deficiencies.

### Color-Blind Friendly Palette

Use these specific hex codes for color-blind safe designs:

| Color | Hex Code | Use Case |
|-------|----------|----------|
| Blue | #0052CC | Primary elements, flow, active states |
| Orange | #FF991F | Highlights, warnings, attention |
| Green | #00875A | Success, positive paths, completed |
| Red | #DE350B | Errors, negative paths, failures |
| Purple | #6554C0 | Secondary elements, optional paths |
| Gray | #42526E | Neutral, background, inactive |

**Avoid:**
- Red/green combinations (problematic for red-green color blindness, most common)
- Relying on color alone to convey meaning
- Low contrast color combinations
- Similar colors for adjacent elements

### Contrast Requirements

Ensure sufficient contrast between elements:

- **Text and background:** Minimum 4.5:1 contrast ratio (WCAG AA)
- **Important elements:** Minimum 7:1 contrast ratio (WCAG AAA)
- **Lines and shapes:** Use distinct borders when colors are similar
- **Annotations:** High contrast for labels and notes

**Testing Tools:**
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Chrome DevTools Lighthouse audit
- Color Oracle simulator: https://colororacle.org/ (simulates color blindness)
- Coblis: https://www.color-blindness.com/coblis-color-blindness-simulator/

### Alt Text Requirements

All diagrams must have descriptive alt text:

**Good example:**
```markdown
![Architecture diagram showing three-tier system with load balancer,
application servers, and database cluster](images/architecture.png)
```

**Bad example:**
```markdown
![diagram](images/architecture.png)
```

**Guidelines:**
- Describe the purpose of the diagram
- Mention key components and relationships
- Keep under 125 characters when possible
- Avoid "image of" or "diagram showing" redundancies
- Focus on what users need to understand

**For complex diagrams:**
- Provide brief alt text (<125 chars)
- Include detailed description in text below diagram
- Use `longdesc` attribute for HTML when needed

### Patterns and Textures

Don't rely on color alone to distinguish elements:

```markdown
Use patterns to distinguish elements:
- Solid fill: Primary elements
- Striped: Secondary elements
- Dotted border: Optional/external elements
- Hatched: Deprecated elements
- Gradient: Special or highlighted elements
```

**Benefits:**
- Accessible when printed in grayscale
- Clearer for color-blind users
- Better for photocopies and faxes
- Works in black-and-white publications

### Vector vs Raster

Choose appropriate format:

| Format | When to Use | Accessibility Benefits |
|--------|-------------|------------------------|
| SVG (vector) | Icons, simple diagrams, logos | Scalable, can be read by screen readers with title/desc tags |
| PNG (raster) | Complex diagrams, screenshots | Fixed appearance, compatible alt text, widely supported |

**Recommendation:**
- Use SVG for simple diagrams with clear shapes
- Use PNG for complex diagrams with many elements
- Always provide alt text regardless of format

### Text in Diagrams

Keep text in diagrams accessible:

- **Minimum font size:** 14px at 100% zoom (12pt)
- **High contrast:** Dark text on light background or vice versa
- **Avoid decorative fonts:** Use sans-serif fonts (Arial, Helvetica, system-ui)
- **Limit text:** Use legends and labels instead of long explanations
- **Consistent sizing:** Use same font size for similar elements

**Best Practice:**
```markdown
Place explanatory text outside the diagram:

❌ Bad: Long explanations inside diagram boxes

✅ Good: Concise labels in diagram, detailed legend below
```

**Font guidelines:**
- Use readable sans-serif fonts
- Maintain consistent font hierarchy
- Avoid italic or ornamental fonts
- Ensure text doesn't overlap shapes

### Accessibility Checklist

- [ ] All images have descriptive alt text
- [ ] Colors have sufficient contrast (4.5:1 minimum)
- [ ] Information not conveyed by color alone
- [ ] Text is readable at 100% zoom (14px minimum)
- [ ] Diagram makes sense when viewed in grayscale
- [ ] SVG files have title/desc tags when used
- [ ] Patterns or textures supplement color coding
- [ ] Labels are clear and legible
- [ ] Complex diagrams have text descriptions
- [ ] Color-blind friendly palette used

### Testing for Accessibility

**Manual Checks:**

1. **Grayscale test:** Convert diagram to grayscale to ensure information remains clear
   - draw.io: View → Format Diagram → Grayscale
   - Check that all elements are distinguishable

2. **Color blindness simulator:** Use Color Oracle or similar tool
   - Test with protanopia (red-blind)
   - Test with deuteranopia (green-blind)
   - Test with tritanopia (blue-blind)

3. **Zoom test:** View at 100% and 200% zoom
   - Ensure text remains readable
   - Check that details don't become pixelated

**Automated Checks:**

```bash
# Check alt text with markdown linter
markdownlint docs/**/*.md --rule MD045

# Verify image files exist
markdown-link-check docs/**/*.md

# Check contrast ratios (requires external tool)
# Use WebAIM Contrast Checker for specific color pairs
```

## Diagram Creation Workflow

### Using draw.io (10-Step Workflow)

1. **Access draw.io**
   - Go to https://diagrams.net or https://www.drawio.com
   - Click "Create New Diagram"
   - Choose "Blank Diagram" or select a template

2. **Set up canvas**
   - Select appropriate shape library from left panel
   - Common libraries: General, Arrows, Network, AWS, Azure, GCP
   - Adjust canvas size if needed (File → Page Setup)

3. **Add shapes**
   - Drag shapes from left panel to canvas
   - Use consistent shapes for similar element types
   - Align shapes using grid and guides

4. **Connect elements**
   - Use arrows to show relationships and flow
   - Solid lines for direct connections
   - Dashed lines for indirect or optional connections
   - Add labels to arrows for clarity

5. **Add text**
   - Double-click shapes to add text
   - Keep labels concise (1-3 words)
   - Use consistent terminology
   - Minimum font size: 14px

6. **Apply color scheme**
   - Use color-blind friendly palette (see Accessibility section)
   - Use colors consistently (same element type = same color)
   - Add patterns or textures if colors are similar
   - Ensure sufficient contrast

7. **Review and refine**
   - Check alignment and spacing
   - Remove unnecessary elements
   - Simplify complex areas
   - Verify flow is clear

8. **Test accessibility**
   - Convert to grayscale and verify clarity
   - Check contrast ratios
   - Ensure text is readable at 100%
   - Add alt text description

9. **Export files**
   - File → Export as → PNG (for documentation)
   - Set width to 800px maximum
   - File → Export as → SVG (optional, for web)
   - Save source as .drawio file

10. **Save and commit**
    - Save .drawio source file
    - Export .png image file
    - Name files using kebab-case convention
    - Commit both files to version control

### Creating Specific Diagram Types

#### System Architecture Diagram

**Steps:**
1. Identify major components (services, databases, caches)
2. Use General or AWS/Azure/GCP shape libraries
3. Arrange components logically (left-to-right or top-to-bottom)
4. Connect with arrows showing data flow
5. Add external systems and APIs
6. Include load balancers if applicable
7. Add legend for custom symbols
8. Label all components clearly

**Tips:**
- Group related components visually
- Use color coding by layer (presentation, application, data)
- Show scaling mechanisms (horizontal/vertical)
- Indicate security boundaries

#### Deployment Diagram

**Steps:**
1. Define infrastructure layers (DMZ, private network, etc.)
2. Use Network or Cloud shape library
3. Show network boundaries (subnets, zones)
4. Place servers, containers, and services
5. Include load balancers and firewalls
6. Add storage systems and databases
7. Indicate monitoring and logging
8. Label environments (dev/staging/prod)

**Tips:**
- Show physical or logical topology
- Include cloud provider icons (AWS, Azure, GCP)
- Indicate high availability and redundancy
- Document IP schemes or ports if relevant

#### Sequence Diagram

**Steps:**
1. Identify participants (users, services, databases)
2. Create columns for each participant
3. Draw lifelines (vertical dashed lines)
4. Add activation bars (rectangles on lifelines)
5. Use arrows for messages (solid for sync, dashed for async)
6. Number steps for clarity
7. Include error paths and timeouts
8. Add notes for complex logic

**Tips:**
- Keep under 10-12 steps for clarity
- Show return values on response arrows
- Use notes for conditions or loops
- Indicate time flows downward

#### Entity Relationship Diagram

**Steps:**
1. Identify entities (tables, objects)
2. Create entity boxes with table shape
3. List attributes with data types
4. Mark primary keys (PK) and foreign keys (FK)
5. Use crow's foot notation for cardinality
6. Draw relationships with appropriate connectors
7. Add relationship names (verbs)
8. Include indexes and constraints as notes

**Tips:**
- Show 1:1, 1:N, and M:N relationships
- Use junction tables for M:N relationships
- Indicate cascading deletes or updates
- Keep to high-level entities (avoid normalization detail)

## Cross-References

### Related Skills

- **technical-doc-writer:** Core documentation writing skill
- **technical-doc-templates:** Document templates that include diagram placeholders
- **technical-doc-review:** Documentation review including diagram accessibility

### External Resources

- [draw.io Examples](https://www.drawio.com/example-diagrams) - Browse examples by category
- [C4 Model](https://c4model.com/) - Software architecture diagramming
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - Test color contrast
- [Color Oracle](https://colororacle.org/) - Color blindness simulator

### Quick Commands

```bash
# Create new diagram
skill technical-doc-diagrams "Create system architecture diagram for e-commerce API"

# Review diagram accessibility
skill technical-doc-diagrams "Review deployment diagram for accessibility issues"

# Generate diagram from description
skill technical-doc-diagrams "Create sequence diagram for user authentication flow"
```
