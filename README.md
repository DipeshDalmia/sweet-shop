# 🍭 Sweet Shop - E-Commerce Application

A full-stack e-commerce application for managing and purchasing sweets, built with React and Node.js. Features user authentication, role-based access control, inventory management, and a modern responsive UI.

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
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sweet-shop?retryWrites=true&w=majority
   TEST_MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sweet-shop-test?retryWrites=true&w=majority
   PORT=5000
   JWT_SECRET=supersecretkey
   ```
   
   Replace `username`, `password`, and `cluster0.xxxxx.mongodb.net` with your actual MongoDB Atlas credentials.

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

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Sweets (Protected - requires authentication)
- `POST /api/sweets` - Add new sweet
- `GET /api/sweets` - Get all sweets
- `GET /api/sweets/search` - Search sweets (query params: name, category, minPrice, maxPrice)
- `PUT /api/sweets/:id` - Update sweet
- `DELETE /api/sweets/:id` - Delete sweet (Admin only)
- `POST /api/sweets/:id/purchase` - Purchase sweet
- `POST /api/sweets/:id/restock` - Restock sweet (Admin only)

### Example Request

**Register:**
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**Login Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "user"
}
```

## 🧪 Testing

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

### Reflection

AI tools (ChatGPT and Cursor AI) were helpful specifically for generating comprehensive test suites, which saved time on writing repetitive test code. However, all the core application logic, features, and implementation were developed independently. The AI assistance was limited to testing, allowing me to focus on building the actual application functionality while ensuring good test coverage.

## 📝 License

This project is open source and available for educational purposes.

