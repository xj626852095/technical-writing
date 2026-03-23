# TaskQueue Development Guide

> Developer guide for contributing to TaskQueue

## Overview

This guide provides information for developers working on TaskQueue, including setup, workflows, coding standards, and best practices.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** - 16.x or higher ([Download](https://nodejs.org/))
- **npm** - 8.x or higher (comes with Node.js)
- **Git** - Latest version ([Download](https://git-scm.com/))
- **VS Code** - Recommended IDE ([Download](https://code.visualstudio.com/))

### Initial Setup

```bash
# 1. Clone the repository
git clone https://github.com/example/taskqueue.git
cd taskqueue

# 2. Install dependencies
npm install

# 3. Install development dependencies
npm install --save-dev

# 4. Run tests to verify setup
npm test

# 5. Start development mode
npm run dev
```

### Verifying Setup

```bash
# Run health check
npm run health

# Run all tests
npm test

# Run example
node src/demo.js
```

## Development Environment

### Recommended Tools

- **IDE:** VS Code with ESLint and Prettier extensions
- **Git Client:** Git CLI or GitHub Desktop
- **Test Runner:** Jest (included)

### VS Code Configuration

Install recommended extensions:

- **ESLint** - Linting JavaScript code
- **Prettier** - Code formatting
- **Jest** - Test runner integration

Workspace settings are included in `.vscode/settings.json`.

### Project Structure

```
taskqueue/
├── src/
│   ├── index.js           # Main entry point
│   ├── queue.js           # TaskQueue class
│   ├── job.js             # Job class
│   └── utils.js           # Utility functions
├── tests/
│   ├── queue.test.js      # Queue tests
│   ├── job.test.js        # Job tests
│   └── integration.test.js # Integration tests
├── docs/
│   ├── api.md             # API documentation
│   ├── development.md     # This file
│   └── architecture.md    # Architecture docs
├── examples/
│   └── demo.js            # Usage examples
├── .eslintrc.js           # ESLint configuration
├── .prettierrc            # Prettier configuration
├── package.json           # Project configuration
└── README.md              # Project documentation
```

### Key Files

#### `src/index.js`
Main entry point that exports the TaskQueue class and utilities.

#### `src/queue.js`
Core TaskQueue implementation including queue management, worker pool, and event handling.

#### `src/job.js`
Job class representing individual tasks with retry logic and state management.

#### `src/utils.js`
Helper functions for delay, validation, and error handling.

## Development Workflow

### Git Workflow

We use a feature branch workflow:

```bash
# 1. Create a feature branch from main
git checkout main
git pull origin main
git checkout -b feature/your-feature-name

# 2. Make your changes
# Commit frequently with clear messages

# 3. Push to remote
git push origin feature/your-feature-name

# 4. Create a pull request
# Use the GitHub UI to create a PR

# 5. Address review feedback
# Make changes and push updates

# 6. After approval, merge and delete branch
```

### Commit Message Format

Follow conventional commits:

```
type(scope): subject

body

footer
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Examples:**

```
feat(queue): add priority queue support

Implement job prioritization with HIGH, NORMAL, and LOW
priority levels. Jobs are executed in priority order.

Closes #123
```

```
fix(retry): fix exponential backoff calculation

Correct the exponential backoff delay calculation to
properly multiply by 2^attempt.

Fixes #456
```

### Code Review Process

1. Create pull request with clear description
2. Request review from at least one maintainer
3. Address all review comments
4. Ensure all checks pass (CI/CD)
5. Squash commits if needed
6. Merge after approval

## Coding Standards

### Code Style

We follow standard JavaScript style guidelines with ESLint and Prettier.

**Formatting:**

```bash
# Run Prettier to format code
npm run format

# Check formatting without changing files
npm run format:check
```

**Linting:**

```bash
# Run ESLint
npm run lint

# Fix linting issues automatically
npm run lint:fix
```

### Naming Conventions

#### Variables and Functions
- Use `camelCase` for variables and functions
- Use descriptive names that indicate purpose

```javascript
// Good
const pendingJobs = [];
const getNextJob = () => {};

// Bad
const pj = [];
const get = () => {};
```

#### Classes
- Use `PascalCase` for class names

```javascript
class TaskQueue {}
class Job {}
```

#### Constants
- Use `UPPER_SNAKE_CASE` for constants

```javascript
const DEFAULT_CONCURRENCY = 2;
const MAX_RETRIES = 3;
```

### Code Organization

#### Module Structure

```javascript
// 1. Imports
const EventEmitter = require('events');

// 2. Constants
const DEFAULT_CONCURRENCY = 2;

// 3. Class/Function definition
class TaskQueue extends EventEmitter {
  constructor(options = {}) {
    super();
    // implementation
  }
}

// 4. Exports
module.exports = TaskQueue;
```

### Documentation

#### Function Documentation

```javascript
/**
 * Adds a job to the queue
 *
 * @param {TaskFunction} task - Async function to execute
 * @param {JobOptions} options - Job configuration options
 * @returns {Job} The created job object
 *
 * @example
 * const job = queue.add(async () => {
 *   await processData();
 * }, { priority: JobPriority.HIGH });
 */
add(task, options = {}) {
  // implementation
}
```

#### Inline Comments

- Use comments to explain **why**, not **what**
- Keep comments up-to-date with code changes
- Use TODO/FIXME comments for temporary notes

```javascript
// Good: Explains why
// We use exponential backoff to avoid overwhelming the server
const delay = Math.pow(2, attempt) * baseDelay;

// Bad: Explains what (obvious from code)
// Set delay to 2^attempt * baseDelay
const delay = Math.pow(2, attempt) * baseDelay;
```

## Testing

### Test Structure

```
tests/
├── unit/
│   ├── queue.test.js
│   └── job.test.js
└── integration/
    └── queue-integration.test.js
```

### Writing Tests

#### Unit Tests

```javascript
describe('TaskQueue', () => {
  describe('add()', () => {
    it('should add a job to the queue', () => {
      const queue = new TaskQueue();
      const job = queue.add(async () => {});

      expect(queue.getStats().pending).toBe(1);
      expect(job).toBeDefined();
    });

    it('should assign auto-generated ID if not provided', () => {
      const queue = new TaskQueue();
      const job = queue.add(async () => {});

      expect(job.id).toMatch(/^job-\d+$/);
    });
  });
});
```

#### Integration Tests

```javascript
describe('Queue Integration', () => {
  it('should process jobs in FIFO order', async () => {
    const queue = new TaskQueue({ concurrency: 1 });
    const results = [];

    queue.add(async () => results.push('first'));
    queue.add(async () => results.push('second'));
    queue.add(async () => results.push('third'));

    queue.start();
    await queue.waitForEmpty();

    expect(results).toEqual(['first', 'second', 'third']);
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Run with coverage
npm run test:coverage

# Run watch mode
npm run test:watch

# Run specific test file
npm test -- tests/queue.test.js
```

### Test Coverage

- Target: 90% coverage
- Minimum per file: 80%
- Check coverage report: `open coverage/index.html`

## Debugging

### Local Debugging

#### Using VS Code Debugger

Configuration included in `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Run Tests",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": ["--runInBand"]
    }
  ]
}
```

#### Debugging Tests

```bash
# Run tests in debug mode
node --inspect-brk node_modules/.bin/jest --runInBand
```

### Logging

#### Log Levels

- **ERROR:** Application errors
- **WARN:** Warning messages
- **INFO:** General information
- **DEBUG:** Detailed debugging info

#### Console Output

The library uses console.log for debugging. To enable debug output:

```javascript
const queue = new TaskQueue({ debug: true });
```

## Common Tasks

### Adding a New Feature

1. Create feature branch
2. Implement feature following coding standards
3. Write tests for new functionality
4. Update API documentation
5. Create pull request

### Adding a New Event

1. Add event constant in appropriate file
2. Emit event at appropriate time
3. Update documentation with event details
4. Add test for event emission

### Updating Dependencies

```bash
# Check for updates
npm outdated

# Update a package
npm update package-name

# Update all packages
npm update

# Audit for vulnerabilities
npm audit
npm audit fix
```

## Troubleshooting

### Common Issues

#### Issue: Tests fail with timeout

**Solution:**
```javascript
// Increase timeout in test
it('should process long-running job', async () => {
  const job = queue.add(async () => {
    await longOperation();
  }, { timeout: 60000 });
}, 100000); // 100 second timeout
```

#### Issue: Memory leak in tests

**Solution:**
```javascript
afterEach(() => {
  // Clean up queues after each test
  if (queue) {
    await queue.stop();
    queue.clear();
  }
});
```

### Getting Help

- Check existing [GitHub Issues](https://github.com/example/taskqueue/issues)
- Create new issue with:
  - Description of problem
  - Steps to reproduce
  - Expected vs actual behavior
  - Environment details
- Contact: taskqueue@example.com

## Performance Guidelines

### Optimization Tips

1. **Avoid excessive event emissions**
   - Events have overhead
   - Consider batching events

2. **Use appropriate concurrency**
   - Higher concurrency = more memory
   - Benchmark to find optimal value

3. **Clean up completed jobs**
   - Remove old job references
   - Prevent memory leaks

### Performance Testing

```bash
# Run performance benchmarks
npm run benchmark
```

## Related Documentation

- [Architecture Documentation](architecture.md)
- [API Documentation](api.md)
- [README](../README.md)

---

**Document Version:** 1.0
**Last Updated:** 2024-03-23
**Maintained by:** TaskQueue Team
