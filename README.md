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
