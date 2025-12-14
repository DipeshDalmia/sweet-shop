# 🍭 Sweet Shop - E-Commerce Application

Live Deployment:https://sweet-shop-green.vercel.app/

A full-stack e-commerce application for managing and purchasing sweets, built with React and Node.js. Features user authentication, role-based access control, inventory management, and a modern responsive UI.
<img width="1896" height="903" alt="image" src="https://github.com/user-attachments/assets/ee79ec78-059e-4f15-b67b-70859c602804" />
<img width="1888" height="893" alt="image" src="https://github.com/user-attachments/assets/a3dc1ce2-7aa5-4353-bf6c-7e04ac9a25f3" />



## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [My AI Usage](#my-ai-usage)

## ✨ Features

### User Features
- User registration and login with JWT authentication
- Browse all available sweets
- Search and filter sweets by name, category, and price range
- Purchase sweets (automatically decreases stock)
- View sweet details (name, category, price, stock)

### Admin Features
- All user features
- Add new sweets to inventory
- Update existing sweet details
- Delete sweets from inventory
- Restock sweets (increase quantity)
- Access to dedicated admin panel

## 🛠 Tech Stack

### Backend
- **Node.js** with **Express.js**
- **MongoDB Atlas** (cloud database)
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Jest** and **Supertest** for testing

### Frontend
- **React 19** with **Vite**
- **React Router DOM** for routing
- **Axios** for API calls
- **Tailwind CSS** for styling
- **React Context API** for state management

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB Atlas account (free tier works)

## 🚀 Setup Instructions

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up MongoDB Atlas:**
   - Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a cluster
   - Create database user (Database Access → Add New Database User)
   - Whitelist your IP (Network Access → Add IP Address)
   - Get connection string (Connect → Connect your application)

4. **Create `.env` file in backend directory:**
   ```env
   MONGODB_URI=your_mongo_db URL
   PORT=Your port N0.
   JWT_SECRET=test_secret_key
   ```
   

5. **Start the server:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```
   
   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   
   Frontend runs on `http://localhost:5173`

### Running the Application

1. **Start backend** (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```

2. **Start frontend** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

3. **Open browser:**
   Navigate to `http://localhost:5173`

4. **Create account:**
   - Click "Register"
   - Fill in details
   - Choose "User" or "Admin" role
   - Login and start using the app





## 🧪 Testing
 **Add more env's in `.env` file in backend directory:**
   ```env
   NODE_ENV=test
   JWT_SECRET=test_secret_key
   ```
Run tests from the backend directory:

```bash
cd backend

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

Tests cover all API endpoints with 30+ test cases including:
- Authentication (register, login, validation)
- Sweet CRUD operations
- Search and filtering
- Purchase and restock functionality
- Role-based access control

## 🤖 My AI Usage

### AI Tools Used

I used **ChatGPT** and **Cursor AI** during the development of this project.

### How I Used AI

**For Testing Only:**
- Used ChatGPT and Cursor AI to generate comprehensive unit tests for all backend endpoints
- Asked for help creating test cases following TDD (Test-Driven Development) principles
- Got assistance with test setup, mocking, and Jest configuration
- Used AI to generate test cases for edge cases and error handling scenarios

**All Other Implementation:**
- All backend API development (controllers, routes, middleware, models) was implemented by me
- All frontend components, pages, and features were built by me
- Database schema design and MongoDB integration was done by me
- Authentication and authorization logic was implemented by me
- UI/UX design and styling was done by me
- Project structure and architecture decisions were made by me



## 📝 License

This project is open source and available for educational purposes.

