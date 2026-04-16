# Technical Documentation Skills — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Distill the Technical Documentation Standards project into 4 ECC-format AI skills that enable AI agents to generate, improve, and review technical documentation.

**Architecture:** Core skill (`technical-doc-writer`) handles task detection, style rules, and document patterns. Three satellite skills provide specialized capabilities: templates, diagrams, and review.

**Tech Stack:** ECC skill format (SKILL.md with YAML frontmatter), Markdown content distilled from writing-guide/ and resources/templates/.

---

## File Structure

```
technical-writing/
├── skills/
│   ├── technical-doc-writer/
│   │   └── SKILL.md              # Core skill (~3500 words)
│   ├── technical-doc-templates/
│   │   └── SKILL.md              # Templates satellite (~3000 words)
│   ├── technical-doc-diagrams/
│   │   └── SKILL.md              # Diagrams satellite (~1500 words)
│   └── technical-doc-review/
│       └── SKILL.md              # Review satellite (~1500 words)
```

Each SKILL.md file contains:
- YAML frontmatter (name, description)
- Skill content in markdown
- Cross-references to other skills

---

### Task 1: Create Directory Structure

**Files:**
- Create: `skills/technical-doc-writer/`
- Create: `skills/technical-doc-templates/`
- Create: `skills/technical-doc-diagrams/`
- Create: `skills/technical-doc-review/`

- [ ] **Step 1: Create skills directory structure**

```bash
mkdir -p skills/technical-doc-writer
mkdir -p skills/technical-doc-templates
mkdir -p skills/technical-doc-diagrams
mkdir -p skills/technical-doc-review
```

- [ ] **Step 2: Verify directory creation**

```bash
ls -la skills/
```

Expected output should show 4 directories.

- [ ] **Step 3: Commit directory structure**

```bash
git add skills/
git commit -m "feat: add skills directory structure"
```

---

### Task 2: Create Core Skill — `technical-doc-writer`

**Files:**
- Create: `skills/technical-doc-writer/SKILL.md`

- [ ] **Step 1: Write core skill frontmatter**

Create `skills/technical-doc-writer/SKILL.md` with:

```markdown
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
```

- [ ] **Step 2: Add task detection section to SKILL.md**

```markdown
## Task Detection

Detect the user's intent and route to the appropriate workflow.

### Generate Mode

Triggers: "write a README", "create API docs", "document this project", "generate documentation"

Workflow:
1. Identify document type (README simple, README complex, API, architecture, dev guide, deployment, ADR)
2. Analyze codebase structure (if applicable)
3. Select appropriate document pattern
4. Generate documentation following style rules
5. Include all required sections for the document type

### Improve Mode

Triggers: "fix this README", "improve this doc", "make documentation better", "update documentation"

Workflow:
1. Read existing documentation
2. Compare against standards (section requirements, style rules)
3. Identify gaps and issues
4. Rewrite following patterns and style rules
5. Preserve accurate content, improve structure and clarity

### Review Mode

Triggers: "review documentation", "check documentation quality", "score this doc"

Workflow:
1. Run documentation quality checklist
2. Provide structured feedback with severity levels
3. Calculate health score if metrics available
4. For detailed review, invoke `technical-doc-review` skill
```

- [ ] **Step 3: Add writing style rules section to SKILL.md**

```markdown
## Writing Style Rules

Apply these rules to all documentation.

### Voice and Tone

- **Active voice only:** "The API validates" not "The token is validated by"
- **Present tense:** "This function returns" not "This function will return"
- **Second person:** "To install, run npm install" not "The user should run npm install"

### Headings

- **Sentence case:** Capitalize only first word and proper nouns
- **No periods:** Headings don't end with punctuation
- **Hierarchy:** H1 → H2 → H3, never skip levels
- **Descriptive:** Headings should describe content, not be generic

### Code Blocks

- **Always specify language:** Use triple backticks with language identifier
- **Complete examples:** Code must be copy-pasteable and tested
- **Show output:** Include expected output where helpful

### Emphasis

- **Bold:** UI elements (click **Save**), file names (**README.md**), key terms (**Authentication**)
- **Code:** Commands (`npm install`), variables (`USER_ID`), function names (`getUser()`)
- **Italics:** New terms on first use, placeholder text

### Lists

- **Bullets:** Unordered items, features, options
- **Numbers:** Sequential steps, ordered procedures

### Links

- **Internal:** Use relative paths: [API Docs](docs/api.md)
- **External:** Use full URLs: [React](https://reactjs.org)
- **Descriptive:** Not "click here" — use meaningful link text

### Numbers

- **Spell out 0-10:** one, two, three ... ten
- **Numerals for 11+:** 11, 12, 13 ...
- **Exceptions:** Versions (Node.js 18), measurements (500ms), ports (port 3000), data values (50 users)

### Tables

- **Left-align text columns**
- **Right-align number columns**
- **Include headers for all columns**
```

- [ ] **Step 4: Add document type patterns section to SKILL.md**

```markdown
## Document Type Patterns

### README Simple (13 sections)

For: Libraries, utilities, single-purpose projects

Sections in order:
1. **Title & Description** — One-line tagline answering "what and why"
2. **Overview** — 2-3 paragraphs: what problem, how solved, key benefits
3. **Key Features** — 3-5 bullet points, specific and actionable
4. **Architecture** — High-level structure, optional diagram
5. **Tech Stack** — Language/runtime with versions, key libraries with purposes
6. **Quick Start** — Prerequisites → Installation → Running → Verification
7. **Usage** — Basic example (working code), Advanced example
8. **Configuration** — Environment variables table (Variable | Description | Default)
9. **Testing** — Command to run tests, coverage command if applicable
10. **Deployment** — Build command, deployment steps
11. **FAQ** — 3-5 common questions with honest answers
12. **Contributing** — Brief guidelines or link
13. **License** — License name

### README Complex

For: Multi-module, microservices, distributed systems

All Simple sections plus:
- **Extended Architecture:** Links to docs/architecture.md
- **Service Configuration:** Per-service config locations
- **API Documentation:** Links to service-specific API docs
- **Testing by Type:** Unit, Integration, E2E sections
- **Performance & Scalability:** Benchmarks table, scaling strategy
- **Monitoring:** Metrics dashboard, logs, alerts
- **Deployment Guide Link:** Reference to docs/deployment.md

### API Documentation

For: REST APIs, GraphQL, SDKs

Sections:
1. **Overview** — Purpose, main use cases
2. **Base URLs** — Production, Staging, Development
3. **Authentication** — Method, obtaining credentials, example
4. **API Versioning** — Versioning approach
5. **Request/Response Format** — Content-Type, headers, response structure
6. **Error Handling** — Error format, HTTP status codes table, common error codes table
7. **Rate Limiting** — Policy per tier, headers, rate-limited response
8. **Endpoints** — For each: HTTP method, description, request/response examples, parameters, error responses
9. **Data Models** — TypeScript interfaces with field descriptions
10. **Pagination** — Offset-based and/or cursor-based
11. **Filtering and Sorting** — Syntax and examples
12. **Webhooks** — Events, delivery format, retry logic (if applicable)
13. **SDKs and Libraries** — Official packages with install commands
14. **Examples** — Complete workflow in JavaScript, Python, cURL

### Architecture Document

For: System design, component relationships, technology decisions

Sections:
1. **Overview** — High-level description, main architectural style
2. **Architecture Principles** — 5 key principles (separation of concerns, scalability, availability, modularity, observability)
3. **System Architecture** — Architectural style, layers with technologies
4. **Core Components** — For each: Purpose, Responsibilities, Key Features, Technology Stack, Interfaces
5. **Data Architecture** — Data model, data stores (type/technology/use case), data flow (read path, write path), caching strategy
6. **Security Architecture** — Security layers, auth/auth method, data privacy
7. **Scalability & Performance** — Scaling strategy (horizontal, vertical), performance characteristics table, optimizations, known limitations
8. **Technology Stack** — Languages/runtimes table, frameworks/libraries table, infrastructure table
9. **Deployment Architecture** — Environment overview, infrastructure as code
10. **Design Decisions** — For each: Context, Decision, Consequences (positive/negative), Alternatives considered

### Development Guide

For: Developer onboarding, setup, workflow

Sections:
1. **Getting Started** — Prerequisites (with versions and verification commands), Initial Setup (numbered steps with explanations), Verifying Setup
2. **Development Environment** — Recommended tools, IDE configuration, Environment variables, Services configuration
3. **Project Structure** — Directory tree with inline comments, Key directories explained
4. **Development Workflow** — Git workflow, Commit message format (conventional commits), Code review process
5. **Coding Standards** — Code style, Naming conventions, Code organization, Documentation (function docs, inline comments)
6. **Testing** — Test structure, Writing tests (unit, integration), Running tests, Test coverage target
7. **Debugging** — Local debugging, Logging (levels, format, viewing)
8. **Common Tasks** — Adding features, Adding API endpoints, Database migrations, Dependency updates
9. **Troubleshooting** — Common issues with symptoms and solutions, Getting help

### Deployment Guide

For: Production deployment, CI/CD, operations

Sections:
1. **Deployment Architecture** — Environment overview (Development/Staging/Production table), Infrastructure (cloud provider, region, CDN, load balancer, compute, database)
2. **Prerequisites** — Required tools with download links, Access requirements checklist, Security credentials list
3. **Environment Configuration** — Environment variables table (dev/staging/prod values), Configuration management, Infrastructure as Code
4. **Build Process** — Local build steps, CI/CD build steps, Build artifacts table
5. **Deployment Procedures** — Pre-deployment checklist, Development deployment, Staging deployment, Production deployment (with canary steps), Database migrations
6. **Post-Deployment** — Verification steps (health check, API endpoints, database, monitoring, smoke tests), Performance validation table, Notification template
7. **Rollback Procedures** — Automatic rollback triggers, Manual rollback commands, Rollback decision tree, Rollback verification
8. **Monitoring & Alerts** — Dashboards URLs, Key metrics table with thresholds, Alert channels, Log aggregation
9. **Maintenance** — Regular tasks (daily/weekly/monthly/quarterly), Dependency updates, Security patching (by severity), Backup & Recovery
10. **Emergency Contacts** — Role, Name, Contact table

### Architecture Decision Record

For: Documenting significant technical decisions

Sections:
1. **Status** — Accepted/Proposed/Deprecated/Superseded
2. **Date** — Decision date
3. **Decision Makers** — List of people
4. **Context** — Problem statement, Current situation, Impact
5. **Decision** — Chosen approach, Key points
6. **Alternatives Considered** — For each: Description, Pros, Cons, Why rejected
7. **Consequences** — Positive results, Negative results, Risks and mitigation table
8. **Implementation** — Status, Steps, Owner, Timeline
9. **Related Decisions** — Links to related ADRs
10. **References** — Links to external resources
```

- [ ] **Step 5: Add documentation principles section to SKILL.md**

```markdown
## Documentation Principles

### Reader-First Mindset

Always write for the reader:
- Ask: Who is reading? What do they know? What do they need to accomplish?
- Use "you" to address the reader directly
- Explain technical terms or link to definitions

### Section Hierarchy

Build from essential to optional:

**Essential** (every document must have):
- Title & Description
- Overview
- Quick Start
- Usage

**Common** (include when applicable):
- Key Features
- Architecture
- Tech Stack
- Configuration
- Testing
- Deployment
- API Documentation
- Performance & Scalability
- FAQ

**Optional**:
- Contributing
- License
- Changelog

### Quality Checklist

Before considering documentation complete:
- [ ] Purpose clear in first paragraph?
- [ ] All commands copy-pasteable and tested?
- [ ] Code examples complete and working?
- [ ] Technical terms explained or linked?
- [ ] Structure logical and scannable?
- [ ] Easy to update when code changes?
```

- [ ] **Step 6: Add diagram quick rules section to SKILL.md**

```markdown
## Diagram Quick Rules

When to include diagrams:
- System architecture (high-level overview)
- Data flow through components
- Sequence of operations
- Network topology
- Deployment architecture

Diagram standards:
- **Tool:** draw.io (https://www.drawio.com)
- **Format:** Commit both .drawio (source) and .png (export)
- **Sizing:** PNG max width 800px
- **Naming:** kebab-case matching diagram subject
- **Alt text:** Descriptive, under 125 characters

Accessibility requirements:
- Color-blind friendly palette (see `technical-doc-diagrams` skill)
- 4.5:1 minimum contrast ratio
- Don't rely on color alone (use patterns/textures)
- Minimum 14px font at 100% zoom

For detailed diagram creation rules, invoke `technical-doc-diagrams` skill.
```

- [ ] **Step 7: Add cross-references section to SKILL.md**

```markdown
## Cross-References

### Satellite Skills

- **Full templates:** Invoke `technical-doc-templates` skill for complete inline templates
- **Diagram creation:** Invoke `technical-doc-diagrams` skill for accessibility rules and tooling
- **Documentation review:** Invoke `technical-doc-review` skill for scoring and detailed feedback

### Related Skills

- `ecc:article-writing` — For long-form technical articles and blog posts
- `ecc:doc-coauthoring` — For collaborative documentation workflows
```

- [ ] **Step 8: Validate core skill structure**

```bash
# Check file exists and has content
wc -l skills/technical-doc-writer/SKILL.md
head -20 skills/technical-doc-writer/SKILL.md
```

Expected: File has 200+ lines, frontmatter is correct.

- [ ] **Step 9: Commit core skill**

```bash
git add skills/technical-doc-writer/
git commit -m "feat: add technical-doc-writer core skill"
```

---

### Task 3: Create Templates Satellite Skill

**Files:**
- Create: `skills/technical-doc-templates/SKILL.md`

- [ ] **Step 1: Write templates skill frontmatter**

```markdown
---
name: technical-doc-templates
description: Ready-to-use documentation templates for README (simple/complex),
  API documentation, architecture docs, development guides, deployment guides,
  and architecture decision records. Includes inline comments and placeholders.
---

# Technical Documentation Templates

Ready-to-use templates for all common technical document types.

## Usage

When invoked, return the complete template for the requested document type. Templates include section headings, placeholder text in [BRACKETS], and HTML comments with writing tips.
```

- [ ] **Step 2: Add README Simple template to SKILL.md**

```markdown
## Template: README Simple

```markdown
# [Project Name]

> [One-line description of what this project does and why it's useful]

## Overview

[Paragraph 1: What is this project and what problem does it solve?]

[Paragraph 2: How does it solve the problem? What's the approach?]

[Paragraph 3: What are the key benefits or use cases?]

## Key Features

- [Feature 1] — [Brief description]
- [Feature 2] — [Brief description]
- [Feature 3] — [Brief description]
- [Feature 4] — [Brief description]
- [Feature 5] — [Brief description]

## Architecture

[High-level description of system architecture]

![Architecture](docs/images/architecture.png)

The system consists of:
- **[Component A]** — [Purpose and responsibility]
- **[Component B]** — [Purpose and responsibility]
- **[Component C]** — [Purpose and responsibility]

## Tech Stack

- **[Language/Runtime]** — [Version]
- **[Framework]** — [Version]
- **[Library 1]** — [Purpose]
- **[Library 2]** — [Purpose]

## Quick Start

### Prerequisites

- [Requirement 1] — [Version]
- [Requirement 2] — [Version]

### Installation

```bash
git clone [repository-url]
cd [project-name]
[npm install | pip install -r requirements.txt | cargo install]
cp .env.example .env
# Edit .env with your configuration
```

### Running

```bash
[npm start | python main.py | cargo run]
```

The application will be available at [http://localhost:port].

## Usage

### Basic Usage

```[language]
[code example]
```

### Advanced Usage

```[language]
[advanced example]
```

## Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `[VAR_NAME]` | [Description] | `[default]` |
| `[VAR_NAME]` | [Description] | `[default]` |

Configuration location: `[path/to/config]`

## Testing

```bash
[npm test | pytest | cargo test]
[npm run test:coverage | pytest --cov | cargo tarpaulin]
```

## Deployment

### Building

```bash
[npm run build | cargo build --release]
```

### Deployment Steps

1. [Step 1 with explanation]
2. [Step 2 with explanation]
3. [Step 3 with explanation]

For detailed deployment instructions, see [Deployment Guide](docs/deployment.md).

## FAQ

### [Common question 1]?

[Answer addressing the question directly and honestly]

### [Common question 2]?

[Answer addressing the question directly and honestly]

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

For detailed contribution guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[License name] — see [LICENSE](LICENSE) file for details.

---

**Project:** [Project Name]
**Last Updated:** [Date]
**Maintained by:** [Team name]
```
```

- [ ] **Step 3: Add README Complex template to SKILL.md**

```markdown
## Template: README Complex

```markdown
# [Project Name]

> [One-line description]

## Overview

[2-3 paragraphs describing the project, its purpose, and value proposition]

## Key Features

- [Feature 1] — [Description]
- [Feature 2] — [Description]
- [Feature 3] — [Description]
- [Feature 4] — [Description]
- [Feature 5] — [Description]

## Architecture

[High-level architecture description]

![System Overview](docs/images/architecture.png)

The system follows a [microservices/layered/event-driven] architecture:

### Core Components

- **[Service A]** — [Purpose] — [Technology]
- **[Service B]** — [Purpose] — [Technology]
- **[Service C]** — [Purpose] — [Technology]

For detailed architecture documentation, see [Architecture Guide](docs/architecture.md).

## Tech Stack

### Services

| Service | Language | Version |
|---------|----------|---------|
| [Service A] | [Language] | [Version] |
| [Service B] | [Language] | [Version] |

### Infrastructure

| Layer | Technology | Purpose |
|-------|------------|---------|
| API Gateway | [Technology] | [Purpose] |
| Message Queue | [Technology] | [Purpose] |
| Database | [Technology] [Version] | [Purpose] |
| Cache | [Technology] [Version] | [Purpose] |

### Development Tools

- **Build:** [Tool]
- **Testing:** [Tool]
- **CI/CD:** [Tool]

## Quick Start

### Prerequisites

- [Requirement 1] — [Version]
- [Requirement 2] — [Version]
- Docker — [Version]

### Local Development Setup

```bash
# Clone repository
git clone [repository-url]
cd [project-name]

# Start infrastructure
docker-compose up -d

# Install dependencies
./scripts/install-all.sh

# Configure environment
cp .env.example .env
# Edit .env with your configuration

# Start services
./scripts/start-all.sh
```

### Verify Setup

```bash
# Health check
curl http://localhost:3000/health

# Run smoke tests
./scripts/smoke-test.sh
```

## Usage

### Basic Usage

```[language]
[code example]
```

### Service Interaction

```bash
# Example API call
curl -X POST http://localhost:3000/api/v1/resource \
  -H "Content-Type: application/json" \
  -d '{"key": "value"}'
```

See [API Documentation](docs/api/) for complete API reference.

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `[VAR_NAME]` | [Description] | `[default]` |

### Service Configuration

- [Service A]: [Config location]
- [Service B]: [Config location]

See [Development Guide](docs/development.md) for complete configuration.

## Testing

### Unit Tests

```bash
npm test
cd services/[service-name] && npm test
```

### Integration Tests

```bash
npm run test:integration
```

### E2E Tests

```bash
npm run test:e2e
```

## Development

See [Development Guide](docs/development.md) for:
- Development environment setup
- Code organization and structure
- Common development tasks
- Debugging tips
- Contributing guidelines

## Deployment

### Development Deployment

```bash
./scripts/deploy-dev.sh
```

### Production Deployment

See [Deployment Guide](docs/deployment.md) for:
- Production deployment process
- Environment-specific configuration
- Rollback procedures
- Monitoring and alerts

## API Documentation

- [Service A API](docs/api/service-a.md)
- [Service B API](docs/api/service-b.md)
- [Service C API](docs/api/service-c.md)
- [Shared Types](docs/api/shared-types.md)

## Performance & Scalability

### Performance Benchmarks

| Operation | P50 | P95 | P99 |
|-----------|-----|-----|-----|
| [Operation 1] | [value] | [value] | [value] |
| [Operation 2] | [value] | [value] | [value] |

### Scaling Strategy

- **Horizontal Scaling:** [Description]
- **Vertical Scaling:** [Description]
- **Known Limitations:** [Description]

## Monitoring

- **Metrics:** [Dashboard URL]
- **Logs:** [Logging system URL]
- **Alerts:** [Alert configuration]

## Troubleshooting

See [Troubleshooting Guide](docs/troubleshooting.md) for:
- Common issues and solutions
- Debug procedures
- Log analysis
- Getting help

## FAQ

### [Common question 1]?

[Answer]

### [Common question 2]?

[Answer]

## Contributing

We welcome contributions! See [Contributing Guide](docs/contributing.md).

## License

[License name]

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

---

**Project:** [Project Name]
**Last Updated:** [Date]
**Maintained by:** [Team name]
```
```

- [ ] **Step 4: Add API Documentation template to SKILL.md**

```markdown
## Template: API Documentation

```markdown
# API Reference

> [API Name] — [Brief description]

## Overview

[High-level description of the API, its purpose, and main use cases]

## Base URL

```
[Production] https://api.example.com/v1
[Staging] https://api-staging.example.com/v1
[Development] http://localhost:3000/v1
```

## Authentication

### Authentication Method

[API Key / OAuth2 / JWT / Basic Auth]

### Obtaining Credentials

[Instructions on how to get credentials]

```bash
# Example authentication
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.example.com/v1/resource
```

## API Versioning

The API uses [URL path / header / query parameter] versioning. Current version: `v1`.

## Request/Response Format

### Content Type

- **Request:** `application/json`
- **Response:** `application/json`

### Common Headers

| Header | Description | Required |
|--------|-------------|----------|
| `Authorization` | Bearer token | Yes |
| `Content-Type` | Request content type | Yes |
| `Accept` | Response format preference | No |

### Response Structure

```json
{
  "data": {},
  "meta": {
    "page": 1,
    "perPage": 20,
    "totalPages": 5,
    "totalItems": 100
  },
  "errors": []
}
```

## Error Handling

### Error Response Format

```json
{
  "errors": [
    {
      "code": "ERROR_CODE",
      "message": "Human-readable description",
      "details": {}
    }
  ]
}
```

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

### Common Error Codes

| Code | Description |
|------|-------------|
| `VALIDATION_ERROR` | Request validation failed |
| `NOT_FOUND` | Resource not found |
| `UNAUTHORIZED` | Authentication required |
| `FORBIDDEN` | Insufficient permissions |
| `RATE_LIMIT_EXCEEDED` | Rate limit exceeded |

## Rate Limiting

- **Default:** [X] requests per [minute/hour/day]
- **Authenticated:** [Y] requests per [minute/hour/day]

Rate limit headers:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## Endpoints

### [Resource Name]

#### List [Resource]

```http
GET /api/v1/[resource]
```

Retrieves a paginated list of [resource].

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | integer | No | Page number (default: 1) |
| `perPage` | integer | No | Items per page (default: 20, max: 100) |
| `sort` | string | No | Sort field and order (e.g., "name:asc") |

**Response:**

```json
{
  "data": [
    {
      "id": "123",
      "name": "Example",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "perPage": 20,
    "totalPages": 1,
    "totalItems": 1
  }
}
```

#### Get [Resource]

```http
GET /api/v1/[resource]/{id}
```

Retrieves a single [resource] by ID.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Resource identifier |

**Response:**

```json
{
  "data": {
    "id": "123",
    "name": "Example",
    "description": "A detailed description",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-02T00:00:00Z"
  }
}
```

#### Create [Resource]

```http
POST /api/v1/[resource]
```

Creates a new [resource].

**Request Body:**

```json
{
  "name": "Example",
  "description": "A detailed description"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Resource name |
| `description` | string | No | Resource description |

**Response:** `201 Created`

Returns the created resource.

#### Update [Resource]

```http
PUT /api/v1/[resource]/{id}
```

Updates an existing [resource].

**Request Body:** Same as Create

**Response:** `200 OK`

Returns the updated resource.

#### Delete [Resource]

```http
DELETE /api/v1/[resource]/{id}
```

Deletes a [resource].

**Response:** `204 No Content`

## Data Models

### [Model Name]

```typescript
interface [ModelName] {
  id: string;
  name: string;
  description?: string;
  createdAt: string; // ISO 8601 datetime
  updatedAt: string; // ISO 8601 datetime
}
```

| Field | Type | Nullable | Description |
|-------|------|----------|-------------|
| `id` | string | No | Unique identifier |
| `name` | string | No | Resource name |
| `description` | string | Yes | Optional description |
| `createdAt` | string | No | Creation timestamp |
| `updatedAt` | string | No | Last update timestamp |

## Pagination

List endpoints support pagination:

### Offset-based

```http
GET /api/v1/[resource]?page=2&perPage=20
```

### Cursor-based

```http
GET /api/v1/[resource]?startingAfter=abc123&limit=20
```

## Filtering and Sorting

### Filtering

```
?filter=status:eq:active&filter=createdAt:gte:2024-01-01
```

### Sorting

```
?sort=createdAt:desc&sort=name:asc
```

## SDKs and Libraries

Official SDKs:

- **JavaScript/TypeScript:** `npm install @company/api-client`
- **Python:** `pip install company-api-client`
- **Go:** `go get github.com/company/api-client`

## Support

- **Documentation:** [Link]
- **Issue Tracker:** [Link]
- **Email:** [email]

## Changelog

### v[version] ([date])

- Added: [new feature]
- Fixed: [bug fix]
- Changed: [change description]

---

**API Version:** [version]
**Last Updated:** [date]
```
```

- [ ] **Step 5: Add Architecture Document template to SKILL.md**

```markdown
## Template: Architecture Document

```markdown
# Architecture Documentation

> [Project Name] — System Architecture

## Overview

[High-level description of the system, its purpose, and architectural style]

![System Overview](images/system-overview.png)

The system is built using a [microservices/layered/event-driven] architecture designed to:
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

## Architecture Principles

1. **Separation of Concerns**
   - Each component has a single, well-defined responsibility
   - Clear boundaries between layers and modules

2. **Scalability**
   - Horizontal scaling of stateless services
   - Independent scaling based on load

3. **High Availability**
   - No single points of failure
   - Graceful degradation

4. **Modularity**
   - Loose coupling between components
   - Well-defined interfaces

5. **Observability**
   - Comprehensive logging and metrics
   - Distributed tracing

## System Architecture

### Architectural Style

[Description of the architectural style]

![Architecture](images/architecture.png)

### Architecture Layers

#### Presentation Layer
- [Description]
- Technologies: [List]

#### Application Layer
- [Description]
- Technologies: [List]

#### Domain Layer
- [Description]
- Technologies: [List]

#### Data Layer
- [Description]
- Technologies: [List]

## Core Components

### [Component A]

**Purpose:** [What this component does]

**Responsibilities:**
- [Responsibility 1]
- [Responsibility 2]
- [Responsibility 3]

**Key Features:**
- [Feature 1]
- [Feature 2]

**Technology Stack:**
- Language: [Language]
- Framework: [Framework]
- Key Libraries: [List]

**Interfaces:**
- API: [Endpoints or interfaces]
- Events: [Events published/subscribed]

### [Component B]

[Same structure]

## Data Architecture

### Data Model

![Data Model](images/data-model.png)

[Description of data model and relationships]

### Data Stores

#### [Database 1] — [Purpose]

**Type:** [Relational/Document/Key-Value]
**Technology:** [PostgreSQL/MongoDB/Redis]
**Use Case:** [What data is stored]

**Key Collections/Tables:**
- [Table 1] — [Description]
- [Table 2] — [Description]

**Data Retention:** [Policy]

### Data Flow

![Data Flow](images/data-flow.png)

**Read Path:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Write Path:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Caching Strategy

- **Cache Layer:** [Redis/Memcached]
- **Cache Invalidation:** [Strategy]
- **Cache Keys:** [Pattern]
- **TTL:** [Policies]

## Security Architecture

### Security Layers

1. **Network Security**
   - [Firewall rules]
   - [VPC configuration]
   - [DDoS protection]

2. **Application Security**
   - [Authentication mechanism]
   - [Authorization model]
   - [Input validation]

3. **Data Security**
   - [Encryption at rest]
   - [Encryption in transit]
   - [Key management]

### Authentication & Authorization

**Authentication:**
- Method: [OAuth2/JWT/Session]
- Provider: [Auth0/Custom]

**Authorization:**
- Model: [RBAC/ABAC]
- Permissions: [Description]

## Scalability & Performance

### Scalability Strategy

**Horizontal Scaling:**
- [Description]

**Vertical Scaling:**
- [Description]

### Performance Characteristics

| Operation | P50 | P95 | P99 | Target |
|-----------|-----|-----|-----|--------|
| [Operation 1] | [value] | [value] | [value] | [target] |
| [Operation 2] | [value] | [value] | [value] | [target] |

### Performance Optimizations

- [Optimization 1] — [Description]
- [Optimization 2] — [Description]

### Known Limitations

- [Limitation 1] — [Impact and mitigation]
- [Limitation 2] — [Impact and mitigation]

## Technology Stack

### Languages & Runtimes

| Component | Language | Version |
|-----------|----------|---------|
| [Service A] | [Language] | [Version] |
| [Service B] | [Language] | [Version] |

### Frameworks & Libraries

| Component | Framework/Library | Version | Purpose |
|-----------|-------------------|---------|---------|
| [Service A] | [Framework] | [Version] | [Purpose] |

### Infrastructure

| Layer | Technology | Purpose |
|-------|------------|---------|
| Compute | [AWS EC2/GCE] | Hosting |
| Container | [Docker/K8s] | Orchestration |
| Database | [PostgreSQL] | Persistence |
| Cache | [Redis] | Caching |
| CDN | [CloudFront] | Content delivery |

## Deployment Architecture

![Deployment](images/deployment.png)

### Development Environment

- [Description]

### Staging Environment

- [Description]

### Production Environment

- [Description]

## Design Decisions

### [Decision 1: Title]

**Context:** [Problem description]

**Decision:** [What was decided]

**Consequences:**
- Positive: [Outcome]
- Negative: [Trade-off]
- Mitigation: [How negative is addressed]

**Alternatives:**
- [Alternative 1] — [Why rejected]
- [Alternative 2] — [Why rejected]

**Date:** [Date]

## Future Considerations

### Planned Improvements

- [Improvement 1] — [Rationale and timeline]

### Technical Debt

- [Debt 1] — [Impact and plan]

## Related Documentation

- [API Documentation](api.md)
- [Development Guide](development.md)
- [Deployment Guide](deployment.md)

---

**Document Version:** 1.0
**Last Updated:** [date]
**Maintained by:** [team]
```
```

- [ ] **Step 6: Add remaining templates (Development Guide, Deployment Guide, ADR) to SKILL.md**

```markdown
## Template: Development Guide

```markdown
# Development Guide

> [Project Name] — Developer Guide

## Overview

This guide provides comprehensive information for developers working on [Project Name].

**Audience:** New developers, contributors, maintainers

## Getting Started

### Prerequisites

- **[Language/Runtime]** — [Version] ([link])
- **[Package Manager]** — [Version] ([link])
- **[Database]** — [Version] ([link])
- **Docker** — [Version] ([link])

### Initial Setup

```bash
# Clone repository
git clone [repository-url]
cd [project-name]

# Install dependencies
[npm install | pip install -r requirements.txt]

# Copy environment template
cp .env.example .env
# Edit .env with configuration

# Start infrastructure
docker-compose up -d

# Run migrations
[npm run db:migrate]

# Start development server
[npm run dev]
```

### Verifying Setup

```bash
curl http://localhost:3000/health
npm run test:smoke
```

## Development Environment

### Recommended Tools

- **IDE:** [IDE] with [extensions]
- **API Client:** [Postman/Insomnia]
- **Database Client:** [TablePlus/DBeaver]

### Environment Variables

```bash
# Required
DATABASE_URL=[connection-string]
API_KEY=[key]

# Optional
LOG_LEVEL=debug
PORT=3000
```

## Project Structure

```
project/
├── src/
│   ├── api/          # API handlers
│   ├── models/       # Data models
│   ├── services/     # Business logic
│   └── utils/        # Utilities
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── scripts/
```

## Development Workflow

### Git Workflow

```bash
# Create feature branch
git checkout main
git pull origin main
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "feat: description"

# Push and create PR
git push origin feature/feature-name
```

### Commit Message Format

```
type(scope): subject

body

footer
```

Types: feat, fix, docs, style, refactor, test, chore

### Code Review Process

1. Create PR with description
2. Request reviews
3. Address feedback
4. Merge after approval

## Coding Standards

### Code Style

- [Style guide name]
- Formatter: [Prettier/Black]
- Linter: [ESLint/Pylint]

### Naming Conventions

- Variables/Functions: `camelCase`
- Classes: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`
- Files: `kebab-case`

### Code Organization

```javascript
// 1. Imports
// 2. Constants
// 3. Types/Interfaces
// 4. Functions
// 5. Exports
```

### Documentation

```javascript
/**
 * Function description
 *
 * @param {type} param - Description
 * @returns {type} Description
 *
 * @example
 * const result = functionName(param);
 */
```

## Testing

### Test Structure

- Unit tests: `tests/unit/`
- Integration tests: `tests/integration/`
- E2E tests: `tests/e2e/`

### Running Tests

```bash
npm test                    # All tests
npm run test:unit           # Unit only
npm run test:integration    # Integration only
npm run test:coverage       # With coverage
npm run test:watch          # Watch mode
```

### Test Coverage

Target: [X]%

## Debugging

### Local Debugging

- VS Code debugger: `.vscode/launch.json` included
- Debug tests: `npm run test:debug`

### Logging

Levels: ERROR, WARN, INFO, DEBUG

```bash
npm run logs              # All logs
npm run logs:error        # Errors only
npm run logs:tail         # Tail logs
```

## Common Tasks

### Adding a Feature

1. Create branch
2. Implement feature
3. Write tests
4. Update docs
5. Create PR

### Adding API Endpoint

1. Define route
2. Create handler
3. Add validation
4. Write tests
5. Update API docs

### Database Migration

```bash
npm run db:migrate:create -- migration-name
npm run db:migrate
npm run db:migrate:rollback
```

### Updating Dependencies

```bash
npm outdated
npm update [package]
npm audit
npm audit fix
```

## Troubleshooting

### Database Connection Failed

```bash
docker-compose ps
docker-compose restart db
echo $DATABASE_URL
```

### Port Already in Use

```bash
lsof -i :3000
kill -9 [PID]
```

## Related Documentation

- [Architecture](architecture.md)
- [API Documentation](api.md)
- [Deployment Guide](deployment.md)

---

**Version:** 1.0
**Last Updated:** [date]
```

## Template: Deployment Guide

```markdown
# Deployment Guide

> [Project Name] — Deployment Documentation

## Overview

This guide covers deployment for [Project Name].

## Deployment Architecture

| Environment | Purpose | URL | Access |
|-------------|---------|-----|--------|
| Development | Active dev | dev.example.com | Team |
| Staging | Pre-production | staging.example.com | Team + QA |
| Production | Live | example.com | Public |

### Infrastructure

- **Cloud:** [AWS/Azure/GCP]
- **Region:** [Region]
- **CDN:** [CloudFront/Cloudflare]
- **Load Balancer:** [ALB/NGINX]
- **Compute:** [EKS/GKE/EC2]
- **Database:** [RDS/Cloud SQL]

## Prerequisites

### Required Tools

- **[CLI]** — [Purpose] — [link]
- **kubectl** — [link]
- **Docker** — [link]

### Access Requirements

- [ ] Cloud account access
- [ ] Repository access
- [ ] Deployment permissions
- [ ] Monitoring access

### Security Credentials

Required credentials stored in [vault/secrets manager]:
- Database credentials
- API keys
- TLS certificates
- Auth tokens

## Environment Configuration

### Environment Variables

| Variable | Development | Staging | Production | Description |
|----------|-------------|---------|------------|-------------|
| `DATABASE_URL` | *[value]* | *[value]* | *[value]* | DB connection |
| `REDIS_URL` | *[value]* | *[value]* | *[value]* | Redis connection |
| `API_KEY` | *[value]* | *[value]* | *[value]* | API key |
| `LOG_LEVEL` | `debug` | `info` | `warn` | Logging level |

### Infrastructure as Code

```bash
cd infrastructure
terraform init
terraform plan
terraform apply
```

## Build Process

### Local Build

```bash
npm install
npm run lint
npm test
npm run build
```

### CI/CD Build

Triggered on: push to main, PR creation, manual

Steps:
1. Checkout code
2. Install dependencies
3. Run tests
4. Build artifacts
5. Push to registry
6. Deploy

## Deployment Procedures

### Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Code reviewed
- [ ] CHANGELOG updated
- [ ] Migration scripts ready
- [ ] Rollback plan ready
- [ ] Stakeholders notified

### Development Deployment

```bash
./scripts/deploy-dev.sh
```

### Staging Deployment

```bash
./scripts/deploy-staging.sh
```

### Production Deployment

```bash
# Create release tag
git tag -a v1.2.3 -m "Release v1.2.3"
git push origin v1.2.3

# Deploy canary (10%)
./scripts/deploy-production.sh --canary --percent 10

# Monitor canary for 10 minutes
# Check metrics: [dashboard]

# Full rollout
./scripts/deploy-production.sh --rollout

# Verify
curl https://example.com/health
```

### Database Migrations

```bash
npm run db:migrate:up
npm run db:migrate:down
```

Guidelines:
- Create backward-compatible migrations
- Test on staging first
- Have rollback script ready
- Never delete columns in same migration

## Post-Deployment

### Verification Steps

1. **Health Check:**
   ```bash
   curl https://example.com/health
   ```

2. **API Endpoints:**
   ```bash
   curl https://example.com/api/v1/resource
   ```

3. **Database:**
   ```bash
   npm run db:check
   ```

4. **Monitoring:** Check dashboards

5. **Smoke Tests:**
   ```bash
   npm run test:smoke
   ```

### Performance Validation

| Metric | Baseline | Post-Deployment | Status |
|--------|----------|-----------------|--------|
| Response Time P95 | [value] | [value] | [✓/✗] |
| Error Rate | [value] | [value] | [✓/✗] |
| Throughput | [value] | [value] | [✓/✗] |

## Rollback Procedures

### Automatic Rollback

Triggered if:
- Error rate > [X]%
- Response time > [Y]ms
- Health check fails [Z] times

### Manual Rollback

```bash
./scripts/rollback-production.sh
./scripts/rollback-production.sh --version v1.2.2
npm run db:migrate:rollback
```

### Rollback Decision Tree

```
Issue detected
  │
  ├─ Critical? → Immediate rollback
  └─ Not critical? → Can hotfix?
      ├─ Yes → Deploy hotfix
      └─ No → Rollback
```

## Monitoring & Alerts

### Dashboards

- Application: [URL]
- Infrastructure: [URL]
- Business Metrics: [URL]

### Key Metrics

| Metric | Threshold | Alert Level |
|--------|-----------|-------------|
| Error Rate | > 1% | Warning |
| Error Rate | > 5% | Critical |
| Response Time P95 | > 500ms | Warning |
| Response Time P95 | > 1000ms | Critical |

### Alert Channels

- **Critical:** PagerDuty/SMS
- **Warning:** Slack
- **Info:** Email

### Log Aggregation

Platform: [ELK/CloudWatch/Splunk]

Access: [URL]

## Maintenance

### Regular Tasks

**Daily:**
- Review error rates
- Check disk space
- Verify backups

**Weekly:**
- Review security alerts
- Update dependencies
- Clean up logs

**Monthly:**
- Optimize queries
- Update documentation
- Security audit

**Quarterly:**
- Disaster recovery test
- Performance review
- Capacity planning

### Dependency Updates

```bash
npm outdated
npm update
npm audit
npm audit fix
```

### Security Patching

- **Critical:** 24 hours
- **High:** 1 week
- **Medium:** 1 month
- **Low:** Next release

### Backup & Recovery

**Schedule:**
- Database: Every 6 hours
- Configuration: Daily
- Logs: Weekly

**Retention:**
- Daily: 30 days
- Weekly: 12 weeks
- Monthly: 12 months

**Restore:**
```bash
./scripts/restore-db.sh --backup-id [ID]
npm run db:verify
```

## Troubleshooting

### Deployment Fails

```bash
npm cache clean --force
rm -rf node_modules
npm install
npm run build
```

### Health Check Fails

```bash
kubectl logs -f deployment/app
kubectl exec -it pod-name -- npm run db:check
kubectl rollout restart deployment/app
```

### High Memory Usage

```bash
kubectl top pods
kubectl scale deployment app --replicas=4
```

## Emergency Contacts

| Role | Name | Contact |
|------|------|---------|
| On-call | [Name] | [Phone/Slack] |
| DevOps Lead | [Name] | [Phone/Slack] |

## Related Documentation

- [Architecture](architecture.md)
- [Development Guide](development.md)

---

**Version:** 1.0
**Last Updated:** [date]
```

## Template: Architecture Decision Record

```markdown
# Architecture Decision Record: [Title]

**Status:** Accepted/Proposed/Deprecated/Superseded

**Date:** [YYYY-MM-DD]

**Decision Makers:** [List]

## Context

**Problem Statement:**
[What problem are we trying to solve?]

**Current Situation:**
[Describe current state and why it's insufficient]

**Impact:**
[What happens if we don't decide?]

## Decision

**Chosen Approach:**
[Brief statement of the decision]

**Key Points:**
- [Point 1]
- [Point 2]
- [Point 3]

## Alternatives Considered

### Alternative 1: [Name]

**Description:**
[Brief description]

**Pros:**
- [Advantage 1]
- [Advantage 2]

**Cons:**
- [Disadvantage 1]
- [Disadvantage 2]

**Why Rejected:**
[Explanation]

### Alternative 2: [Name]

**Description:**
[Brief description]

**Pros:**
- [Advantage 1]
- [Advantage 2]

**Cons:**
- [Disadvantage 1]
- [Disadvantage 2]

**Why Rejected:**
[Explanation]

## Consequences

**Positive Results:**
- [Positive outcome 1]
- [Positive outcome 2]

**Negative Results:**
- [Negative outcome 1]
- [Negative outcome 2]

**Risks and Mitigation:**

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| [Risk 1] | High/Med/Low | [Description] | [Strategy] |
| [Risk 2] | High/Med/Low | [Description] | [Strategy] |

## Implementation

**Status:** Not Started/In Progress/Completed

**Steps:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Owner:** [Person/Team]

**Timeline:** [Date]

## Related Decisions

- [ADR-001](adr-001.md) — [Title]
- [ADR-003](adr-003.md) — [Title]

## References

- [Link 1] — [Description]
- [Link 2] — [Description]

---

**Last Updated:** [date]
```
```

- [ ] **Step 7: Validate templates skill structure**

```bash
wc -l skills/technical-doc-templates/SKILL.md
```

Expected: File has 400+ lines (all 7 templates).

- [ ] **Step 8: Commit templates skill**

```bash
git add skills/technical-doc-templates/
git commit -m "feat: add technical-doc-templates satellite skill"
```

---

### Task 4: Create Diagrams Satellite Skill

**Files:**
- Create: `skills/technical-doc-diagrams/SKILL.md`

- [ ] **Step 1: Write diagrams skill frontmatter**

```markdown
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
```

- [ ] **Step 2: Add diagram type selection section to SKILL.md**

```markdown
## Diagram Type Selection

### When to Use Each Diagram Type

**System Architecture Diagram**
- Use: High-level system overview, infrastructure layout
- Shows: Major components and their relationships
- Template: `resources/diagram-sources/system-overview.drawio`

**Deployment Diagram**
- Use: Infrastructure topology, environment layout
- Shows: Servers, databases, load balancers, network connections
- Template: `resources/diagram-sources/deployment.drawio`

**Sequence Diagram**
- Use: API flows, authentication flows, multi-step operations
- Shows: Step-by-step interaction between components
- Template: `resources/diagram-sources/sequence-diagram-examples.drawio`

**Data Flow Diagram**
- Use: Data moving through the system
- Shows: Data sources, processing steps, data destinations
- Template: `resources/diagram-sources/data-flow.puml` (PlantUML)

**ER Diagram**
- Use: Database schema, data relationships
- Shows: Tables, fields, relationships
- Template: `resources/diagram-sources/er-diagram-example.drawio`

**C4 Component Diagram**
- Use: Software architecture documentation
- Shows: Containers, components, and their relationships
- Template: `resources/diagram-sources/c4-component.drawio`

**Flowchart**
- Use: Linear processes, decision trees
- Shows: Steps, decisions, outcomes
- Template: `resources/diagram-sources/flowchart.xml`

**Microservices Pattern**
- Use: Microservices architecture with API Gateway
- Shows: API Gateway, Services, Databases, Message Queue
- Template: `resources/diagram-sources/microservices.puml` (PlantUML)
```

- [ ] **Step 3: Add diagram standards section to SKILL.md**

```markdown
## Diagram Standards

### Tool Requirements

**Primary Tool:** draw.io (https://www.drawio.com or https://www.diagrams.net)

**Why draw.io?**
- Free, no installation required
- Export to PNG, SVG, PDF
- Version control friendly (.drawio is XML)
- Large built-in shape library
- Web-based with desktop app option

### File Format Requirements

**Commit both formats:**

| Format | Purpose | Requirement |
|--------|---------|-------------|
| .drawio | Source file | Always commit |
| .png | Documentation | Max width: 800px |

**Never commit .png without the .drawio source.**

### Naming Convention

Use kebab-case matching the diagram subject:

```
docs/images/
├── system-overview.drawio
├── system-overview.png
├── data-flow.drawio
├── data-flow.png
├── deployment.drawio
└── deployment.png
```

**Rules:**
- All lowercase
- Words separated by hyphens
- Descriptive of diagram content
- Same name for .drawio and .png pair

### Sizing Requirements

- **PNG max width:** 800 pixels
- **Export setting:** PNG at 300 DPI
- **Text size:** Minimum 14px at 100% zoom

### Markdown Syntax

```markdown
![Descriptive alt text under 125 chars](relative/path/to/image.png)
```
```

- [ ] **Step 4: Add accessibility section to SKILL.md**

```markdown
## Accessibility Requirements

### Color-Blind Friendly Palette

Use these specific hex codes for maximum accessibility:

| Color | Hex | Use Case |
|-------|-----|----------|
| Blue | #0052CC | Primary elements, flow arrows |
| Orange | #FF991F | Highlights, warnings |
| Green | #00875A | Success, positive paths |
| Red | #DE350B | Errors, negative paths |
| Purple | #6554C0 | Secondary elements |
| Gray | #42526E | Neutral, background |

### Avoid

- **Red/green combinations** — Problematic for red-green color blindness
- **Relying on color alone** — Use patterns/textures alongside color
- **Low contrast combinations** — Must meet 4.5:1 minimum

### Contrast Requirements

- **Text and background:** Minimum 4.5:1 contrast ratio
- **Important elements:** Minimum 7:1 contrast ratio
- **Lines and shapes:** Use distinct borders when colors are similar

### Testing Tools

- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Chrome DevTools Lighthouse audit
- Color Oracle (simulates color blindness)

### Alt Text Requirements

All diagrams must have descriptive alt text:

```markdown
![Architecture diagram showing three-tier system with load balancer,
application servers, and database cluster](images/architecture.png)
```

**Guidelines:**
- Describe the purpose of the diagram
- Mention key components and relationships
- Keep under 125 characters
- Avoid "image of" or "diagram showing" redundancies

### Patterns and Textures

Don't rely on color alone to distinguish elements:

- **Solid fill:** Primary elements
- **Striped pattern:** Secondary elements
- **Dotted border:** Optional/external elements
- **Hatched pattern:** Deprecated elements

### Vector vs Raster

| Format | When to Use | Accessibility Benefits |
|--------|-------------|------------------------|
| SVG (vector) | Icons, simple diagrams | Scalable, screen reader friendly |
| PNG (raster) | Complex diagrams | Fixed appearance, alt text support |

### Text in Diagrams

- **Minimum font size:** 14px at 100% zoom
- **Font:** Sans-serif (Arial, Helvetica, or system fonts)
- **Contrast:** Dark text on light background or vice versa
- **Placement:** Use legends and labels, minimize text inside shapes

**Best Practice:**
```
❌ Bad: Long explanations inside diagram boxes
✅ Good: Concise labels in diagram, detailed legend below
```

### Accessibility Checklist

Before committing a diagram:

- [ ] Alt text under 125 characters
- [ ] Colors have 4.5:1+ contrast ratio
- [ ] Information not conveyed by color alone
- [ ] Text readable at 100% zoom (14px+)
- [ ] Diagram makes sense in grayscale
- [ ] If SVG: includes title/desc tags

### Testing for Accessibility

**Grayscale Test:**
1. In draw.io: View → Format Diagram → Grayscale
2. Verify all elements remain distinguishable
3. If not, add patterns or adjust contrast

**Automated Checks:**
```bash
# Check alt text in markdown files
markdownlint docs/**/*.md --rule MD045

# Verify image files exist
markdown-link-check docs/**/*.md
```
```

- [ ] **Step 5: Add diagram creation workflow section to SKILL.md**

```markdown
## Diagram Creation Workflow

### Using draw.io

1. **Open draw.io**
   - Go to https://www.drawio.com
   - Or download desktop app from https://github.com/jgraph/drawio-desktop

2. **Create New Diagram**
   - Click "Create New Diagram"
   - Select blank canvas or template

3. **Use Appropriate Template**
   - Browse templates matching your diagram type
   - Templates provide consistent shapes and styles

4. **Add Shapes**
   - Drag shapes from left panel to canvas
   - Use shape library matching your diagram type

5. **Connect Shapes**
   - Use arrows from shape edge to shape edge
   - Arrow direction matters for flow

6. **Add Text**
   - Double-click shapes to add text
   - Keep labels concise
   - Use consistent terminology

7. **Apply Accessibility**
   - Use approved color palette
   - Check contrast ratios
   - Add patterns if needed

8. **Export**
   - File → Export as → PNG
   - Set max width: 800px
   - Set DPI: 300
   - Save to `docs/images/` directory

9. **Save Source**
   - File → Save As → .drawio
   - Save alongside PNG with same name

10. **Add to Documentation**
    ```markdown
    ![Alt text](images/diagram-name.png)
    ```

### Creating Specific Diagram Types

**System Architecture:**
1. Start with system-overview template
2. Add major components as rectangles
3. Connect with arrows showing relationships
4. Label each component with name and technology
5. Use blue (#0052CC) for components, gray (#42526E) for external systems

**Deployment Diagram:**
1. Start with deployment template
2. Add infrastructure components (servers, databases, LBs)
3. Show network connections
4. Label with technology names
5. Use blue for internal, gray for cloud services

**Sequence Diagram:**
1. Start with sequence-diagram template
2. Add actors/services as vertical lines
3. Add messages as horizontal arrows
4. Number steps for clarity
5. Use blue for request, green for success, red for error

**ER Diagram:**
1. Start with er-diagram template
2. Add tables as rectangles
3. Show relationships as connecting lines
4. Label with crow's foot notation
5. Use blue for tables, orange for relationships
```

- [ ] **Step 6: Validate diagrams skill structure**

```bash
wc -l skills/technical-doc-diagrams/SKILL.md
```

Expected: File has 150+ lines.

- [ ] **Step 7: Commit diagrams skill**

```bash
git add skills/technical-doc-diagrams/
git commit -m "feat: add technical-doc-diagrams satellite skill"
```

---

### Task 5: Create Review Satellite Skill

**Files:**
- Create: `skills/technical-doc-review/SKILL.md`

- [ ] **Step 1: Write review skill frontmatter**

```markdown
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
```

- [ ] **Step 2: Add review checklist section to SKILL.md**

```markdown
## Review Checklist

### Content Quality

- [ ] **Purpose is clear** — Document's goal stated upfront
- [ ] **Audience is appropriate** — Content matches reader's knowledge level
- [ ] **Information is complete** — All necessary topics covered
- [ ] **Information is accurate** — Technical details correct
- [ ] **Instructions are actionable** — Steps can be followed
- [ ] **Examples are complete** — Code samples work

### Clarity and Readability

- [ ] **Language is clear** — No undefined jargon
- [ ] **Structure is logical** — Information flows sensibly
- [ ] **Headings are descriptive** — Scannable and meaningful
- [ ] **Tone is consistent** — Voice matches style guide
- [ ] **Explanations are concise** — Respects reader's time

### Accuracy and Currency

- [ ] **Code examples run** — All tested and working
- [ ] **Commands work** — Shell commands produce stated results
- [ ] **Links are valid** — All references point to existing resources
- [ ] **Version information is current** — Software versions up to date
- [ ] **Screenshots match** — Images reflect current UI

### Grammar and Style

- [ ] **No spelling errors** — Run spell checker
- [ ] **Proper grammar** — Well-formed sentences
- [ ] **Consistent terminology** — Product names match style guide
- [ ] **Follows style guide** — Adheres to documentation standards

### Accessibility

- [ ] **Images have alt text** — Descriptive text under 125 chars
- [ ] **Links are descriptive** — Not "click here"
- [ ] **Code has language specified** — Proper syntax highlighting
- [ ] **Contrast is sufficient** — Text readable for visually impaired
```

- [ ] **Step 3: Add feedback categories section to SKILL.md**

```markdown
## Feedback Format

Categorize all feedback by severity:

### Must Fix

Blocks publication. Critical issues that:
- Contain factual errors
- Have broken code examples
- Are missing essential information
- Have security implications

Example:
```
[MUST FIX] Quick Start section missing
The Quick Start section is required but not present. Add the following sections:
1. Prerequisites with versions
2. Installation steps
3. Running the application
4. Verification steps
```

### Should Fix

Important improvements. Issues that:
- Reduce clarity significantly
- Confuse the reader
- Omit helpful context
- Have minor style violations

Example:
```
[SHOULD FIX] Overview lacks problem statement
The first paragraph describes the project but doesn't clearly state what
problem it solves. Consider adding: "This project addresses the problem
of X by providing Y, which enables Z."
```

### Nice to Have

Optional enhancements. Polish items like:
- Formatting improvements
- Additional examples
- Better organization
- Enhanced readability

Example:
```
[NICE TO HAVE] Add screenshot to Quick Start
Adding a screenshot of the running application would help users verify
their setup. Place after the "Running" section.
```

### Question

Needs clarification. When:
- Intent is unclear
- Information seems contradictory
- Implementation details vague

Example:
```
[QUESTION] Configuration section mentions both .env and config.json
Are these mutually exclusive or used together? Clarify when each approach
should be used.
```
```

- [ ] **Step 4: Add health score section to SKILL.md**

```markdown
## Quality Scoring

### Health Score Formula

Calculate overall documentation health:

```
Health Score = (0.3 × Coverage) + (0.3 × Quality) + (0.2 × Usage) + (0.2 × Support)
```

### Metric Definitions

**Coverage** (0-100)
- Formula: (Documented features / Total features) × 100
- Source: Feature inventory, API endpoint list, module count

**Quality** (0-100)
- Formula: Average of quality checklist items
- Source: Review checklist completion rate

**Usage** (0-100)
- Formula: Min(normalized page views, normalized search queries)
- Source: Analytics, search logs

**Support** (0-100)
- Formula: (Documentation tickets / Total tickets) × 100
- Source: Support ticket tags

### Score Categories

| Score Range | Category | Action Required |
|-------------|----------|-----------------|
| 90-100 | Excellent | Maintain, monitor |
| 70-89 | Good | Improve gaps |
| 50-69 | Fair | Significant work needed |
| <50 | Needs Improvement | Urgent attention required |

### Example Calculation

```
Coverage:  85% × 0.3 = 25.5
Quality:   90% × 0.3 = 27.0
Usage:    75% × 0.2 = 15.0
Support:  80% × 0.2 = 16.0
─────────────────────────
Health Score: 83.5 / 100 (Good)
```

### When Metrics Are Unavailable

If usage/support metrics unavailable, use simplified formula:

```
Health Score = (0.5 × Coverage) + (0.5 × Quality)
```
```

- [ ] **Step 5: Add approval criteria section to SKILL.md**

```markdown
## Approval Criteria

Documentation is approved when:

### Required
- [ ] All "Must Fix" issues resolved
- [ ] 80% of "Should Fix" issues resolved
- [ ] At least one reviewer approval received

### Publication Steps

1. Merge approved changes
2. Update documentation version if applicable
3. Deploy to production
4. Announce changes (if applicable)
5. Archive review feedback
```

- [ ] **Step 6: Add review output template section to SKILL.md**

```markdown
## Review Output Template

Produce reviews in this format:

```markdown
# Documentation Review: [Document Name]

**Date:** [YYYY-MM-DD]
**Reviewer:** [Name/AI]
**Document Type:** [README/API/Architecture/etc.]

## Executive Summary

**Health Score:** [X]/100 ([Category])

**Overall Status:** [Approved/Needs Revision/Not Approved]

**Key Findings:**
- [Major finding 1]
- [Major finding 2]

## Content Quality

**Strengths:**
- [Strength 1]
- [Strength 2]

**Issues Found:**
- [MUST FIX] [Issue 1]
- [SHOULD FIX] [Issue 2]
- [NICE TO HAVE] [Suggestion 1]

## Clarity and Readability

**Strengths:**
- [Strength]

**Issues Found:**
- [SHOULD FIX] [Issue]
- [QUESTION] [Clarification needed]

## Accuracy and Currency

**Issues Found:**
- [MUST FIX] [Critical error]
- [SHOULD FIX] [Version outdated]

## Grammar and Style

**Issues Found:**
- [NICE TO HAVE] [Style improvement]

## Accessibility

**Issues Found:**
- [SHOULD FIX] [Alt text missing]
- [NICE TO HAVE] [Contrast improvement]

## Recommendations

### Priority Actions
1. [Must fix item 1]
2. [Must fix item 2]

### Improvement Opportunities
1. [Should fix item 1]
2. [Should fix item 2]

### Future Enhancements
1. [Nice to have item 1]

## Approval Status

**[Approved / Not Approved]**

**Conditions for Approval:**
- [Condition 1]
- [Condition 2]

---
**Next Review Date:** [Date if applicable]
```
```

- [ ] **Step 7: Validate review skill structure**

```bash
wc -l skills/technical-doc-review/SKILL.md
```

Expected: File has 150+ lines.

- [ ] **Step 8: Commit review skill**

```bash
git add skills/technical-doc-review/
git commit -m "feat: add technical-doc-review satellite skill"
```

---

### Task 6: Final Validation and Documentation

**Files:**
- Create: `skills/README.md`

- [ ] **Step 1: Create skills directory README**

Create `skills/README.md`:

```markdown
# Technical Documentation Skills

A set of ECC-format AI skills for generating, improving, and reviewing technical documentation.

## Skills

### Core Skill

**[`technical-doc-writer`](technical-doc-writer/SKILL.md)**
- Purpose: Main entry point for all documentation tasks
- Detects task type (generate/improve/review)
- Applies style rules and document patterns
- References satellite skills for specialized tasks

### Satellite Skills

**[`technical-doc-templates`](technical-doc-templates/SKILL.md)**
- Purpose: Ready-to-use templates for common document types
- Templates: README (simple/complex), API, Architecture, Dev Guide, Deployment, ADR
- Includes inline comments and placeholders

**[`technical-doc-diagrams`](technical-doc-diagrams/SKILL.md)**
- Purpose: Create accessible technical diagrams
- Covers: diagram types, accessibility, tooling, workflow
- Color-blind friendly palettes included

**[`technical-doc-review`](technical-doc-review/SKILL.md)**
- Purpose: Review and score documentation quality
- Includes: checklist, feedback format, health score formula
- Structured output with severity levels

## Usage

### For AI Agents

Invoke the appropriate skill based on task:

- **Generate documentation:** `technical-doc-writer` (auto-selects templates)
- **Create diagram:** `technical-doc-diagrams`
- **Review documentation:** `technical-doc-review`

### For Humans

Skills serve as reference documentation for:
- Writing guidelines and best practices
- Template structures and patterns
- Review standards and scoring
- Diagram creation and accessibility

## Development

Source material distilled from:
- `writing-guide/` — 10 chapters of documentation standards
- `resources/templates/` — 7 ready-to-use templates
- `examples/` — Complete examples demonstrating standards

## License

Same as parent project.
```

- [ ] **Step 2: Validate all skill files exist**

```bash
ls -la skills/*/
```

Expected output shows:
- `skills/technical-doc-writer/SKILL.md`
- `skills/technical-doc-templates/SKILL.md`
- `skills/technical-doc-diagrams/SKILL.md`
- `skills/technical-doc-review/SKILL.md`
- `skills/README.md`

- [ ] **Step 3: Verify skill file contents**

```bash
# Check frontmatter in each skill
for dir in technical-doc-writer technical-doc-templates technical-doc-diagrams technical-doc-review; do
  echo "=== $dir ==="
  head -10 skills/$dir/SKILL.md
done
```

Expected: Each file has valid YAML frontmatter with name and description.

- [ ] **Step 4: Count lines in each skill**

```bash
echo "Line counts:"
wc -l skills/*/SKILL.md skills/README.md
```

Expected:
- technical-doc-writer: ~200 lines
- technical-doc-templates: ~400 lines
- technical-doc-diagrams: ~150 lines
- technical-doc-review: ~150 lines

- [ ] **Step 5: Commit final changes**

```bash
git add skills/README.md
git commit -m "docs: add skills directory README"
```

---

### Task 7: Create Usage Example

**Files:**
- Create: `examples/skills-usage.md`

- [ ] **Step 1: Create usage example document**

Create `examples/skills-usage.md`:

```markdown
# Technical Documentation Skills — Usage Examples

Examples demonstrating how to use the technical documentation skills.

## Example 1: Generate README for Simple Project

**User Request:**
```
Write a README for my JavaScript utility library
```

**Agent Workflow:**
1. Invokes `technical-doc-writer` (detects Generate mode)
2. Analyzes codebase structure
3. Selects README Simple pattern
4. Generates documentation with all 13 sections
5. Fills in content based on code analysis

**Output:** Complete README.md following simple project template

## Example 2: Improve API Documentation

**User Request:**
```
Improve this API documentation, it's missing examples
```

**Agent Workflow:**
1. Invokes `technical-doc-writer` (detects Improve mode)
2. Reads existing API documentation
3. Compares against API Documentation pattern
4. Identifies missing: examples, error codes, pagination
5. Rewrites following standards, adds missing sections

**Output:** Improved API.md with examples, error handling, pagination

## Example 3: Create Architecture Diagram

**User Request:**
```
Create a system architecture diagram for my microservices app
```

**Agent Workflow:**
1. Invokes `technical-doc-diagrams`
2. Identifies diagram type: System Architecture
3. Selects appropriate template
4. Applies color-blind friendly palette
5. Generates .drawio and .png files
6. Includes accessibility-compliant alt text

**Output:** `docs/images/architecture.drawio` and `.png`

## Example 4: Review Documentation Quality

**User Request:**
```
Review my documentation and tell me what needs fixing
```

**Agent Workflow:**
1. Invokes `technical-doc-review`
2. Runs quality checklist
3. Calculates health score
4. Produces structured feedback with severity levels
5. Identifies must-fix, should-fix, and nice-to-have items

**Output:** Review report with health score, categorized issues, recommendations

## Example 5: Generate Architecture Document

**User Request:**
```
Create architecture documentation for this system
```

**Agent Workflow:**
1. Invokes `technical-doc-writer` (detects Generate mode)
2. Invokes `technical-doc-templates` for Architecture template
3. Analyzes codebase for components, data flow, tech stack
4. Fills in all 10 architecture sections
5. Creates diagrams using `technical-doc-diagrams`

**Output:** Complete `docs/architecture.md` with diagrams

## Example 6: Full Documentation Suite

**User Request:**
```
Document this entire project
```

**Agent Workflow:**
1. Analyzes project type (simple vs complex)
2. Generates README (main or complex pattern)
3. Creates architecture documentation
4. Generates API documentation (if applicable)
5. Creates development guide
6. Creates deployment guide
7. Generates diagrams for each document
8. Reviews all documentation

**Output:** Complete documentation suite:
- README.md
- docs/architecture.md
- docs/api/*.md
- docs/development.md
- docs/deployment.md
- docs/images/*.png (diagrams)
```

- [ ] **Step 2: Commit usage example**

```bash
git add examples/skills-usage.md
git commit -m "docs: add skills usage examples"
```

---

### Task 8: Final Review and Tag

- [ ] **Step 1: Verify all commits**

```bash
git log --oneline -10
```

Expected: Commits for directory structure, core skill, templates skill, diagrams skill, review skill, README, usage examples.

- [ ] **Step 2: Verify implementation complete**

Check against design spec requirements:

**Core Skill (`technical-doc-writer`):**
- [x] Task detection rules (Generate/Improve/Review)
- [x] Writing style rules (voice, headings, code, emphasis, lists, links, numbers, tables)
- [x] Document type patterns (all 7 types with section descriptions)
- [x] Documentation principles (reader-first, section hierarchy, quality checklist)
- [x] Diagram quick rules (tool, format, naming, accessibility summary)
- [x] Cross-references to satellites

**Satellite Skills:**
- [x] `technical-doc-templates`: All 7 templates inline
- [x] `technical-doc-diagrams`: Diagram types, standards, accessibility, workflow
- [x] `technical-doc-review`: Checklist, feedback format, health score, approval, output template

**Supporting Files:**
- [x] skills/README.md
- [x] examples/skills-usage.md

- [ ] **Step 3: Create git tag**

```bash
git tag -a v1.0.0 -m "Release Technical Documentation Skills v1.0.0

- Core skill: technical-doc-writer
- Satellite skills: templates, diagrams, review
- Complete ECC-format skill suite for documentation"
git push origin v1.0.0
```

- [ ] **Step 4: Update main README**

Add section to `README.md`:

```markdown
## AI Skills

This project is available as a set of ECC-format AI skills for use with Claude Code and compatible agents.

See [skills/README.md](skills/README.md) for skill documentation and usage.
```

```bash
git add README.md
git commit -m "docs: reference AI skills in main README"
```

---

## Summary

This implementation plan creates 4 ECC-format AI skills distilled from the Technical Documentation Standards project:

1. **Core skill** (`technical-doc-writer`) — Task detection, style rules, document patterns
2. **Templates satellite** (`technical-doc-templates`) — 7 inline templates
3. **Diagrams satellite** (`technical-doc-diagrams`) — Accessibility-compliant diagram creation
4. **Review satellite** (`technical-doc-review`) — Quality scoring and feedback

Each skill is independently invocable and follows ECC format with YAML frontmatter. The core skill references satellites for specialized tasks.

**Estimated completion time:** 2-3 hours
**Total lines of code/markdown:** ~900 lines across 5 files
**Testing approach:** Manual validation of structure, frontmatter, and completeness
