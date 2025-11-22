# Deployment Guide for Render

## Step-by-Step Deployment Instructions

### 1. Prepare Your Code

Before deploying, make sure:
- ✅ Your `.env` file is in `.gitignore` (already done)
- ✅ Your code is committed to GitHub
- ✅ Your MongoDB credentials are ready

```bash
git add .
git commit -m "Add Week 3-4 project with CRUD operations"
git push origin main
```

### 2. Create a Render Account
- Go to [render.com](https://render.com)
- Sign up or log in with your GitHub account

### 3. Create a New Web Service

1. Click "New +" button
2. Select "Web Service"
3. Connect your GitHub repository
4. Select the repository with your project

### 4. Configure Your Service

**Basic Settings:**
- **Name:** `week3-4-project` (or your preferred name)
- **Region:** Choose closest to you
- **Branch:** `main`
- **Root Directory:** Leave blank (or `week3-4` if in subdirectory)
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

### 5. Set Environment Variables

In the "Environment" section, add:

**Key:** `MONGODB_URI`  
**Value:** Your MongoDB connection string (from MongoDB Atlas)

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/yourDatabaseName?retryWrites=true&w=majority
```

**Key:** `PORT` (optional, Render provides this automatically)  
**Value:** Leave blank, Render will set this

### 6. Deploy

1. Click "Create Web Service"
2. Wait for the deployment to complete (2-5 minutes)
3. Once deployed, you'll receive a URL like: `https://week3-4-project.onrender.com`

### 7. Test Your Deployed API

Visit your API documentation:
```
https://your-app-name.onrender.com/api-docs
```

Test endpoints:
```
https://your-app-name.onrender.com/books
https://your-app-name.onrender.com/authors
```

### 8. Important Notes

⚠️ **Free Tier Limitations:**
- Render's free tier may spin down after 15 minutes of inactivity
- First request after inactivity may take 30-60 seconds
- Consider upgrading if you need 24/7 uptime

⚠️ **Common Issues:**

**Issue:** Build fails  
**Solution:** Make sure `package.json` has correct `start` script

**Issue:** Connection to MongoDB fails  
**Solution:** 
- Check your MongoDB connection string
- Ensure MongoDB Atlas allows connections from all IPs (0.0.0.0/0)
- Verify database user permissions

**Issue:** Routes not working  
**Solution:** Check that all routes use relative paths, not localhost URLs

### 9. Update Your routes.rest File

After deployment, update the `@baseUrl` variable:

```
@baseUrl = https://your-app-name.onrender.com
```

### 10. Continuous Deployment

Render automatically deploys when you push to GitHub:
```bash
git add .
git commit -m "Update feature"
git push origin main
```

Render will detect the push and redeploy automatically.

## MongoDB Atlas Setup Reminder

Make sure your MongoDB Atlas is configured:

1. **Network Access:**
   - Go to "Network Access" in MongoDB Atlas
   - Add IP Address: `0.0.0.0/0` (Allow access from anywhere)
   - This is necessary for Render to connect

2. **Database User:**
   - Ensure you have a database user with read/write permissions
   - Use this user's credentials in your connection string

3. **Connection String Format:**
   ```
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
   ```

## Video Recording Tips

For your YouTube demonstration video:

1. Show your code in GitHub
2. Demonstrate the live API on Render
3. Use Swagger documentation or Postman to test:
   - GET all items
   - GET single item by ID
   - POST new item (show validation)
   - PUT update item
   - DELETE item
   - Show error handling (invalid ID, missing fields)
4. Verify changes in MongoDB Compass
5. Keep it under 8 minutes!

## Troubleshooting

### Check Logs in Render:
- Go to your service dashboard
- Click "Logs" tab
- Look for error messages

### Common Error Messages:

**"Cannot connect to MongoDB"**
- Verify connection string
- Check MongoDB Atlas network access

**"Module not found"**
- Ensure all dependencies are in `package.json`
- Try rebuilding: "Manual Deploy" > "Clear build cache & deploy"

**"Port already in use"**
- Render handles ports automatically, don't hardcode port 3000 in production

## Week 04 Preview

For next week, you'll add:
- OAuth authentication (Google, GitHub, etc.)
- Protected routes
- User sessions
- Authentication middleware

Good luck with your deployment! 🚀
