# TaskQueue

> A lightweight, in-memory task queue library for Node.js with async job processing, retry logic, and event emitters.

## Overview

TaskQueue is a simple yet powerful task queue library designed for Node.js applications that need to process asynchronous jobs in the background. It provides a clean API for managing tasks, automatic retry logic for failed jobs, and event-based monitoring of queue activity.

Perfect for background job processing in web servers, microservices, or any application that needs to handle asynchronous operations without blocking the main thread.

## Key Features

- **In-Memory Queue** - Fast, zero-dependency task queue
- **Async/Await Support** - Modern JavaScript promise-based API
- **Automatic Retries** - Configurable retry logic with exponential backoff
- **Event Emitters** - Real-time events for job lifecycle
- **Concurrency Control** - Process multiple jobs in parallel
- **Job Priority** - Support for high, normal, and low priority jobs
- **Progress Tracking** - Monitor job progress and completion
- **TypeScript Support** - Full TypeScript definitions included

## Architecture

The TaskQueue is built around a producer-consumer pattern with an event-driven architecture:

![Architecture](docs/images/architecture.png)

The system is structured as follows:
- **Queue Manager** - Manages the in-memory queue and job scheduling
- **Worker Pool** - Executes jobs with configurable concurrency
- **Retry Handler** - Manages failed job retry logic
- **Event Emitter** - Publishes job lifecycle events

## Tech Stack

- **Node.js** - 16.x or higher
- **TypeScript** - 5.x (optional, for type definitions)
- **No external dependencies** - Pure JavaScript implementation

## Quick Start

### Prerequisites

- **Node.js** - 16.x or higher
- **npm** or **yarn** - Package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/example/taskqueue.git
cd taskqueue

# Install dependencies
npm install

# Set up environment (optional)
cp .env.example .env
# Edit .env with your configuration
```

### Running

```bash
# Start the example server
npm start

# Or run the demo
node src/demo.js
```

The application will start processing tasks immediately.

## Usage

### Basic Usage

```javascript
const { TaskQueue } = require('./src/index');

// Create a queue with concurrency of 2
const queue = new TaskQueue({ concurrency: 2 });

// Add a task
queue.add(async () => {
  console.log('Processing task...');
  await delay(1000);
  console.log('Task complete!');
});

// Start processing
queue.start();
```

### Advanced Usage

```javascript
const { TaskQueue, JobPriority } = require('./src/index');

const queue = new TaskQueue({
  concurrency: 5,
  retries: 3,
  retryDelay: 1000,
});

// Listen to events
queue.on('job:complete', (job) => {
  console.log(`Job ${job.id} completed`);
});

queue.on('job:failed', (job, error) => {
  console.error(`Job ${job.id} failed:`, error.message);
});

// Add tasks with priorities
queue.add(
  async () => {
    await sendEmail();
  },
  { priority: JobPriority.HIGH }
);

queue.add(
  async () => {
    await generateReport();
  },
  { priority: JobPriority.LOW }
);

// Start processing
queue.start();

// Graceful shutdown
process.on('SIGTERM', async () => {
  await queue.stop();
  console.log('Queue stopped gracefully');
});
```

### Job Progress Tracking

```javascript
queue.add(async (progress) => {
  for (let i = 0; i < 100; i += 10) {
    await doWork();
    progress(i);
  }
}, { id: 'my-job' });

queue.on('job:progress', (job, percent) => {
  console.log(`Job ${job.id} is ${percent}% complete`);
});
```

## Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `concurrency` | Number of jobs to process in parallel | 2 |
| `retries` | Number of times to retry failed jobs | 0 |
| `retryDelay` | Initial delay before retry (ms) | 1000 |
| `timeout` | Maximum job execution time (ms) | 30000 |

Configuration file location: Pass options to TaskQueue constructor

## Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run watch mode
npm run test:watch
```

## Deployment

### Building

```bash
npm run build
```

### Deployment Steps

1. Build the project
2. Publish to npm registry
3. Update version in package.json
4. Create git tag

See [Deployment Guide](docs/deployment.md) for detailed instructions.

## API Documentation

Complete API reference is available at [API Reference](docs/api.md).

## Performance & Scalability

### Performance Characteristics

- **Throughput:** Processes ~1000 jobs/second per worker (simple jobs)
- **Memory:** ~100 bytes per queued job
- **Latency:** Sub-millisecond job scheduling

### Scalability Considerations

- **Single Process:** Limited to single Node.js process
- **In-Memory:** Jobs are lost if process crashes
- **Persistence:** Not suitable for critical production use without persistence
- **Scaling:** Scale horizontally by using multiple queue instances

## FAQ

### Can I persist jobs to disk?

No, TaskQueue is designed as an in-memory queue. For persistence, consider using Redis-backed queues like Bull or BeeQueue.

### How do I handle long-running jobs?

Use the `timeout` option and implement job checkpoints. For very long jobs, consider breaking them into smaller chunks.

### Can I use this in production?

TaskQueue is suitable for non-critical background tasks. For mission-critical applications, use a more robust solution with persistence and clustering support.

### What happens if the process crashes?

All pending jobs in memory will be lost. Implement job persistence or use a Redis-backed queue for reliability.

## Contributing

We welcome contributions!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass (`npm test`)
6. Submit a pull request

Please follow our coding standards and include tests for any new features.

## License

MIT License - see LICENSE file for details

---

**Project:** TaskQueue
**Documentation Last Updated:** 2026-03-23
