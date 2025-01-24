const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let taskQueue = []; // In-memory task queue

// API endpoint to receive requests
app.post('/start-task', (req, res) => {
  const { totalDuration, otherData } = req.body;
  
  // Validate input
  if (!totalDuration || isNaN(totalDuration)) {
    return res.status(400).json({ message: 'Invalid total duration.' });
  }

  const task = {
    totalDuration,
    otherData,
    status: 'Queued',
    startTime: Date.now(),
    intervals: Math.floor(totalDuration / 10),
  };

  taskQueue.push(task);
  
  // Start processing the task in intervals of 10 minutes
  processTask(task);

  // Respond immediately with the task details
  return res.status(200).json({ message: 'Task started', task });
});

// Function to process queued tasks
function processTask(task) {
  const interval = setInterval(() => {
    const elapsedTime = (Date.now() - task.startTime) / 1000 / 60; // in minutes
    if (elapsedTime < task.totalDuration) {
      task.status = 'Running';
      console.log(`Task is running for ${elapsedTime} minutes.`);
      // Send a status response every 10 minutes
      console.log(`Task status: ${task.status}`);
    } else {
      task.status = 'Task Completed';
      console.log(`Task completed after ${elapsedTime} minutes.`);
      clearInterval(interval); // Stop the task after completion
    }
  }, 1 * 60 * 1000); // 10-minute interval
}

// Start the server
app.listen(port, () => {
  console.log(`API Gateway is running on http://localhost:${port}`);
});
