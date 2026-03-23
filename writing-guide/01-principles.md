# Documentation Principles

The foundation of good technical documentation.

## Why Documentation Matters

Good documentation:
- **Reduces onboarding time** - New developers become productive faster
- **Reduces support burden** - Questions are answered before they're asked
- **Captures institutional knowledge** - Knowledge isn't lost when people leave
- **Enables scalability** - Teams can grow without constant hand-holding
- **Improves code quality** - Documentation forces clear thinking

## Reader-First Mindset

Always write with your reader in mind:

### ✅ Good: Reader-focused
```markdown
To deploy the application, run `npm run deploy` from the project root.
```

### ❌ Bad: Writer-focused
```markdown
I usually deploy by running npm run deploy.
```

### Questions to ask before writing:
1. Who is reading this? (New developer? Experienced teammate? External user?)
2. What do they already know?
3. What do they need to accomplish?
4. What might confuse them?

## What to Document

### Must Document:

**Essential Sections (every README):**
- **Title & Description** - What is this project?
- **Overview** - Clear explanation of purpose and value
- **Quick Start** - How to get it running immediately
- **Usage** - How to use it

**Common Sections (include when applicable):**
- **Key Features** - Main capabilities (3-5 bullet points)
- **Architecture** - System design and components
- **Tech Stack** - Technologies and tools used
- **Configuration** - Environment variables and settings
- **Testing** - How to run tests
- **Deployment** - Deployment instructions
- **API Documentation** - API reference (for libraries/APIs)
- **Performance & Scalability** - Performance characteristics
- **FAQ** - Common questions and answers

**Optional Sections:**
- **Contributing** - Contribution guidelines
- **License** - License information
- **Changelog** - Version history

**Guideline:** Start with the essential sections, then add common sections based on your project's needs.

### Don't Document:
- Implementation details obvious from code
- Comments that repeat what code does (not why)
- Temporary workarounds (fix the code instead)
- Obsolete features (remove them instead)

## The Documentation Hierarchy

Think of README sections as a hierarchy of importance:

```
                 │
      Essential  ───┤── Title, Overview, Quick Start, Usage                 
                 │
      Common     ───┤── Features, Architecture, Testing, FAQ, etc.
                 │
      Optional   ───┤── Contributing, License, Changelog
                 │
─────────────────┴─────────────────
```

**Build from bottom to top:**
1. Start with Essential sections (foundation)
2. Add Common sections based on project needs
3. Include Optional sections when relevant

This ensures your README has a solid foundation while staying flexible for different project types.

## Common Pitfalls

### 1. Missing the "Why"

Just showing commands without explaining what they do or why they're needed.

**❌ Bad:**
```markdown
npm install
npm run build
docker-compose up -d
```

**✅ Good:**
```markdown
# Install dependencies
npm install

# Build the production bundle
npm run build

# Start the database and API services
docker-compose up -d
```

---

### 2. Incomplete Examples

Code snippets that don't work on their own or skip important context.

**❌ Bad:**
```markdown
To fetch a user:
```javascript
const user = await fetchUser(id);
```
```

**✅ Good:**
```markdown
To fetch a user:
```javascript
const { api } = require('./client');

const user = await api.users.get(id);
console.log(user.name); // "Alice"
```
```

---

### 3. Unexplained Terms

Using jargon, acronyms, or technical terms without definition.

**❌ Bad:**
```markdown
The FLDB stores UM records indexed by UID.
```

**✅ Good:**
```markdown
The Feature Location Database (FLDB) stores User Management (UM) records indexed by unique User ID (UID).
```

---

### 4. Buried Lead

Hiding important information in walls of text instead of leading with it.

**❌ Bad:**
```markdown
## Getting Started

Welcome to our project! We started building this in 2020 after years of research.
Our team believes that documentation is important... [20 paragraphs later] ...
To install: npm install
```

**✅ Good:**
```markdown
## Quick Start

```bash
git clone repo
cd project
npm install
npm start
```

For background on the project, see [About](#about).
```

---

### 5. Outdated Content

Documentation that no longer matches the current code or reality.

**❌ Bad:**
```markdown
# Authentication (Last updated: 2019)
Use API keys in the header.
```
*(Code now uses OAuth)*

**✅ Good:**
```markdown
# Authentication (Last updated: 2024-03-23)
We use OAuth 2.0 for authentication. Include your bearer token in the Authorization header.
```

## Documentation Quality Checklist

Before publishing documentation, verify:
- [ ] Is the purpose clear in the first paragraph?
- [ ] Are all commands copy-pasteable and tested?
- [ ] Are code examples complete and working?
- [ ] Is technical terminology explained or linked?
- [ ] Is the structure logical and scannable?
- [ ] Will this be accurate in 6 months?

## See Also

- [Style Guide](07-style-guide.md) - Writing conventions
- [README Documentation](02-readme.md) - README-specific guidelines
