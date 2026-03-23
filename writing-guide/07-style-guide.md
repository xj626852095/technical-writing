# Documentation Style Guide

Consistent writing conventions for clear, professional documentation.

## Voice and Tone

### Use Active Voice

**✅ Good:**
```markdown
The API validates the token before processing the request.
```

**❌ Bad:**
```markdown
The token is validated by the API before the request is processed.
```

### Use Present Tense

**✅ Good:**
```markdown
This function returns the user object.
```

**❌ Bad:**
```markdown
This function will return the user object.
```

### Address the Reader Directly

**✅ Good:**
```markdown
To install the package, run npm install.
```

**❌ Bad:**
```markdown
The user should run npm install to install the package.
```

## Headings

### Heading Hierarchy

```markdown
# Level 1 - Document title (once per document)
## Level 2 - Main sections
### Level 3 - Subsections
#### Level 4 - Rarely needed
```

**Don't skip levels.** Always use H1 → H2 → H3.

### Heading Style

- **Sentence case:** Capitalize only the first word and proper nouns
- **No period:** Headings don't end with punctuation
- **Descriptive:** Headings should describe the content

**✅ Good:**
```markdown
## Setting up the development environment
### Installing dependencies
### Configuring the database
```

**❌ Bad:**
```markdown
## Setting Up The Development Environment.
### INSTALLING DEPENDENCIES
### How To Configure The Database
```

## Lists

### Use Bullets for Items Without Order

```markdown
Key features:
- Real-time synchronization
- Multi-user support
- Export to PDF
```

### Use Numbers for Sequential Steps

```markdown
To set up the project:
1. Clone the repository
2. Install dependencies
3. Configure environment variables
4. Start the development server
```

### Parallel Lists

Use sub-bullets or nested numbers:

```markdown
Installation steps:

macOS:
1. Install Homebrew
2. Run `brew install node`

Windows:
1. Download installer from nodejs.org
2. Run the installer with default options

Linux:
1. Use your package manager
2. For Ubuntu: `sudo apt install nodejs`
```

## Code Blocks

### Always Specify Language

```markdown
```javascript
const x = 5;
```

```bash
npm install
```

```http
GET /api/users
```
```

### Complete, Working Examples

**✅ Good:**
```javascript
// Fetch user data
async function getUser(id) {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  return data;
}
```

**❌ Bad:**
```javascript
// Pseudocode - won't actually work
function getUser(id) {
  // TODO: implement
  return user;
}
```

### Include Output Where Helpful

```bash
$ npm test

PASS src/auth.test.js
PASS src/api.test.js
Tests: 12 passed, 2 skipped
Time: 2.5s
```

## Emphasis

### Use Bold for:
- File names: **README.md**
- UI elements: Click **Save**
- Key terms: **Authentication**

### Use Code (Backticks) for:
- Commands: `npm install`
- Variables: `USER_ID`
- Code references: `getUser()`
- Configuration keys: `database.url`

### Use Italics for:
- New terms: A *webhook* is a...
- Placeholder text: Replace `YOUR_API_KEY`

## Links

### Internal Links (Relative)

```markdown
See [API Documentation](docs/api.md) for details.
```

### External Links

```markdown
For more information, visit the [official documentation](https://example.com/docs).
```

### Section Anchors

```markdown
Jump to [Authentication](#authentication)
```

## Terminology

### Consistent Product/Feature Names

Establish canonical names and use them consistently:

| Term | Use | Don't Use |
|------|-----|-----------|
| User API | User API | user-api, userAPI, USER_API |
| Authenticate | authenticate | login, log in, signin |
| Endpoint | endpoint | route, path, URL |

### Acronyms

Define acronyms on first use:

```markdown
The User Management Service (UMS) handles user accounts.
The UMS validates credentials before creating accounts.
```

### Technical Terms

Explain or link technical terms:

```markdown
The system uses JSON Web Tokens (JWT) for authentication.
```

or

```markdown
The system uses [JWT](https://jwt.io) for authentication.
```

## Punctuation

### Periods

- **Use periods:** Complete sentences
- **No periods:** Headings, list items (unless complete sentences)

### Commas

Use the Oxford comma in lists:

```markdown
The system supports JSON, XML, and YAML formats.
```

### Colons

Use colons to introduce:
- Code blocks
- Lists
- Examples

```markdown
Install the dependencies:
```bash
npm install
```
```

## Numbers

### Spell Out 0-10

```markdown
one, two, three, ... ten
11, 12, 13, ...
```

**Exception:** Use numerals for:
- Versions: Node.js 18
- Measurements: 500ms timeout
- Code: port 3000
- Data: 50 users

## Formatting Tables

### Column Headers

```markdown
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | string | Yes | User's name |
| age | number | No | User's age |
```

### Alignment

Left-align text, right-align numbers:

```markdown
| Feature | Status | Count |
|---------|--------|-------|
| Auth | Done | 5 |
| API | In Progress | 12 |
```

## Notes, Warnings, and Tips

Use blockquotes for special callouts:

```markdown
> **Note:** This feature requires version 2.0 or higher.

> **Warning:** Deleting a user cannot be undone.

> **Tip:** Use `--help` flag to see all options.
```

## Accessibility

### Alt Text for Images

```markdown
![Architecture diagram showing the three-tier system](images/architecture.png)
```

### Descriptive Links

**✅ Good:**
```markdown
Download the [installation guide](files/guide.pdf).
```

**❌ Bad:**
```markdown
Click [here](files/guide.pdf) to download the guide.
```

## Quick Reference

| Element | Guideline |
|---------|-----------|
| Voice | Active, present tense, second person |
| Headings | Sentence case, no period, descriptive |
| Code blocks | Always specify language |
| Lists | Bullets for unordered, numbers for steps |
| Emphasis | Bold for UI/terms, code for technical |
| Links | Relative for internal, full for external |
| Numbers | Spell out 0-10, numerals for 11+ |

## See Also

- [Documentation Principles](01-principles.md) - Why good documentation matters
- [README Documentation](02-readme.md) - README-specific guidelines
