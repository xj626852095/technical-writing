# TaskQueue API Documentation

> Complete API reference for the TaskQueue library

## Overview

TaskQueue provides a simple API for managing asynchronous task processing with support for retries, priorities, and event-based monitoring.

## Table of Contents

1. [TaskQueue Class](#taskqueue-class)
2. [Job Options](#job-options)
3. [Events](#events)
4. [Job Priority](#job-priority)
5. [Examples](#examples)

## TaskQueue Class

### Constructor

```javascript
new TaskQueue(options?: QueueOptions)
```

Creates a new TaskQueue instance.

**Parameters:**

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `concurrency` | number | 2 | Number of jobs to process concurrently |
| `retries` | number | 0 | Number of times to retry failed jobs |
| `retryDelay` | number | 1000 | Initial delay before retry (milliseconds) |
| `timeout` | number | 30000 | Maximum job execution time (milliseconds) |

**Example:**

```javascript
const queue = new TaskQueue({
  concurrency: 5,
  retries: 3,
  retryDelay: 2000,
  timeout: 60000
});
```

### Methods

#### `add(task, options?)`

Adds a new job to the queue.

```javascript
add(task: TaskFunction, options?: JobOptions): Job
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `task` | TaskFunction | Yes | Async function to execute |
| `options` | JobOptions | No | Job configuration options |

**Returns:** `Job` - The created job object

**Example:**

```javascript
const job = queue.add(async () => {
  await processImage();
}, {
  id: 'process-image-1',
  priority: JobPriority.HIGH
});
```

#### `start()`

Starts processing jobs from the queue.

```javascript
start(): void
```

**Example:**

```javascript
queue.start();
```

#### `stop()`

Stops processing jobs and waits for active jobs to complete.

```javascript
async stop(): Promise<void>
```

**Example:**

```javascript
await queue.stop();
console.log('Queue stopped');
```

#### `pause()`

Pauses job processing without stopping active jobs.

```javascript
pause(): void
```

**Example:**

```javascript
queue.pause();
```

#### `resume()`

Resumes job processing after pause.

```javascript
resume(): void
```

**Example:**

```javascript
queue.resume();
```

#### `clear()`

Removes all pending jobs from the queue.

```javascript
clear(): void
```

**Example:**

```javascript
queue.clear();
console.log('Queue cleared');
```

#### `getStats()`

Returns queue statistics.

```javascript
getStats(): QueueStats
```

**Returns:** `QueueStats` object

```javascript
{
  pending: number,    // Number of pending jobs
  active: number,     // Number of active jobs
  completed: number,  // Number of completed jobs
  failed: number      // Number of failed jobs
}
```

**Example:**

```javascript
const stats = queue.getStats();
console.log(`Pending: ${stats.pending}, Active: ${stats.active}`);
```

### Properties

#### `running`

Returns whether the queue is currently running.

```javascript
const isRunning = queue.running; // boolean
```

#### `paused`

Returns whether the queue is currently paused.

```javascript
const isPaused = queue.paused; // boolean
```

## Job Options

Configuration options for individual jobs.

```javascript
interface JobOptions {
  id?: string;           // Unique job identifier
  priority?: JobPriority; // Job priority
  retries?: number;      // Override queue retry count
  timeout?: number;      // Override queue timeout
}
```

### Option Details

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `id` | string | Auto-generated | Unique identifier for the job |
| `priority` | JobPriority | `JobPriority.NORMAL` | Job execution priority |
| `retries` | number | Queue default | Number of retries for this job |
| `timeout` | number | Queue default | Maximum execution time (ms) |

## Task Function

The function to be executed by a job.

```javascript
type TaskFunction = (progress?: ProgressCallback) => Promise<any>
```

### Progress Callback

Optional callback for reporting job progress.

```javascript
type ProgressCallback = (percent: number) => void
```

**Example:**

```javascript
queue.add(async (progress) => {
  const total = 100;
  for (let i = 0; i < total; i++) {
    await doWork();
    progress(Math.round((i / total) * 100));
  }
}, { id: 'my-job' });
```

## Events

TaskQueue extends EventEmitter and emits the following events:

### `job:added`

Emitted when a job is added to the queue.

```javascript
queue.on('job:added', (job: Job) => {
  console.log(`Job ${job.id} added to queue`);
});
```

### `job:started`

Emitted when a job starts processing.

```javascript
queue.on('job:started', (job: Job) => {
  console.log(`Job ${job.id} started`);
});
```

### `job:progress`

Emitted when a job reports progress.

```javascript
queue.on('job:progress', (job: Job, percent: number) => {
  console.log(`Job ${job.id} is ${percent}% complete`);
});
```

### `job:complete`

Emitted when a job completes successfully.

```javascript
queue.on('job:complete', (job: Job, result: any) => {
  console.log(`Job ${job.id} completed with result:`, result);
});
```

### `job:failed`

Emitted when a job fails (after all retries).

```javascript
queue.on('job:failed', (job: Job, error: Error) => {
  console.error(`Job ${job.id} failed:`, error.message);
});
```

### `job:retry`

Emitted when a job is being retried.

```javascript
queue.on('job:retry', (job: Job, attempt: number) => {
  console.log(`Retrying job ${job.id}, attempt ${attempt}`);
});
```

## Job Priority

Jobs can be assigned priorities to control execution order.

```javascript
enum JobPriority {
  LOW = 0,
  NORMAL = 1,
  HIGH = 2
}
```

### Priority Execution

Jobs are executed in priority order:
1. All HIGH priority jobs first
2. All NORMAL priority jobs
3. All LOW priority jobs

Within each priority level, jobs are executed in FIFO order.

**Example:**

```javascript
const { JobPriority } = require('./src/index');

// High priority job
queue.add(async () => {
  await sendUrgentNotification();
}, { priority: JobPriority.HIGH });

// Low priority job
queue.add(async () => {
  await generateWeeklyReport();
}, { priority: JobPriority.LOW });
```

## Examples

### Email Processing Queue

```javascript
const { TaskQueue, JobPriority } = require('./src/index');

const emailQueue = new TaskQueue({
  concurrency: 3,
  retries: 2,
  timeout: 30000
});

emailQueue.on('job:complete', (job) => {
  console.log(`Email sent: ${job.id}`);
});

emailQueue.on('job:failed', (job, error) => {
  console.error(`Failed to send email: ${error.message}`);
});

// Add emails to queue
emailQueue.add(async () => {
  await sendEmail('user@example.com', 'Welcome!');
}, { id: 'email-1', priority: JobPriority.HIGH });

emailQueue.start();
```

### Image Processing Pipeline

```javascript
const { TaskQueue } = require('./src/index');

const imageQueue = new TaskQueue({ concurrency: 2 });

imageQueue.add(async (progress) => {
  const steps = [
    { name: 'download', weight: 10 },
    { name: 'resize', weight: 60 },
    { name: 'optimize', weight: 20 },
    { name: 'upload', weight: 10 }
  ];

  let completed = 0;
  for (const step of steps) {
    await processStep(step.name);
    completed += step.weight;
    progress(completed);
  }
}, { id: 'process-image-123' });

imageQueue.on('job:progress', (job, percent) => {
  console.log(`Image processing: ${percent}%`);
});

imageQueue.start();
```

### Batch Processing with Error Handling

```javascript
const { TaskQueue } = require('./src/index');

const batchQueue = new TaskQueue({
  concurrency: 5,
  retries: 3
});

let completed = 0;
let failed = 0;

batchQueue.on('job:complete', () => {
  completed++;
  console.log(`Completed: ${completed}`);
});

batchQueue.on('job:failed', (job, error) => {
  failed++;
  console.error(`Failed: ${job.id} - ${error.message}`);
});

// Add batch of jobs
const items = await fetchItems();
items.forEach(item => {
  batchQueue.add(async () => {
    await processItem(item);
  }, { id: `item-${item.id}` });
});

batchQueue.start();

// Wait for all jobs to complete
batchQueue.on('empty', () => {
  console.log(`Batch complete: ${completed} succeeded, ${failed} failed`);
});
```

## Error Handling

### Retry Logic

Jobs that throw errors are automatically retried based on the retry configuration:

```javascript
const queue = new TaskQueue({
  retries: 3,
  retryDelay: 1000
});

// Retries with exponential backoff: 1s, 2s, 4s
queue.add(async () => {
  await flakyOperation();
});
```

### Timeout Handling

Jobs that exceed the timeout are terminated:

```javascript
const queue = new TaskQueue({ timeout: 5000 });

queue.add(async () => {
  // Will be terminated after 5 seconds
  await longRunningOperation();
});
```

### Graceful Error Handling

Always handle errors in your task functions:

```javascript
queue.add(async () => {
  try {
    await riskyOperation();
  } catch (error) {
    // Handle error or let it propagate for retry
    throw error;
  }
});
```

---

**API Version:** 1.0.0
**Last Updated:** 2026-03-23
