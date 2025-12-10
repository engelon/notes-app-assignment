# Notes App – Frontend (React + Vite)

This is the frontend for the Notes Application.  
It provides a simple UI for user signup, login, and notes management.  
The app communicates with the backend API using JWT authentication.

- **Framework:** React (with Vite)
- **Routing:** React Router
- **State Management:** React Context (AuthContext)
- **HTTP Client:** Axios
- **Testing:** Vitest + React Testing Library
- **Build Tool:** Vite

---

## 📦 Requirements

- Node.js 18+ (recommended: Node 20 via NVM)
- Backend server running (default: `http://localhost:4000`)

---

## 🚀 Getting Started

### 1. Install dependencies

cd frontend
npm install


### 2. Start the Development Server

npm run dev

Vite will start at: http://localhost:5173



## API INTEGRATION 
The frontend communicates with: http://localhost:4000

### EndPoints used:
POST /auth/signup
POST /auth/login
GET /notes
POST /notes
PUT /notes/:id
DELETE /notes/:id
JWT is stored in localStorage and automatically added to requests via Axios.

## Testing
The project includes basic unit tests for React components using Vitest. Tests verify that UI components render correctly and handle simple states. To run all tests:

npm test

