# Notes App – Backend API

This is the backend service for the Notes Application.  
It provides user authentication (JWT) and CRUD operations for personal notes.

- Tech Stack: Node.js, Express, SQLite, JWT, bcrypt  
- Auth: JWT-based authentication  
- Database: SQLite (file-based, auto-created)

---

## 📦 Requirements

- Node.js 18+
- npm (comes with Node)
- No external database installation required — SQLite creates `notes.db` automatically.

---

## 1. GETTING STARTED
Install dependencies
Run inside the backend folder:
npm install

## 2. Create a .env file
Inside backend/.env, add:
PORT=4000
JWT_SECRET=your_secret_here
DATABASE_FILE=./notes.db

## 3. Start the server
Development (auto reload):
npm run dev
Production:
npm start
Expected output:
Server listening on http://localhost:4000

--- 

# API DOCUMENTATION

## AUTHENTICATION ENDPOINTS 

POST /auth/signup
Creates a new user.

Request body example:
{
"email": "test@example.com",
"password": "secret123"
}
Response example:
{
"user": { "id": 1, "email": "test@example.com" },
"token": "JWT_TOKEN_HERE"
}


POST /auth/login
Authenticates a user and returns a JWT.

Request body:
{
"email": "test@example.com",
"password": "secret123"
}
Response:
{
"user": { "id": 1, "email": "test@example.com" },
"token": "JWT_TOKEN_HERE"
}

----

## NOTES ENDPOINTS (PROTECTED) 
You must include the Authorization header:
Authorization: Bearer <JWT_TOKEN>

POST /notes
Creates a new note.
Body:
{
"title": "My Note",
"content": "Hello world"
}


GET /notes
Returns all notes belonging to the logged-in user.

PUT /notes/:id
Updates a note.
Body:
{
"title": "Updated title",
"content": "Updated content"
}

DELETE /notes/:id
Deletes a note owned by the user.
Returns: 204 No Content

-----

# DATABASE INFORMATION

SQLite automatically creates:
./notes.db

Tables:
users (email, password_hash, timestamps)
notes (user_id, title, content, timestamps)
No migrations needed — tables are created on server startup.


----- 

# FOLDER STRUCTURE
backend/
src/
controllers/
middleware/
models/
routes/
db.js
index.js
.env
package.json
notes.db (created automatically)


------

# TESTING (MANUAL)
You can test using:
Curl
Postman
VSCode Thunder Client

