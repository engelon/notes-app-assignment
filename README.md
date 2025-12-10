# notes-app-assignment
Coding assignment for StealthCompany

A full-stack Notes application built as a technical assignment. Includes a secure Node.js/Express backend with JWT authentication and a React (Vite) frontend for creating, editing, and managing personal notes. Features user signup/login, protected routes, SQLite data storage, password hashing, and a clean, minimal UI with loading and error states.

Technologies: Node.js, Express, SQLite, JWT, bcrypt, React, Vite, React Router, Axios, Vitest
Features: Authentication, protected notes CRUD, client-side JWT storage, API error handling, unit tests
Frontend: React + Vite UI with AuthContext
Backend: REST API with hashed passwords & token validation

### Backend Overview
The backend exposes a simple REST API:
Authentication Endpoints
POST /auth/signup
POST /auth/login
Password hashing uses bcrypt, and JWT tokens are created on login or signup. JWT is required for all notes routes.
Notes Endpoints (Protected)
POST /notes
GET /notes
PUT /notes/:id
DELETE /notes/:id
Token must be included via:
Authorization: Bearer TOKEN_HERE
A SQLite database file (notes.db) is created automatically.

### Backend Setup
Navigate into the backend folder:

cd backend
npm install

### Create a .env file:
PORT=4000
JWT_SECRET=your_secret_here
DATABASE_FILE=./notes.db
Run the server in development:
npm run dev

Server will start at:
http://localhost:4000

### Frontend Overview
The frontend provides three main pages:
/signup – create an account
/login – authenticate user
/ – view, create, edit, delete notes (only accessible when logged in)
Authentication is handled via a custom React Context that stores:
user
JWT token
login/logout methods
The token is saved in localStorage and automatically sent to the backend on every notes request.
Axios handles API communication, and React Router manages navigation.

### Frontend Setup
Navigate into the frontend folder:
cd frontend
npm install
Start the development server:
npm run dev
Frontend will run at:
http://localhost:5173

## You must have the backend running simultaneously for full functionality.


### Testing
A basic test is included in the frontend using Vitest and React Testing Library. It verifies that the NotesList component renders correctly.
Run tests from inside the frontend folder:
npm test
Application Flow
Start backend (npm run dev)
Start frontend (npm run dev)
Open the browser at http://localhost:5173
Sign up with an email and password
App logs you in automatically and redirects to your notes
Create notes
Edit and delete notes as needed
Logout to clear session
All notes are scoped to the logged-in user only.