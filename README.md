# Online Auction & Bidding Web App
**Registration Number: URK23CS1039**

A complete full-stack web application for online auctions with user registration and login functionality. Built with Node.js, Express, MongoDB, React, and Vite.

## Project Structure

```
auction-app/
├── server-app/          # Backend (Node.js + Express)
│   ├── package.json
│   └── server.js
└── client-app/          # Frontend (React + Vite)
    ├── src/
    │   ├── App.jsx
    │   ├── App.css
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## Prerequisites

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community)
- **npm** (comes with Node.js)

## Setup Instructions

### Step 1: Start MongoDB

```bash
# Windows
mongod

# Or if MongoDB is installed as a service, it should start automatically
```

### Step 2: Backend Setup

```bash
cd "C:\Users\jancy\Desktop\Webtechlab 9\auction-app\server-app"
npm install
```

### Step 3: Frontend Setup

```bash
cd "C:\Users\jancy\Desktop\Webtechlab 9\auction-app\client-app"
npm install
```

## Running the Application

### Terminal 1 - Start Backend Server

```bash
cd "C:\Users\jancy\Desktop\Webtechlab 9\auction-app\server-app"
npm run dev
```

Expected output:
```
Server running on http://localhost:7000
```

### Terminal 2 - Start Frontend Server

```bash
cd "C:\Users\jancy\Desktop\Webtechlab 9\auction-app\client-app"
npm run dev
```

Expected output:
```
  VITE v4.x.x  ready in 500 ms

  ➜  Local:   http://localhost:5173/
```

## Access the Application

Open your browser and navigate to: **http://localhost:5173**

## Features

### Authentication
- ✅ User Registration with validation
- ✅ User Login with password verification
- ✅ Password hashing using bcrypt
- ✅ Duplicate email/username checking
- ✅ MongoDB data persistence

### Frontend
- ✅ Bootstrap 5 responsive design
- ✅ Tabbed interface (Login/Register)
- ✅ Form validation
- ✅ Real-time error/success messages
- ✅ Clean and professional UI

### Backend
- ✅ Express.js REST API
- ✅ MongoDB integration with Mongoose
- ✅ CORS enabled for frontend communication
- ✅ Proper error handling
- ✅ Database indexing on username and email

## API Endpoints

### Register User
```
POST /api/register
Content-Type: application/json

{
  "full_name": "John Doe",
  "email": "john@example.com",
  "username": "johndoe",
  "password": "password123"
}

Response: { success: true, message: "Registration successful!" }
```

### Login User
```
POST /api/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "password123"
}

Response: { 
  success: true, 
  message: "Login successful!",
  user: { 
    id: "...", 
    full_name: "John Doe", 
    username: "johndoe" 
  }
}
```

## Database Schema

### User Collection
```javascript
{
  full_name: String,
  email: String (unique),
  username: String (unique),
  password: String (hashed),
  created_at: Date
}
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running on `localhost:27017`
- Check MongoDB service status
- Restart MongoDB server

### Port Already in Use
```bash
# If port 7000 is in use, modify server.js PORT variable
# If port 5173 is in use, Vite will automatically use the next available port
```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rmdir /s /q node_modules
del package-lock.json

# Reinstall
npm install
```

### CORS Errors
- Ensure backend is running on `http://localhost:7000`
- Check that CORS is properly configured in `server.js`
- Clear browser cache and restart servers

## Security Features

- 🔒 Passwords hashed with bcrypt (salt rounds: 10)
- 🔒 Unique email and username validation
- 🔒 Server-side form validation
- 🔒 Error handling without exposing sensitive information

## Development Notes

- Backend runs on **Port 7000**
- Frontend runs on **Port 5173**
- MongoDB database name: **auctionDB**
- Uses `nodemon` for automatic server restart during development
- Uses `Vite` for fast frontend development

## GitHub Copilot Prompts Used

1. **Backend Setup**: Create a complete Node.js Express server with MongoDB and bcrypt for user authentication
2. **Frontend Setup**: Build a React registration and login form with Bootstrap styling
3. **Integration**: Fix MongoDB connection and ensure all routes work with proper CORS

## Next Steps

To extend this application, consider adding:
- JWT authentication tokens
- Email verification
- Password reset functionality
- User profile management
- Auction listing features
- Bidding system
- Real-time notifications
- Payment integration

---

**For support or questions, refer to the official documentation:**
- [Express.js](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
