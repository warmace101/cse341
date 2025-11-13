# Quick Start Guide - Contacts API Week 1

## 🚀 Get Started in 3 Minutes

### 1. Set Up MongoDB Connection
Edit the `.env` file and replace the MongoDB URI with your connection string:

**For MongoDB Atlas (Recommended):**
```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/contacts-db?retryWrites=true&w=majority
```

**For Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/contacts-db
```

### 2. Start the Server
```bash
npm run dev
```

### 3. Test the API
Open your browser and go to:
- **API Documentation**: http://localhost:3000/api-docs
- **Root Endpoint**: http://localhost:3000

## 🧪 Quick Test
Run the test script to verify everything works:
```bash
node test-api.js
```

## 📚 What You've Built

✅ **Complete CRUD API** - Create, Read, Update, Delete contacts
✅ **MongoDB Integration** - Fully configured with Mongoose
✅ **Professional Documentation** - Interactive Swagger UI
✅ **Data Validation** - Email validation, required fields, date validation
✅ **Error Handling** - Comprehensive error responses
✅ **Production Ready** - Proper project structure and best practices

## 🎯 Contact Schema
```json
{
  "firstName": "John",
  "lastName": "Doe", 
  "email": "john.doe@example.com",
  "favoriteColor": "Blue",
  "birthday": "1990-05-15"
}
```

## 🛠 Available Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server (with auto-reload)
- `node test-api.js` - Test all API endpoints

## 🔗 Next Steps for Week 2
- Deploy to Render
- Add authentication
- Implement pagination
- Add more advanced features
- Create video demonstration

## 📞 API Endpoints
- `GET /contacts` - Get all contacts
- `GET /contacts/:id` - Get single contact
- `POST /contacts` - Create new contact
- `PUT /contacts/:id` - Update contact
- `DELETE /contacts/:id` - Delete contact

---
**Need help?** Check the full README.md for detailed instructions!