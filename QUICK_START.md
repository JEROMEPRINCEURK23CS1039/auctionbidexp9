# Quick Start Guide for Online Auction & Bidding Web App
# Register Number: URK23CS1039

## 🚀 Quick Setup (3 Steps)

### Step 1: Install MongoDB
1. Download from: https://www.mongodb.com/try/download/community
2. Install and keep MongoDB running in the background

### Step 2: Install Backend Dependencies
```powershell
cd "C:\Users\jancy\Desktop\Webtechlab 9\auction-app\server-app"
npm install
```

### Step 3: Install Frontend Dependencies
```powershell
cd "C:\Users\jancy\Desktop\Webtechlab 9\auction-app\client-app"
npm install
```

## 🏃 Running the Application

**Open TWO PowerShell terminals:**

**Terminal 1 - Backend (Port 7000):**
```powershell
cd "C:\Users\jancy\Desktop\Webtechlab 9\auction-app\server-app"
npm run dev
```

**Terminal 2 - Frontend (Port 5173):**
```powershell
cd "C:\Users\jancy\Desktop\Webtechlab 9\auction-app\client-app"
npm run dev
```

## 🌐 Access Application
- Open browser: http://localhost:5173

## 📋 Test Credentials (After Registration)

1. **Register** a new account with:
   - Full Name: John Doe
   - Email: john@example.com
   - Username: johndoe
   - Password: password123

2. **Login** with:
   - Username: johndoe
   - Password: password123

## ✨ Features Implemented

✅ User Registration Form
✅ User Login Form
✅ Password Hashing (bcrypt)
✅ MongoDB Data Storage
✅ Form Validation
✅ Error/Success Messages
✅ Bootstrap UI Styling
✅ CORS Configuration
✅ Express REST API

## 🔗 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/register` | Register new user |
| POST | `/api/login` | Login user |

## 📝 Tech Stack

- **Backend**: Node.js, Express, MongoDB, Mongoose, bcrypt
- **Frontend**: React, Vite, Bootstrap 5, Axios
- **Database**: MongoDB (NoSQL)

## 🛠️ Troubleshooting

**Q: "Cannot connect to MongoDB"**
- A: Ensure MongoDB is running. Run `mongod` in a separate terminal

**Q: "Port already in use"**
- A: Change PORT in server.js or restart your system

**Q: "npm install fails"**
- A: Run `npm cache clean --force` then `npm install` again

## 📚 Next Steps

After getting the basic app working, consider adding:
- JWT token-based authentication
- Email verification
- User profile pages
- Auction listing system
- Bidding functionality
- Real-time notifications

---
**Successfully set up for URK23CS1039** ✨
