// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const https = require("https");

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Queue to store tasks
const taskQueue = [];
const processingTasks = new Map();

// Function to process tasks
const processTasks = () => {
  const now = Date.now();

  for (const task of taskQueue) {
    if (!processingTasks.has(task.id)) {
      processingTasks.set(task.id, task);
    }

    const taskData = processingTasks.get(task.id);

    if (now >= taskData.nextRun) {
      const remainingTime = taskData.totalDuration - (taskData.elapsedTime + 10);
      
      if (remainingTime > 0) {
        console.log(`Task ${taskData.id} is running...`);
        taskData.elapsedTime += 10;
        taskData.nextRun = now + 10 * 60 * 1000;
        sendStatus(taskData.user, "Running");
      } else {
        console.log(`Task ${taskData.id} is completed.`);
        sendStatus(taskData.user, "Task Completed");
        processingTasks.delete(task.id);
        taskQueue.splice(taskQueue.indexOf(task), 1);
      }
    }
  }
};

// Function to send status to users
const sendStatus = (user, status) => {
  console.log(`Sending status to user ${user}: ${status}`);
};

// POST API endpoint
app.post("/api/task", (req, res) => {
  const { totalDuration, user } = req.body;

  if (!totalDuration || typeof totalDuration !== "number" || totalDuration <= 0) {
    return res.status(400).json({ error: "Invalid totalDuration specified." });
  }

  const task = {
    id: uuidv4(),
    user: user || `Anonymous_${uuidv4().slice(0, 8)}`,
    totalDuration,
    elapsedTime: 0,
    nextRun: Date.now(),
  };

  taskQueue.push(task);
  console.log(`Task added to queue:`, task);
  res.status(202).json({ message: "Task added to queue.", taskId: task.id });
});

// GET route to verify HTTPS connection
app.get("/api/verify", (req, res) => {
  const url = "https://example.com"; // Replace with the target URL

  const agent = new https.Agent({
    rejectUnauthorized: false, // WARNING: Avoid in production
  });

  https.get(url, { agent }, (response) => {
    res.status(response.statusCode).json({
      message: "HTTPS connection successful",
      statusCode: response.statusCode,
    });
  }).on("error", (error) => {
    console.error("Error during HTTPS request:", error);
    res.status(500).json({
      message: "HTTPS connection failed",
      error: error.message,
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  setInterval(processTasks, 10 * 60 * 1000); // Process tasks every 10 minutes
});
