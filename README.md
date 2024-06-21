# Data Pusher Application

Data Pusher is a web application that allows users to manage accounts and destinations, and to send data to these destinations using webhook URLs. The application consists of a frontend built with React and a backend built with Express and SQLite.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)


## Features

- Create and manage accounts
- Create and manage destinations for each account
- Send data to destinations and view responses
- API documentation with Swagger

## Technologies Used

- Frontend: React, Axios
- Backend: Node.js, Express, SQLite
- API Documentation: Swagger

## Project Structure
```bash
data-pusher/
├── backend/
│ ├── node_modules/
│ ├── routes/
│ │ ├── account.js
│ │ ├── destination.js
│ │ └── dataHandler.js
│ ├── models/
│ │ ├── account.js
│ │ └── destination.js
│ ├── database.js
│ ├── app.js
│ ├── initializeDatabase.js
│ ├── swagger.js
│ ├── package.json
│ └── package-lock.json
├── frontend/
│ ├── public/
│ │ └── index.html
│ ├── src/
│ │ ├── components/
│ │ │ ├── AccountForm.js
│ │ │ ├── AccountList.js
│ │ │ ├── DestinationForm.js
│ │ │ ├── DestinationList.js
│ │ │ └── DataHandlerForm.js
│ │ ├── App.js
│ │ ├── index.js
│ │ └── api.js
│ ├── node_modules/
│ ├── package.json
│ ├── package-lock.json
│ └── README.md
├── dataPusher.db
└── README.md
```


## Installation

### Backend

1. **Navigate to the backend directory:**

   ```bash
   cd backend

Install backend dependencies: 
```bash
npm install
node initializeDatabase.js
```
###Frontend
Navigate to the frontend directory:
```bash
cd ../frontend
```
###Install frontend dependencies:

```bash
npm install --f
```
###Running the Application
To run both the frontend and backend servers concurrently:

1. Navigate to the frontend directory (if not already there):

```bash
cd frontend
```

2. Start the application:
```bash
npm start
```
This command will start both the React development server and the Express backend server concurrently. The React app will be available at http://localhost:4000, and the backend server will run on http://localhost:3000.

Alternative: Running Frontend and Backend Separately
If you prefer to run the frontend and backend servers separately, follow these steps:

Run the backend server:

Open a terminal and navigate to the backend directory:
```bash
cd backend
```
Start the backend server:
```bash
node app.js
```
Run the frontend server:

###Open another terminal and navigate to the frontend directory:
```bash
cd frontend
```
###Start the frontend server:
```bash
npm start
```
API Documentation
The API documentation is generated using Swagger. To view the API documentation:

Ensure the backend server is running.
Open your browser and navigate to http://localhost:3000/api-docs.
This will display the Swagger UI, where you can interact with the API endpoints and view detailed documentation.



This `README.md` file provides a comprehensive overview of the project, including features, technologies used, project structure, installation instructions, how to run the application, and how to access the API documentation.

 
