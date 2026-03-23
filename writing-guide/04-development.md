# Development Guides

Helping developers set up and contribute to your project.

## Purpose

Development guides help:
- New team members get productive quickly
- Ensure consistent development environments
- Document workflows and conventions
- Reduce "how do I..." questions

## Development Guide Structure

```markdown
# Development Guide

## Prerequisites
- Node.js 18+
- Docker 20+
- Git 2.30+

## Quick Setup
```bash
git clone repo
cd project
npm install
npm run setup
```

## Development Workflow

### Running Locally
```bash
npm run dev
```

### Running Tests
```bash
npm test
```

### Code Style
```bash
npm run lint
npm run format
```

## Project Structure
```
src/
├── api/          # API endpoints
├── services/     # Business logic
└── utils/        # Utilities
```

## Common Tasks

### Adding a New Feature
1. Create feature branch
2. Implement feature
3. Add tests
4. Update docs
5. Submit PR

### Debugging
```bash
npm run debug
```

## Troubleshooting

### Port Already in Use
```bash
lsof -ti:3000 | xargs kill
```
```

## Prerequisites Section

### ✅ Good: Specific and Versioned

```markdown
## Prerequisites
- **Node.js:** 18.0.0 or higher
- **npm:** 8.0.0 or higher
- **Docker:** 20.10+ (for local database)
- **Git:** 2.30+

Verify your versions:
```bash
node --version  # Should be v18.x.x
npm --version   # Should be 8.x.x
docker --version
git --version
```
```

### ❌ Bad: Vague

```markdown
## Prerequisites
- Node.js
- Docker
- Git
```

## Setup Instructions

### Include Every Step

```markdown
## Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/team/project.git
cd project
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your values
```

### 4. Start the development server
```bash
npm run dev
```

The application will be available at http://localhost:3000
```

## Testing Guidelines

```markdown
## Testing

### Running Tests
```bash
# All tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

### Writing Tests
```javascript
describe('Feature', () => {
  it('should do something', () => {
    const result = function();
    expect(result).toBe(expected);
  });
});
```

### Test Requirements
- Unit tests for all public functions
- Integration tests for API endpoints
- Minimum 80% coverage
```

## Code Style and Conventions

```markdown
## Code Style

### Linting
```bash
npm run lint
npm run lint:fix
```

### Formatting
```bash
npm run format
```

### Commit Messages
Follow conventional commits:
```
feat: add user authentication
fix: resolve login timeout issue
docs: update API documentation
```

### Branch Naming
```
feature/description
bugfix/description
hotfix/description
```
```

## Common Tasks

Create a "Common Tasks" section for frequently asked questions:

```markdown
## Common Tasks

### Reset Local Database
```bash
npm run db:reset
```

### Generate API Client
```bash
npm run generate:client
```

### Run Migrations
```bash
npm run migrate
npm run migrate:undo
```
```

## Troubleshooting

```markdown
## Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Database connection fails
1. Check Docker is running: `docker ps`
2. Verify .env variables
3. Check database logs: `npm run db:logs`

### Tests failing locally but passing in CI
1. Clear cache: `npm run test:clear-cache`
2. Check Node.js version matches CI
3. Verify environment variables
```

## See Also

- [README Documentation](02-readme.md) - Quick Start section
- [API Documentation](05-api-docs.md) - API development guidelines
- [Simple Project Example](../examples/simple-project/docs/development.md)
