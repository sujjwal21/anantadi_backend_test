# API Gateway with Queued Calls

This project implements an API Gateway with a queuing mechanism, where user requests are queued and processed at 10-minute intervals. It provides real-time status updates for each task and completes them based on the user's specified duration.

---

## Features

- **Task Queuing**: Each API request is added to an in-memory queue.
- **Interval-Based Processing**: Tasks are processed at 10-minute intervals.
- **Real-Time Status Updates**: The system sends "Running" status updates until the task is completed, after which it sends "Task Completed".
- **Custom Duration Support**: Users can specify a custom duration (e.g., 30 minutes) for tasks.

---

## Requirements

- **Node.js** (v16 or later)
- **npm** (v7 or later)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/api-gateway.git
   cd api-gateway
Install dependencies:

bash
Copy
Edit
npm install
Start the server:

bash
Copy
Edit
node server.js
The server will start at http://localhost:3000.

API Endpoints
POST /start-task
Description: Adds a new task to the queue and starts processing it.

Request Body
json
Copy
Edit
{
  "totalDuration": 30,
  "otherData": "Optional additional data"
}
totalDuration (required): The total time in minutes for the task to run. Must be a multiple of 10.
otherData (optional): Any additional information related to the task.
Response
json
Copy
Edit
{
  "message": "Task started",
  "task": {
    "totalDuration": 30,
    "otherData": "Optional additional data",
    "status": "Queued",
    "startTime": 1674302045000,
    "intervals": 3
  }
}
How It Works
A user sends a request to the /start-task endpoint with the desired totalDuration and optional otherData.
The task is added to an in-memory queue and starts processing in intervals of 10 minutes.
After each interval:
The status is logged as "Running."
When the total duration is reached, the final status is updated to "Task Completed."
Example Workflow
Request
bash
Copy
Edit
POST http://localhost:3000/start-task
Content-Type: application/json
Body:

json
Copy
Edit
{
  "totalDuration": 30,
  "otherData": "Sample data"
}
Logs (Sample)
arduino
Copy
Edit
Task started for a duration of 30 minutes.
After 10 minutes: Task is running.
After 20 minutes: Task is running.
After 30 minutes: Task completed.
Project Structure
bash
Copy
Edit
api-gateway/
├── server.js        # Main server file
├── package.json     # Project metadata and dependencies
└── README.md        # Project documentation
Future Improvements
Persistent Queue: Integrate a database or external queue like RabbitMQ or BullMQ for better scalability.
Error Handling: Improve error handling for edge cases and invalid input.
Task Monitoring: Add an endpoint to retrieve the status of specific tasks.
Scalability: Implement clustering or worker threads for concurrent task execution.
License
This project is licensed under the MIT License. See the LICENSE file for details.

vbnet
Copy
Edit

Let me know if you'd like to add or adjust any section!













