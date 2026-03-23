# TaskQueue Architecture

> System architecture and design documentation for TaskQueue

## Overview

TaskQueue is a lightweight, in-memory task queue library built on Node.js's EventEmitter pattern. It provides a simple yet powerful API for asynchronous job processing with retry logic and priority support.

This document describes the system architecture, design decisions, and implementation details.

## Architecture Principles

1. **Simplicity** - Minimal dependencies, easy to understand and use
2. **Performance** - In-memory queue for fast job scheduling
3. **Reliability** - Automatic retry logic for failed jobs
4. **Observability** - Event-based monitoring of job lifecycle
5. **Extensibility** - Easy to extend and customize

## System Architecture

### High-Level Architecture

TaskQueue follows a producer-consumer pattern with an event-driven architecture:

```
┌─────────────┐
│   Producer  │ (adds jobs)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    Queue    │ (pending jobs)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Worker Pool │ (executes jobs)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Events    │ (notifications)
└─────────────┘
```

### Component Overview

#### Queue Manager
- Manages the in-memory job queue
- Handles job prioritization
- Coordinates worker pool

#### Worker Pool
- Executes jobs with configurable concurrency
- Manages active job state
- Handles job completion and failure

#### Retry Handler
- Implements exponential backoff
- Tracks retry attempts
- Schedules job retries

#### Event Emitter
- Publishes job lifecycle events
- Enables monitoring and hooks
- Supports external integrations

## Core Components

### TaskQueue Class

The main class that orchestrates all queue operations.

**Responsibilities:**
- Queue management (add, remove, clear)
- Worker pool management
- Event emission
- Lifecycle management (start, stop, pause)

**Key Methods:**
- `add(task, options)` - Add job to queue
- `start()` - Start processing jobs
- `stop()` - Stop processing jobs
- `pause()` / `resume()` - Pause/resume processing
- `getStats()` - Get queue statistics

### Job Class

Represents a single task to be executed.

**Responsibilities:**
- Store job state (pending, active, completed, failed)
- Manage retry logic
- Track job progress
- Store job result

**Properties:**
- `id` - Unique identifier
- `task` - Function to execute
- `options` - Job configuration
- `state` - Current state
- `attempts` - Number of execution attempts
- `result` - Job result (if completed)
- `error` - Error (if failed)

### Priority Queue

Implements job prioritization for execution order.

**Implementation:**
- Separate queues for HIGH, NORMAL, and LOW priority
- Jobs executed in priority order
- FIFO within each priority level

```javascript
const queues = {
  [JobPriority.HIGH]: [],
  [JobPriority.NORMAL]: [],
  [JobPriority.LOW]: []
};
```

### Worker Pool

Manages concurrent job execution.

**Implementation:**
- Limits number of concurrent jobs
- Pulls jobs from priority queue
- Executes jobs and handles completion/failure
- Schedules next job when slot available

```javascript
class WorkerPool {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.active = new Set();
  }

  async run(job) {
    this.active.add(job);
    try {
      await job.execute();
    } finally {
      this.active.delete(job);
    }
  }
}
```

## Data Flow

### Job Lifecycle

```
┌──────────┐
│   Add    │ Job created with options
└─────┬────┘
      │
      ▼
┌──────────┐
│  Queue   │ Job added to priority queue
└─────┬────┘
      │
      ▼
┌──────────┐
│  Start   │ Worker picks up job
└─────┬────┘
      │
      ▼
┌──────────┐
│ Execute  │ Job function runs
└─────┬────┘
      │
      ▼
┌─────────┐
│ Success?│
└────┬────┘
     │
     ├─Yes──► ┌──────────┐
     │        │ Complete │ Mark job complete
     │        └──────────┘
     │
     └─No───► ┌──────────┐
              │  Retry?  │ Check retry count
              └────┬─────┘
                   │
                   ├─Yes──► ┌──────────┐
                   │        │  Retry   │ Schedule retry
                   │        └──────────┘
                   │
                   └─No───► ┌──────────┐
                            │  Failed  │ Mark job failed
                            └──────────┘
```

### Event Flow

```
Job Added    → emit('job:added')
Job Started  → emit('job:started')
Job Progress → emit('job:progress')
Job Complete → emit('job:complete')
Job Retry    → emit('job:retry')
Job Failed   → emit('job:failed')
```

## Data Architecture

### Job State

Jobs transition through the following states:

```javascript
enum JobState {
  PENDING = 'pending',     // In queue, waiting to execute
  ACTIVE = 'active',       // Currently executing
  COMPLETED = 'completed', // Completed successfully
  FAILED = 'failed'        // Failed after all retries
}
```

### In-Memory Storage

All jobs are stored in memory:

```javascript
class TaskQueue {
  constructor() {
    this.queues = {
      [JobPriority.HIGH]: [],
      [JobPriority.NORMAL]: [],
      [JobPriority.LOW]: []
    };
    this.jobs = new Map(); // id -> Job
    this.activeJobs = new Set();
  }
}
```

**Trade-offs:**
- **Pros:** Fast access, simple implementation
- **Cons:** Jobs lost if process crashes, limited by memory

### Data Models

#### Job Object

```javascript
{
  id: string;           // Unique identifier
  task: TaskFunction;   // Function to execute
  options: JobOptions;  // Configuration
  state: JobState;      // Current state
  attempts: number;     // Execution attempts
  maxRetries: number;   // Maximum retry attempts
  result: any;          // Job result (if completed)
  error: Error;         // Error (if failed)
  createdAt: number;    // Creation timestamp
  startedAt?: number;   // Start timestamp
  completedAt?: number; // Completion timestamp
}
```

## Security Architecture

### Security Considerations

TaskQueue is designed for single-process, trusted environments. Security considerations:

1. **Code Execution** - Jobs execute arbitrary code
   - Only queue trusted code
   - Validate job functions in production

2. **Resource Limits** - No built-in resource limits
   - Use timeout option to prevent runaway jobs
   - Monitor memory usage
   - Limit queue size

3. **Isolation** - Jobs run in same process
   - Malicious jobs can affect the queue
   - Not suitable for untrusted code execution

### Best Practices

- Always set timeout for jobs
- Limit queue size
- Monitor resource usage
- Only queue trusted code

## Scalability & Performance

### Performance Characteristics

| Metric | Value | Notes |
|--------|-------|-------|
| Job Scheduling | < 1ms | In-memory operation |
| Throughput | ~1000 jobs/sec | Depends on job complexity |
| Memory Usage | ~100 bytes/job | For queued jobs |
| Concurrent Jobs | Configurable | Default: 2 |

### Scalability Limitations

**Single Process:**
- Limited to single Node.js process
- Maximum concurrency limited by CPU/memory
- No clustering support

**In-Memory Storage:**
- Jobs lost if process crashes
- Limited by available memory
- No persistence

**Scaling Strategies:**

For higher scale, consider:
1. **Multiple Queues** - Separate queues for different job types
2. **Job Partitioning** - Distribute jobs across multiple queue instances
3. **External Queue** - Use Redis/RabbitMQ for persistence
4. **Worker Processes** - Separate worker processes with IPC

### Performance Optimizations

#### Efficient Event Emission

```javascript
// Only emit if there are listeners
if (this.listenerCount('job:progress') > 0) {
  this.emit('job:progress', job, percent);
}
```

#### Lazy Job Creation

```javascript
// Create job objects only when needed
add(task, options) {
  const job = new Job(task, options);
  this.queues[priority].push(job);
  return job;
}
```

#### Concurrent Execution

```javascript
// Process jobs in parallel up to concurrency limit
async processQueue() {
  while (this.running) {
    if (this.activeJobs.size < this.concurrency) {
      const job = this.getNextJob();
      if (job) {
        this.executeJob(job);
      }
    }
    await sleep(10); // Prevent busy loop
  }
}
```

## Technology Stack

### Core Technologies

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Runtime** | Node.js 16+ | JavaScript runtime |
| **Language** | JavaScript | Primary language |
| **Events** | EventEmitter | Event system |
| **Testing** | Jest | Test framework |
| **Linting** | ESLint | Code linting |
| **Formatting** | Prettier | Code formatting |

### Dependencies

**Production:**
- None (pure JavaScript, Node.js built-ins only)

**Development:**
- `jest` - Testing framework
- `eslint` - Linting
- `prettier` - Formatting

## Design Decisions

### Decision 1: In-Memory Queue

**Context:** Need for fast job processing with minimal overhead

**Decision:** Use in-memory queue instead of external storage

**Consequences:**
- **Positive:** Fast performance, simple implementation, no external dependencies
- **Negative:** Jobs lost on crash, limited by memory, no persistence
- **Mitigation:** Document limitations, recommend Redis-backed queues for production

**Alternatives Considered:**
- Redis Queue - More reliable, but adds dependency
- Database-backed - Too slow for high throughput
- File-based - Complex implementation, still slower

### Decision 2: Event-Driven Architecture

**Context:** Need for observability and extensibility

**Decision:** Use EventEmitter for job lifecycle events

**Consequences:**
- **Positive:** Easy to monitor, extensible, familiar Node.js pattern
- **Negative:** Event overhead if many listeners
- **Mitigation:** Only emit if listeners present

**Alternatives Considered:**
- Callbacks - Too complex for multiple hooks
- Promises - Don't support multiple observers
- Webhooks - Too complex for in-process

### Decision 3: Exponential Backoff

**Context:** Need for retry logic that adapts to load

**Decision:** Use exponential backoff for retries

**Consequences:**
- **Positive:** Reduces load during failures, adaptive
- **Negative:** Delays job completion, unpredictable timing
- **Mitigation:** Document retry behavior, make configurable

**Alternatives Considered:**
- Fixed delay - Simple but can overwhelm system
- Linear backoff - Better than fixed, but less adaptive
- No retries - Unreliable for transient failures

## Future Considerations

### Planned Improvements

- **Job Persistence** - Optional Redis persistence
- **Job Scheduling** - Scheduled/delayed job execution
- **Job Dependencies** - Support for dependent jobs
- **Batch Operations** - Add/process jobs in batch
- **Better Metrics** - Built-in performance metrics

### Technical Debt

- **Memory Leaks** - Need better cleanup of old jobs
- **Error Handling** - Improve error messages and recovery
- **Testing** - Increase test coverage to 95%+
- **Documentation** - Add more examples and use cases

## Related Documentation

- [API Documentation](api.md)
- [Development Guide](development.md)
- [README](../README.md)

---

**Document Version:** 1.0
**Last Updated:** 2024-03-23
**Maintained by:** TaskQueue Team
