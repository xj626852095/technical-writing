---
name: technical-doc-writer
description: Generate, improve, and review technical documentation following
  comprehensive writing standards. Covers README, architecture, API docs,
  development guides, and deployment guides with inline style rules and
  document patterns.
trigger_on:
  - "write.*documentation"
  - "create.*README"
  - "document.*project"
  - "api.*doc"
  - "architecture.*doc"
  - "improve.*documentation"
  - "fix.*documentation"
  - "review.*documentation"
---

# Technical Documentation Writer

Generate, improve, and review technical documentation following comprehensive writing standards.

## Task Detection

### Generate Mode

**Triggers:**
- "write/create documentation"
- "create README"
- "document.*project/code/api"
- "write.*guide"

**Workflow:**
1. Clarify document type (README, API, Architecture, Guide, ADR)
2. Gather context: project files, code structure, existing docs
3. Apply document pattern from section below
4. Follow writing style rules
5. Include diagrams where appropriate
6. Verify with quality checklist

### Improve Mode

**Triggers:**
- "improve/fix documentation"
- "better.*docs"
- "clarify.*documentation"

**Workflow:**
1. Read existing documentation
2. Identify gaps and issues using quality checklist
3. Apply writing style rules
4. Reorganize following section hierarchy
5. Enhance with examples and diagrams
6. Mark sections needing technical review

### Review Mode

**Triggers:**
- "review.*documentation"
- "check.*docs"
- "documentation.*feedback"

**Workflow:**
1. Read documentation completely
2. Evaluate against quality checklist
3. Check writing style consistency
4. Verify technical accuracy
5. Suggest structural improvements
6. Provide prioritized issue list

## Writing Style Rules

### Voice and Tone

- **Active voice:** "The system processes requests" not "Requests are processed by the system"
- **Present tense:** "This function returns" not "This function will return"
- **Second person:** "You can install" not "Users can install"
- **Simple, direct language:** Avoid jargon, explain technical terms on first use

### Headings

- **Sentence case:** Capitalize only first word and proper nouns
- **No periods:** Except in headings that are complete questions
- **Hierarchy:** One H1 per document, H2 for main sections, H3 for subsections
- **Descriptive:** Headings describe content, not actions (e.g., "Configuration Options" not "Configuring")

### Code Blocks

- **Specify language:** Always use syntax highlighting (` ```python `)
- **Complete examples:** Code should run as-is (include imports, setup)
- **Show output:** Include expected output or result
- **Keep current:** Verify code examples work with latest version
- **Add context:** Explain what code does before showing it

### Emphasis

- **Bold:** UI elements ("Click **Save**"), key terms, important warnings
- **Code font:** File names, file paths, command names, variables, technical elements (`src/main.py`)
- **Italics:** First use of new terms, emphasis ("_asynchronous_ operations")
- **Avoid ALL CAPS:** Use bold and warnings instead

### Lists

- **Bullets:** Unordered items, options, features where order doesn't matter
- **Numbers:** Sequential steps, ordered items, procedures where order matters
- **Parallel structure:** All items in list follow same grammatical pattern
- **Punctuation:** Complete sentences get periods, fragments don't
- **Limit:** Keep lists under 8 items; group related items

### Links

- **Internal:** Use relative paths (`../api/endpoint.md` not full URLs)
- **External:** Full URLs with descriptive text ([GitHub](https://github.com) not "click here")
- **Reference style:** For multiple references to same target, use reference-style links
- **Avoid redundancy:** Don't link the same term repeatedly in one section

### Numbers

- **Spell out 0-10:** "three files" not "3 files"
- **Numerals for 11+:** "15 requests" not "fifteen requests"
- **Exceptions:** Measurements (5MB), percentages (25%), versions (Python 3.9), code (var1)
- **Start of sentence:** Always spell out
- **Consistency:** Within same category, use same format

### Tables

- **Left-align text:** Left-align text columns
- **Right-align numbers:** Right-align numeric columns
- **Headers included:** Always include column headers
- **Keep narrow:** Limit to 4-5 columns, split wide tables
- **Explain first:** Introduce table before presenting it

## Document Type Patterns

### README Simple

**Sections:**
1. **Title** - Project name and brief tagline
2. **Badges** - Build status, version, coverage
3. **About** - 2-3 sentence project summary
4. **Features** - Bullet list of key capabilities
5. **Quick Start** - Minimal steps to first use
6. **Installation** - Setup instructions for common platforms
7. **Usage** - Essential usage examples
8. **Configuration** - Basic configuration options
9. **API Overview** - Link to full API docs, key endpoints
10. **Testing** - How to run tests
11. **Contributing** - Brief contribution guidelines
12. **License** - License name and link
13. **Acknowledgments** - Credits to contributors, dependencies

### README Complex

**Additional Sections:**
- **Background** - Project context and motivation
- **Architecture** - High-level system design overview
- **Performance** - Benchmarks and optimization notes
- **Security** - Security considerations and best practices
- **Troubleshooting** - Common issues and solutions
- **Changelog** - Link to changelog
- **Roadmap** - Planned features and timeline
- **Related Projects** - Similar or complementary tools
- **Community** - Mailing list, Slack, support channels
- **Funding** - Sponsorship information

### API Documentation

**Sections:**
1. **Overview** - API purpose and capabilities
2. **Authentication** - How to authenticate requests
3. **Base URL** - Base URL for all endpoints
4. **Response Format** - Common response structure
5. **Errors** - Error codes and handling
6. **Rate Limiting** - Rate limit policies
7. **Endpoints** - Full endpoint documentation
8. **Data Models** - Request/response schemas
9. **Examples** - Code examples in common languages
10. **SDKs/Libraries** - Official client libraries
11. **Webhooks** - Webhook events and handling
12. **Pagination** - How pagination works
13. **Versioning** - API version policy
14. **Changelog** - Recent API changes

### Architecture Document

**Sections:**
1. **Overview** - System purpose and scope
2. **Goals** - Architectural goals and constraints
3. **High-Level Design** - Major components and relationships
4. **Components** - Detailed component descriptions
5. **Data Flow** - Request/response lifecycle
6. **Technology Stack** - Technologies and rationale
7. **Scalability** - Scaling strategies and limits
8. **Security** - Security measures and considerations
9. **Deployment** - Deployment architecture
10. **Decision Log** - Links to ADRs

### Development Guide

**Sections:**
1. **Overview** - What this guide covers
2. **Prerequisites** - Required knowledge and tools
3. **Development Setup** - Environment configuration
4. **Project Structure** - Code organization
5. **Coding Standards** - Style guide and conventions
6. **Testing** - How to write and run tests
7. **Debugging** - Debugging techniques and tools
8. **Common Tasks** - Frequently performed operations
9. **Resources** - Additional learning materials

### Deployment Guide

**Sections:**
1. **Overview** - Deployment options and overview
2. **Prerequisites** - System requirements
3. **Environment Configuration** - Environment variables and settings
4. **Build Process** - How to build for deployment
5. **Deployment Options** - Various deployment methods
6. **Docker Deployment** - Container-based deployment
7. **Cloud Deployment** - Cloud platform specifics
8. **Monitoring** - Health checks and monitoring
9. **Troubleshooting** - Common deployment issues
10. **Rollback** - How to rollback changes

### Architecture Decision Record

**Sections:**
1. **Title** - Decision title
2. **Status** - Accepted, Deprecated, Superseded
3. **Context** - Problem and background
4. **Decision** - What was decided
5. **Drivers** - Constraints and requirements
6. **Options Considered** - Alternatives evaluated
7. **Pros and Cons** - Benefits and drawbacks
8. **Consequences** - Impact and outcomes
9. **Implementation** - How decision was implemented
10. **Related Decisions** - Links to related ADRs

## Documentation Principles

### Reader-First Mindset

- **Identify your audience:** Are they developers, operators, end users?
- **Answer their questions:** What do they need to know? What problems are they solving?
- **Start with why:** Explain purpose before details
- **Progressive disclosure:** Basic information first, advanced later
- **Remove barriers:** No paywalls, signups, or prerequisites for essential docs

### Section Hierarchy

**Essential:** Include in every document
- Title and overview
- Quick start or basic usage
- Installation or setup
- Configuration basics

**Common:** Include when relevant
- Detailed usage examples
- API reference
- Troubleshooting
- Best practices
- Performance considerations

**Optional:** Include as needed
- Background/history
- Advanced configuration
- Internal architecture
- Design decisions
- Future plans

### Quality Checklist

- [ ] **Clear purpose:** Document states what it covers and who it's for
- [ ] **Complete:** Covers all necessary topics, no missing steps
- [ ] **Current:** Information is up-to-date with latest version
- [ ] **Accurate:** Code examples work, instructions are correct
- [ ] **Consistent:** Style, terminology, and structure are uniform
- [ ] **Accessible:** Clear language, explained jargon, logical organization

## Diagram Quick Rules

### When to Use Diagrams

- **System architecture:** Show major components and their relationships
- **Data flow:** Illustrate how data moves through the system
- **Process flow:** Document multi-step procedures or algorithms
- **Network topology:** Display network infrastructure and connections
- **State machines:** Represent system states and transitions

### Diagram Standards

- **Tool:** Use Mermaid for code-native diagrams, export with technical-doc-diagrams skill
- **Format:** SVG for web, PNG for documents, PDF for print
- **Sizing:** Maximum width 800px for web, fit to page for docs
- **Naming:** Descriptive names matching section (e.g., `architecture-overview.mmd`)
- **Alt text:** Provide descriptive text for accessibility
- **Keep simple:** Focus on key elements, avoid clutter

### Accessibility Requirements

- **Color palette:** Colorblind-safe palettes (use tool defaults)
- **Contrast:** Minimum 4.5:1 contrast ratio for text/lines
- **Patterns:** Use patterns/textures in addition to color
- **Font size:** Minimum 12pt for text in diagrams
- **Labels:** Clear, readable labels with good spacing

**See also:** `technical-doc-diagrams` skill for diagram creation and best practices

## Cross-References

### Satellite Skills

- **technical-doc-templates:** Document templates for common doc types
- **technical-doc-diagrams:** Diagram creation and standards
- **technical-doc-review:** Documentation review checklist and process

### Related Skills

- **article-writing:** For blog posts, tutorials, and articles
- **doc-coauthoring:** Collaborative documentation writing

### Quick Commands

```bash
# Create new README
skill technical-doc-writer "Create README for e-commerce API"

# Improve existing docs
skill technical-doc-writer "Improve docs in guides/user-guide.md"

# Review documentation
skill technical-doc-writer "Review api/authentication.md"
```
