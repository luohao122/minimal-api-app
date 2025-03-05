# Minimal API App

A minimal Express.js API with TypeScript, JWT authentication, and structured project architecture.

## 📁 Project Structure
```
src/
|-- controllers/      # Handles request logic
|-- middlewares/      # Middleware for authentication, logging, etc.
|-- routes/           # API route definitions
|-- services/         # Business logic (database interactions, hashing, etc.)
|-- types/            # TypeScript type definitions
|-- utils/            # Helper functions and utilities
|-- app.ts            # Main application setup
|-- routes.ts         # Register all routes
|-- server.ts         # Starts the Express server
```

## 🚀 Getting Started

### Prerequisites
Make sure you have **Node.js** and **npm/yarn** installed.

### Installation
Clone the repository and install dependencies:
```sh
git clone https://github.com/luohao122/minimal-api-app.git
cd minimal-api-app
npm install
```

### Environment Variables
Create a `.env` file in the root directory and add:
```env
JWT_SECRET_TOKEN_KEY=your_secret_key_here
PORT=3000
```

### Running the App
#### Development Mode
```sh
npm run dev
```
#### Production Mode
```sh
npm run build
npm start
```

## 🔥 Features
- **User Authentication** (Signup, Login, JWT)
- **Middleware for Protected Routes**
- **Bcrypt Password Hashing**
- **Organized Project Structure**
- **TypeScript for Strong Typing**

## 📌 API Endpoints

### **Auth Routes**
| Method | Endpoint        | Description |
|--------|----------------|-------------|
| POST   | `/signup`      | Register a new user |
| POST   | `/login`       | Authenticate user and return JWT |

### **Protected Routes**
| Method | Endpoint        | Description |
|--------|----------------|-------------|
| GET    | `/dashboard`   | Returns dashboard data (JWT required) |

## 🛠 Built With
- **Express.js** - Web framework for Node.js
- **TypeScript** - Typed JavaScript
- **JWT** - JSON Web Token for authentication
- **Bcrypt** - Secure password hashing

## 📜 License
This project is licensed under the **ISC License**.

## 📝 Author
[Hao Luong](https://github.com/luohao122)