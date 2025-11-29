# Week 4 Submission Checklist

## ✅ Project Complete!

Your Week 3-4 project now has ALL required features for Week 4 submission!

## What's Been Implemented

### ✅ Week 3 Requirements (Completed)
- Two MongoDB collections (Books with 9 fields, Authors with 5 fields)
- Complete CRUD operations (GET, POST, PUT, DELETE)
- Data validation on all inputs
- Comprehensive error handling
- Swagger API documentation
- Published to GitHub

### ✅ Week 4 Requirements (Just Added)
- **OAuth Authentication** with GitHub
- **Local Authentication** (username/password with bcrypt)
- **Session Management** with MongoDB store
- **Protected Routes** - POST, PUT, DELETE require authentication
- **User Management** - Register, Login, Logout
- **Swagger Documentation** updated with authentication
- **Secure Password Storage** - All passwords hashed with bcrypt

## 📁 New Files Added

```
week3-4/
├── config/
│   └── passport.js              ← Passport strategies (Local & GitHub OAuth)
├── middleware/
│   └── auth.js                  ← Authentication middleware
├── models/
│   └── User.js                  ← User model with password hashing
├── routes/
│   └── auth.js                  ← Authentication routes
├── OAUTH_GUIDE.md               ← Complete OAuth setup guide
├── test-authentication.rest     ← Authentication test cases
└── .env.example                 ← Updated with OAuth variables
```

## 🔐 Authentication Features

### Local Authentication
- Register new users with username, email, password
- Login with username/password
- Passwords hashed with bcrypt (never stored in plain text)
- Session-based authentication

### GitHub OAuth
- "Login with GitHub" functionality
- Automatic user creation from GitHub profile
- No password needed for OAuth users

### Protected Routes
- `POST /books` - Requires authentication
- `PUT /books/:id` - Requires authentication
- `DELETE /books/:id` - Requires authentication
- `POST /authors` - Requires authentication
- `PUT /authors/:id` - Requires authentication
- `DELETE /authors/:id` - Requires authentication

### Public Routes (No Authentication Required)
- `GET /books` - View all books
- `GET /books/:id` - View single book
- `GET /authors` - View all authors
- `GET /authors/:id` - View single author

## 🚀 Next Steps for Submission

### Step 1: Set Up GitHub OAuth (Required for Week 4)

Follow the guide in `OAUTH_GUIDE.md`:

1. Create GitHub OAuth App at https://github.com/settings/developers
2. Get Client ID and Client Secret
3. Add to your `.env` file:

```env
SESSION_SECRET=generate-a-random-secret-here
GITHUB_CLIENT_ID=your_client_id_here
GITHUB_CLIENT_SECRET=your_client_secret_here
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback
```

### Step 2: Test Locally

1. Start your server:
```bash
npm run dev
```

2. Test authentication:
   - Register a user: `POST /auth/register`
   - Login: `POST /auth/login`
   - Try GitHub OAuth: Visit `http://localhost:3000/auth/github`
   - Test protected routes (should require login)

3. Use the test files:
   - `test-authentication.rest` - Authentication tests
   - `test-errors.rest` - Error handling tests
   - `routes.rest` - CRUD operation tests

### Step 3: Deploy to Render

1. **Update Render Environment Variables:**
   - Add all variables from `.env.example`
   - Use a production-ready SESSION_SECRET
   - Update GITHUB_CALLBACK_URL to your Render URL

2. **Update GitHub OAuth App:**
   - Add production callback URL: `https://your-app.onrender.com/auth/github/callback`

3. **Deploy:**
   - Push changes to GitHub (already done!)
   - Render will auto-deploy

### Step 4: Create Video Demonstration (5-8 minutes)

**Required Content:**

1. **Show Swagger Documentation** (`/api-docs`)
   
2. **Demonstrate Authentication:**
   - Register a new user
   - Login with username/password
   - Show GitHub OAuth login (visit `/auth/github`)
   
3. **Show Protection Works:**
   - Try to create/update/delete WITHOUT login (show 401 error)
   - Login
   - Create/update/delete WITH authentication (show success)
   
4. **Show Validation:**
   - Invalid data (missing fields, wrong types)
   - Show error responses
   
5. **Show MongoDB:**
   - Open MongoDB Compass
   - Show `users` collection (with hashed passwords!)
   - Show `books` collection
   - Show `authors` collection
   - Show `sessions` collection
   - Show data being created/updated/deleted
   
6. **Demonstrate All CRUD Operations:**
   - GET all items
   - GET single item by ID
   - POST new item (while authenticated)
   - PUT update item (while authenticated)
   - DELETE item (while authenticated)

### Step 5: Submit to Canvas

Submit THREE links:

1. **GitHub Repository:**
   ```
   https://github.com/warmace101/cse341
   ```

2. **Render API Documentation:**
   ```
   https://your-app-name.onrender.com/api-docs
   ```

3. **YouTube Video:**
   ```
   https://youtube.com/watch?v=your-video-id
   ```

## 📝 API Endpoints Summary

### Authentication Endpoints
```
POST   /auth/register          - Register new user
POST   /auth/login             - Login with username/password
POST   /auth/logout            - Logout current user
GET    /auth/github            - Initiate GitHub OAuth
GET    /auth/github/callback   - GitHub OAuth callback
GET    /auth/user              - Get current user info
```

### Books Endpoints
```
GET    /books                  - Get all books (public)
GET    /books/:id              - Get single book (public)
POST   /books                  - Create book (requires auth)
PUT    /books/:id              - Update book (requires auth)
DELETE /books/:id              - Delete book (requires auth)
```

### Authors Endpoints
```
GET    /authors                - Get all authors (public)
GET    /authors/:id            - Get single author (public)
POST   /authors                - Create author (requires auth)
PUT    /authors/:id            - Update author (requires auth)
DELETE /authors/:id            - Delete author (requires auth)
```

## 🔍 Testing Checklist

Before recording your video, test:

- [ ] Register new user (local auth)
- [ ] Login with username/password
- [ ] Login with GitHub OAuth
- [ ] Get current user info
- [ ] Try protected route without auth (should fail with 401)
- [ ] Try protected route with auth (should succeed)
- [ ] Create a book (authenticated)
- [ ] Update a book (authenticated)
- [ ] Delete a book (authenticated)
- [ ] Create an author (authenticated)
- [ ] Update an author (authenticated)
- [ ] Delete an author (authenticated)
- [ ] Test validation errors (missing fields, invalid data)
- [ ] Test error handling (invalid IDs, not found)
- [ ] Logout
- [ ] Verify protected routes fail after logout
- [ ] Check MongoDB has users, books, authors, sessions collections
- [ ] Verify passwords are hashed in database

## 📚 Documentation Files

- `README.md` - Main project documentation
- `OAUTH_GUIDE.md` - Complete OAuth setup guide
- `DEPLOYMENT.md` - Render deployment instructions
- `QUICKSTART.md` - Quick reference guide
- `test-authentication.rest` - Authentication test cases
- `test-errors.rest` - Error handling test cases
- `routes.rest` - CRUD operation test cases

## 💡 Tips for Success

1. **Test everything locally first** before deploying to Render
2. **Use MongoDB Compass** to verify data is being stored correctly
3. **Check password hashing** - passwords in database should be long hashed strings
4. **Time your video** - Keep it between 5-8 minutes
5. **Show both authentication methods** - Local login AND GitHub OAuth
6. **Demonstrate the 401 errors** - Show that protection actually works
7. **Keep audio clear** - Use a good microphone or quiet environment

## ⚠️ Important Notes

- **DO NOT** commit your `.env` file (it's in `.gitignore`)
- **DO NOT** share your GitHub OAuth secrets publicly
- **DO** use a strong SESSION_SECRET in production
- **DO** test on Render before submitting
- **DO** show MongoDB with hashed passwords (proves bcrypt works)

## 🎯 Week 4 Rubric Items

✅ Deploy Node.js API to the web  
✅ Incorporate authentication system with OAuth  
✅ Host GET, POST, PUT and DELETE endpoints  
✅ Produce API documentation that allows API testing  
✅ Validate all data before processing API requests  
✅ Handle errors in application  
✅ Demonstrate OAuth and validation restricting endpoints  
✅ Create 5 to 8 minute video demonstration  

## Need Help?

- Check `OAUTH_GUIDE.md` for detailed OAuth setup
- Review `test-authentication.rest` for authentication examples
- See `DEPLOYMENT.md` for Render configuration
- All test files include examples of expected responses

---

**You're ready to complete Week 4! Good luck with your video and submission! 🎉**
