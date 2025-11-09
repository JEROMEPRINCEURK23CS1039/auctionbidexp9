# PowerShell Commands for Online Auction App

## 🚀 One-Line Setup

# Run this in PowerShell to install both frontend and backend
cd "C:\Users\jancy\Desktop\Webtechlab 9\auction-app\server-app"; npm install; cd "..\client-app"; npm install; echo "Setup Complete!"

## 📂 Quick Navigation

# Open server folder
cd "C:\Users\jancy\Desktop\Webtechlab 9\auction-app\server-app"

# Open client folder
cd "C:\Users\jancy\Desktop\Webtechlab 9\auction-app\client-app"

## 🎯 Running the Servers

# Terminal 1: Start Backend
cd "C:\Users\jancy\Desktop\Webtechlab 9\auction-app\server-app"; npm run dev

# Terminal 2: Start Frontend
cd "C:\Users\jancy\Desktop\Webtechlab 9\auction-app\client-app"; npm run dev

## 🗄️ MongoDB Commands

# Start MongoDB
mongod

# Open MongoDB shell
mongosh

# View all databases
db.adminCommand('listDatabases')

# Switch to auctionDB
use auctionDB

# View users collection
db.users.find()

## 🧹 Cleanup Commands

# Remove node_modules and reinstall
rmdir /s /q "C:\Users\jancy\Desktop\Webtechlab 9\auction-app\server-app\node_modules"
rmdir /s /q "C:\Users\jancy\Desktop\Webtechlab 9\auction-app\client-app\node_modules"
cd "C:\Users\jancy\Desktop\Webtechlab 9\auction-app\server-app"; npm install
cd "C:\Users\jancy\Desktop\Webtechlab 9\auction-app\client-app"; npm install

# Clear npm cache
npm cache clean --force

## 📦 Package Management

# Update packages
npm update

# Install specific package version
npm install package-name@version

# Check outdated packages
npm outdated

## 🔍 Port Checking

# Check if port 7000 is in use
netstat -ano | findstr :7000

# Check if port 5173 is in use
netstat -ano | findstr :5173

## 🌐 Browser Access

# Open application in default browser
start http://localhost:5173

## 📊 Development Tools

# Build frontend for production
cd "C:\Users\jancy\Desktop\Webtechlab 9\auction-app\client-app"; npm run build

# Preview production build
npm run preview

## 🐛 Debugging

# Enable verbose logging in npm
npm install --verbose

# Check Node version
node --version

# Check npm version
npm --version

# Check MongoDB version
mongod --version
