# Task Management Application

This is a full-stack MERN (MongoDB, Express, React, Node.js) application featuring user authentication, product management, and a modern frontend built with Vite and TailwindCSS.

## Project Structure

- **task-server**: The backend API server.
- **task-frontend**: The frontend client application.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (Local installation or MongoDB Atlas URI)

## Setup Instructions

### 1. Backend Setup (task-server)

1. Navigate to the server directory:
   ```bash
   cd task-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the `task-server` directory with the following variables:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Seed the Database (Optional):
   Populate the database with initial data (users):
   ```bash
   npm run data:import
   ```
   To destroy data:
   ```bash
   npm run data:destroy
   ```

5. Start the Server:
   - For development (with nodemon):
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm start
     ```
   The server will run on `http://localhost:5000` (or your specified PORT).

### 2. Frontend Setup (task-frontend)

1. Navigate to the frontend directory:
   ```bash
   cd task-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   (Optional) Create a `.env` file in the `task-frontend` directory. If skipped, it defaults to `http://localhost:5000/api`.
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. Run the Development Server:
   ```bash
   npm run dev
   ```
   The application will be accessible at the URL provided by Vite (e.g., `http://localhost:5173`).

## Dependencies

### Server
- express
- mongoose
- jsonwebtoken (JWT)
- bcryptjs
- cors
- dotenv
- helmet
- morgan

### Client
- react
- vite
- tailwindcss
- axios
- react-router-dom
- react-toastify
- lucide-react

## License

ISC
