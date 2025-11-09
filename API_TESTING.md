# API Testing Guide

## Testing the Auction App APIs

### Using Postman or Thunder Client

#### 1. Register a New User

**Request:**
```
POST http://localhost:7000/api/register
Content-Type: application/json

{
  "full_name": "Jane Smith",
  "email": "jane@example.com",
  "username": "janesmith",
  "password": "securePass123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Registration successful!"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Username or email already exists"
}
```

---

#### 2. Login User

**Request:**
```
POST http://localhost:7000/api/login
Content-Type: application/json

{
  "username": "janesmith",
  "password": "securePass123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful!",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "full_name": "Jane Smith",
    "username": "janesmith"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid username or email"
}
```

---

## Using cURL Commands

### Register with cURL

```powershell
curl -X POST http://localhost:7000/api/register `
  -H "Content-Type: application/json" `
  -d '{
    "full_name": "John Doe",
    "email": "john@example.com",
    "username": "johndoe",
    "password": "password123"
  }'
```

### Login with cURL

```powershell
curl -X POST http://localhost:7000/api/login `
  -H "Content-Type: application/json" `
  -d '{
    "username": "johndoe",
    "password": "password123"
  }'
```

---

## Using Node.js/JavaScript

### Register Request

```javascript
const axios = require('axios');

axios.post('http://localhost:7000/api/register', {
  full_name: 'John Doe',
  email: 'john@example.com',
  username: 'johndoe',
  password: 'password123'
})
.then(response => console.log(response.data))
.catch(error => console.log(error.response.data));
```

### Login Request

```javascript
const axios = require('axios');

axios.post('http://localhost:7000/api/login', {
  username: 'johndoe',
  password: 'password123'
})
.then(response => console.log(response.data))
.catch(error => console.log(error.response.data));
```

---

## Using Python

### Register Request

```python
import requests
import json

url = 'http://localhost:7000/api/register'
data = {
    'full_name': 'John Doe',
    'email': 'john@example.com',
    'username': 'johndoe',
    'password': 'password123'
}

response = requests.post(url, json=data)
print(response.json())
```

### Login Request

```python
import requests

url = 'http://localhost:7000/api/login'
data = {
    'username': 'johndoe',
    'password': 'password123'
}

response = requests.post(url, json=data)
print(response.json())
```

---

## Testing with Postman

### Step 1: Create a new Request
1. Click "+" to create new request
2. Set method to "POST"
3. Enter URL: `http://localhost:7000/api/register`

### Step 2: Configure Headers
- Click "Headers" tab
- Add: `Content-Type: application/json`

### Step 3: Add Body
- Click "Body" tab
- Select "raw" and "JSON"
- Paste the request JSON

### Step 4: Send
- Click "Send" button
- View response below

---

## Common Test Scenarios

### Scenario 1: Successful Registration
```
✓ All fields filled
✓ Valid email format
✓ Password ≥ 6 characters
✓ Unique username
✓ Unique email
Result: 201 Created with success message
```

### Scenario 2: Duplicate Username
```
✓ Register user with username "johndoe"
✗ Try to register again with "johndoe"
Result: 400 Bad Request - "Username or email already exists"
```

### Scenario 3: Duplicate Email
```
✓ Register with email "john@example.com"
✗ Try to register with same email, different username
Result: 400 Bad Request - "Username or email already exists"
```

### Scenario 4: Successful Login
```
✓ Register user: johndoe / password123
✓ Login with: johndoe / password123
Result: 200 OK with user data
```

### Scenario 5: Wrong Password
```
✓ Register user: johndoe / password123
✗ Login with: johndoe / wrongpassword
Result: 401 Unauthorized - "Invalid password"
```

### Scenario 6: Non-existent User
```
✗ Try to login with: nonexistentuser / password123
Result: 401 Unauthorized - "Invalid username or email"
```

### Scenario 7: Login with Email
```
✓ Register: username="johndoe", email="john@example.com"
✓ Login with: username="john@example.com", password="password123"
Result: 200 OK - Successful login
```

---

## Response Status Codes

| Code | Meaning | When |
|------|---------|------|
| 201 | Created | Successful registration |
| 200 | OK | Successful login |
| 400 | Bad Request | Duplicate user/email or validation error |
| 401 | Unauthorized | Invalid credentials |
| 500 | Server Error | Database or server error |

---

## Error Messages

| Error | Reason | Solution |
|-------|--------|----------|
| "Username or email already exists" | Duplicate credentials | Use different username/email |
| "Invalid username or email" | User not found | Register first or check spelling |
| "Invalid password" | Wrong password | Enter correct password |
| "Server error" | Database/server issue | Check if MongoDB is running |

---

## Validation Rules

### Registration
- ✓ Full name: Required, non-empty
- ✓ Email: Required, valid format
- ✓ Username: Required, unique, 3+ characters
- ✓ Password: Required, ≥6 characters
- ✓ Confirm Password: Must match password (frontend only)

### Login
- ✓ Username/Email: Required
- ✓ Password: Required

---

## Database Verification

### Check MongoDB Data

```javascript
// In MongoDB shell
use auctionDB
db.users.find()

// Find specific user
db.users.findOne({ username: "johndoe" })

// Count users
db.users.countDocuments()

// Delete a user
db.users.deleteOne({ username: "johndoe" })
```

---

**Test your APIs thoroughly before deployment!** 🚀
