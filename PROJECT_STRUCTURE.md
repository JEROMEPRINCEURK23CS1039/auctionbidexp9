# Project Structure & File Organization

## Complete Directory Tree

```
auction-app/
│
├── README.md                    # Main project documentation
├── QUICK_START.md              # Quick setup guide
├── COMMANDS.md                 # Useful PowerShell commands
├── .gitignore                  # Git ignore rules
│
├── server-app/                 # Backend Application
│   ├── package.json            # Backend dependencies
│   ├── server.js               # Main Express server
│   └── node_modules/           # (Created after npm install)
│
└── client-app/                 # Frontend Application
    ├── package.json            # Frontend dependencies
    ├── vite.config.js          # Vite configuration
    ├── index.html              # HTML entry point
    ├── src/
    │   ├── App.jsx             # Main React component
    │   ├── App.css             # Styling
    │   └── main.jsx            # React entry point
    ├── node_modules/           # (Created after npm install)
    └── dist/                   # (Created after npm run build)
```

## File Descriptions

### Backend Files

#### `server-app/package.json`
- Defines backend dependencies
- Contains npm scripts: `start`, `dev`
- Dependencies:
  - `express`: Web framework
  - `cors`: Cross-origin requests
  - `mongoose`: MongoDB ODM
  - `bcrypt`: Password hashing

#### `server-app/server.js`
- Main Express application
- MongoDB connection setup
- User schema definition with indices
- Routes:
  - `POST /api/register` - User registration
  - `POST /api/login` - User login
- Runs on port 7000

### Frontend Files

#### `client-app/package.json`
- Defines frontend dependencies
- Contains npm scripts: `dev`, `build`, `preview`
- Dependencies:
  - `react`: UI library
  - `vite`: Build tool
  - `axios`: HTTP client
  - `bootstrap`: CSS framework

#### `client-app/vite.config.js`
- Vite configuration
- Sets port to 5173

#### `client-app/index.html`
- HTML entry point
- Contains root div for React

#### `client-app/src/App.jsx`
- Main React component
- Login form implementation
- Registration form implementation
- State management with useState
- Axios API calls to backend
- Bootstrap styling

#### `client-app/src/App.css`
- Custom styles for App component
- Card styling
- Button styling
- Alert styling

#### `client-app/src/main.jsx`
- React application entry point
- Mounts App component to DOM

## Database Schema

### MongoDB - auctionDB

```javascript
// users collection
{
  _id: ObjectId,
  full_name: String,
  email: String (indexed, unique),
  username: String (indexed, unique),
  password: String (bcrypt hashed),
  created_at: Date (auto-generated)
}
```

## Dependencies Overview

### Backend Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| express | ^4.18.2 | Web framework |
| cors | ^2.8.5 | Enable CORS |
| mongoose | ^7.0.0 | MongoDB ODM |
| bcrypt | ^5.1.0 | Password hashing |
| nodemon | ^2.0.20 | Auto-reload (dev) |

### Frontend Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.2.0 | UI library |
| react-dom | ^18.2.0 | React DOM rendering |
| vite | ^4.2.0 | Build tool |
| axios | ^1.3.4 | HTTP client |
| react-router-dom | ^6.10.0 | Routing (future use) |
| bootstrap | ^5.2.3 | CSS framework |

## Port Configuration

| Service | Port | URL |
|---------|------|-----|
| Backend | 7000 | http://localhost:7000 |
| Frontend | 5173 | http://localhost:5173 |
| MongoDB | 27017 | mongodb://localhost:27017 |

## Environment Setup

### Required
- Node.js v16+
- npm 8+
- MongoDB Community Edition

### Installation Paths
- Node.js: Default installation
- MongoDB: Default installation (usually C:\Program Files\MongoDB\...)
- Project: `C:\Users\jancy\Desktop\Webtechlab 9\auction-app\`

## Build Output

After running `npm run build` in client-app:
- Built files created in `client-app/dist/`
- Ready for deployment
- Optimized and minified

## Development Workflow

```
1. npm install        ← Install dependencies
2. npm run dev        ← Start development server
3. Edit files         ← Files auto-refresh
4. Test changes       ← Browser shows updates
5. npm run build      ← Production build
6. npm run preview    ← Preview production
```

## File Size Reference

Expected sizes after `npm install`:
- Backend node_modules: ~200 MB
- Frontend node_modules: ~300 MB
- Total: ~500 MB

---

**For URK23CS1039 - Online Auction & Bidding Web App** ✨
