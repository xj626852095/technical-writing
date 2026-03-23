/**
 * TaskQueue Demo
 *
 * This demo shows how to use the TaskQueue library
 * for background job processing with retries and priorities.
 */

const { TaskQueue, JobPriority } = require('./index');

// Create a queue with concurrency of 2
const queue = new TaskQueue({
  concurrency: 2,
  retries: 2,
  retryDelay: 1000,
});

// Set up event listeners
queue.on('job:added', (job) => {
  console.log(`✓ Job ${job.id} added to queue`);
});

queue.on('job:started', (job) => {
  console.log(`▶ Job ${job.id} started`);
});

queue.on('job:progress', (job, percent) => {
  console.log(`◉ Job ${job.id} progress: ${percent}%`);
});

queue.on('job:complete', (job, result) => {
  console.log(`✓ Job ${job.id} completed with result:`, result);
});

queue.on('job:failed', (job, error) => {
  console.error(`✗ Job ${job.id} failed:`, error.message);
});

queue.on('job:retry', (job, attempt) => {
  console.log(`↻ Retrying job ${job.id}, attempt ${attempt}`);
});

// Helper function to simulate async work
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Example 1: Simple job
console.log('\n--- Example 1: Simple Job ---');
queue.add(async () => {
  await delay(500);
  return 'Simple job completed';
}, { id: 'job-1' });

// Example 2: Job with progress
console.log('\n--- Example 2: Job with Progress ---');
queue.add(async (progress) => {
  const steps = 10;
  for (let i = 0; i < steps; i++) {
    await delay(200);
    progress(Math.round(((i + 1) / steps) * 100));
  }
  return 'Progress job completed';
}, { id: 'job-2' });

// Example 3: High priority job
console.log('\n--- Example 3: High Priority Job ---');
queue.add(async () => {
  await delay(300);
  return 'Urgent job completed';
}, { id: 'urgent-job', priority: JobPriority.HIGH });

// Example 4: Job that fails (with retry)
console.log('\n--- Example 4: Failing Job (with retry) ---');
let attempts = 0;
queue.add(async () => {
  attempts++;
  await delay(100);
  if (attempts < 3) {
    throw new Error('Simulated failure');
  }
  return 'Finally succeeded!';
}, { id: 'failing-job' });

// Example 5: Low priority job
console.log('\n--- Example 5: Low Priority Job ---');
queue.add(async () => {
  await delay(400);
  return 'Background job completed';
}, { id: 'background-job', priority: JobPriority.LOW });

// Start the queue
console.log('\n--- Starting Queue ---\n');
queue.start();

// Monitor queue stats
setInterval(() => {
  const stats = queue.getStats();
  console.log(`\nStats: Pending=${stats.pending}, Active=${stats.active}, Completed=${stats.completed}, Failed=${stats.failed}`);
}, 2000);

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n\n--- Shutting Down ---');
  await queue.stop();
  console.log('Queue stopped gracefully');
  process.exit(0);
});

// Keep running
process.on('SIGTERM', async () => {
  console.log('\n\n--- Shutting Down ---');
  await queue.stop();
  console.log('Queue stopped gracefully');
  process.exit(0);
});
