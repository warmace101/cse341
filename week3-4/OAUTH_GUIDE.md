# OAuth Setup and Authentication Guide

## Overview
This guide will help you set up GitHub OAuth authentication for your Week 3-4 project.

## Part 1: Set Up GitHub OAuth Application

### Step 1: Create a GitHub OAuth App

1. Go to GitHub Settings → Developer settings → OAuth Apps
   - Or visit: https://github.com/settings/developers

2. Click **"New OAuth App"**

3. Fill in the application details:
   - **Application name:** `CSE 341 Week 3-4 Project` (or your preferred name)
   - **Homepage URL:** `http://localhost:3000` (for local development)
   - **Authorization callback URL:** `http://localhost:3000/auth/github/callback`

4. Click **"Register application"**

5. Copy your **Client ID**

6. Click **"Generate a new client secret"** and copy the **Client Secret**
   ⚠️ **Important:** Save the client secret immediately - you won't be able to see it again!

### Step 2: Update Your .env File

Add these to your `.env` file:

```env
MONGODB_URI=mongodb+srv://youruser:yourpassword@cluster0.vzwqz5b.mongodb.net/week3-4?retryWrites=true&w=majority
PORT=3000
SESSION_SECRET=your-random-secret-key-here-make-it-long-and-secure
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback
NODE_ENV=development
```

**Generate a strong SESSION_SECRET:**
```bash
# You can use this Node.js command to generate a random secret:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Part 2: Testing Authentication Locally

### Start Your Server
```bash
npm run dev
```

### Test Endpoints

#### 1. Register a New User (Local Authentication)
```http
POST http://localhost:3000/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

**Expected Response (201):**
```json
{
  "message": "User registered and logged in successfully",
  "user": {
    "id": "...",
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

#### 2. Login with Username/Password
```http
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}
```

**Expected Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "...",
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

#### 3. Test GitHub OAuth Login
Visit in your browser:
```
http://localhost:3000/auth/github
```

This will redirect you to GitHub to authorize the application. After authorization, you'll be redirected back to your app.

#### 4. Check Current User
```http
GET http://localhost:3000/auth/user
```

**If logged in (200):**
```json
{
  "user": {
    "id": "...",
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

**If not logged in (401):**
```json
{
  "error": "Not authenticated"
}
```

#### 5. Test Protected Routes

**Without authentication - should fail:**
```http
POST http://localhost:3000/books
Content-Type: application/json

{
  "title": "Test Book",
  "author": "Test Author",
  "isbn": "123-456",
  "publishedYear": 2023,
  "genre": "Fiction",
  "pages": 200,
  "language": "English",
  "publisher": "Test Publisher"
}
```

**Expected Response (401):**
```json
{
  "error": "Unauthorized",
  "message": "You must be logged in to access this resource"
}
```

**With authentication - should succeed:**
First login, then make the same POST request. It should work!

#### 6. Logout
```http
POST http://localhost:3000/auth/logout
```

**Expected Response (200):**
```json
{
  "message": "Logout successful"
}
```

## Part 3: Deploy to Render with OAuth

### Step 1: Update GitHub OAuth App for Production

1. Go back to your GitHub OAuth App settings
2. Click **"Update application"**
3. Update the **Authorization callback URL** to:
   ```
   https://your-app-name.onrender.com/auth/github/callback
   ```
   (Replace `your-app-name` with your actual Render app name)

4. Save changes

### Step 2: Add Environment Variables to Render

In your Render dashboard, add these environment variables:

1. `MONGODB_URI` - Your MongoDB connection string
2. `SESSION_SECRET` - A strong random secret (use the generator command above)
3. `GITHUB_CLIENT_ID` - Your GitHub Client ID
4. `GITHUB_CLIENT_SECRET` - Your GitHub Client Secret
5. `GITHUB_CALLBACK_URL` - `https://your-app-name.onrender.com/auth/github/callback`
6. `RENDER_URL` - `https://your-app-name.onrender.com`
7. `NODE_ENV` - `production`

### Step 3: Test on Render

Visit:
```
https://your-app-name.onrender.com/api-docs
```

Test all the authentication endpoints there!

## Part 4: Understanding Authentication Flow

### Local Authentication Flow:
1. User registers → Password is hashed with bcrypt → Stored in MongoDB
2. User logs in → Password compared with hash → Session created
3. Session stored in MongoDB (using connect-mongo)
4. Cookie sent to browser with session ID
5. Protected routes check for valid session

### OAuth Flow:
1. User clicks "Login with GitHub"
2. Redirected to GitHub for authorization
3. GitHub redirects back with authorization code
4. App exchanges code for access token
5. App fetches user profile from GitHub
6. User created/updated in MongoDB
7. Session created and cookie sent to browser

## Part 5: Swagger Documentation Testing

### View API Documentation
```
http://localhost:3000/api-docs
```

### Testing Protected Endpoints in Swagger:

1. **First, login:**
   - Use `POST /auth/login` or `POST /auth/register`
   - Or visit `/auth/github` in a browser tab

2. **Swagger will automatically include session cookie**
   - Once logged in, Swagger sends the session cookie with each request

3. **Test protected routes:**
   - Try `POST /books` - should work
   - Try `PUT /books/{id}` - should work
   - Try `DELETE /books/{id}` - should work

4. **Logout and test again:**
   - Use `POST /auth/logout`
   - Try protected routes again - should get 401 errors

## Part 6: Video Demonstration Checklist

For your YouTube video (5-8 minutes), demonstrate:

1. ✅ **Show GitHub OAuth App configuration**
2. ✅ **Register a new user via Swagger**
3. ✅ **Login with username/password**
4. ✅ **Try to create a book WITHOUT authentication (show 401 error)**
5. ✅ **Login successfully**
6. ✅ **Create a book WITH authentication (show success)**
7. ✅ **Update a book (authenticated)**
8. ✅ **Delete a book (authenticated)**
9. ✅ **Show MongoDB Compass with:**
   - users collection (with hashed passwords)
   - books collection (with CRUD changes)
   - sessions collection
10. ✅ **Demonstrate GitHub OAuth:**
    - Click login with GitHub
    - Show GitHub authorization page
    - Show successful login
    - Create/update/delete something while authenticated via GitHub
11. ✅ **Show validation errors** (missing fields, invalid data)
12. ✅ **Show error handling** (invalid ID, not found)
13. ✅ **Logout and show protected routes fail again**

## Troubleshooting

### "Error: No session secret"
- Make sure `SESSION_SECRET` is set in your `.env` file

### "GitHub OAuth not working"
- Check `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` are correct
- Verify `GITHUB_CALLBACK_URL` matches what's in GitHub OAuth App settings
- Make sure you're using http://localhost:3000 for local testing

### "Cannot POST /auth/login"
- Make sure server is running
- Check that auth routes are loaded in server.js

### "401 Unauthorized on protected routes"
- Make sure you're logged in first
- Check that session cookie is being sent with requests
- In Swagger, cookies are sent automatically after login

### "Database connection failed"
- Verify `MONGODB_URI` is correct in `.env`
- Check MongoDB Atlas network access allows your IP

## Additional Resources

- Passport.js Documentation: http://www.passportjs.org/
- GitHub OAuth Apps: https://docs.github.com/en/developers/apps/building-oauth-apps
- Bcrypt Documentation: https://www.npmjs.com/package/bcrypt
- Express Session: https://www.npmjs.com/package/express-session

## Ready to Submit!

Once everything works:

1. ✅ Push to GitHub
2. ✅ Deploy to Render with all environment variables
3. ✅ Test everything on Render
4. ✅ Record your 5-8 minute demonstration video
5. ✅ Upload to YouTube (public or unlisted)
6. ✅ Submit three links to Canvas:
   - GitHub repo
   - Render API Documentation (https://your-app.onrender.com/api-docs)
   - YouTube video
