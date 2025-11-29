# Quick Start Guide - Week 3-4 Project

## ⚡ Quick Setup (3 Steps)

### 1. Add MongoDB Connection String
Edit `.env` file and replace with your MongoDB connection string:
```
MONGODB_URI=mongodb+srv://youruser:yourpassword@cluster0.xxxxx.mongodb.net/yourDatabase?retryWrites=true&w=majority
PORT=3000
```

### 2. Start the Server
```bash
npm run dev
```

### 3. Test the API
Open in browser: `http://localhost:3000/api-docs`

---

## 📁 Project Structure

```
week3-4/
├── config/database.js          ← MongoDB connection
├── controllers/                ← Business logic with validation
│   ├── bookController.js
│   └── authorController.js
├── models/                     ← Data models with validation
│   ├── Book.js (9 fields)
│   └── Author.js (5 fields)
├── routes/                     ← API endpoints + Swagger docs
│   ├── books.js
│   └── authors.js
├── .env                        ← Your MongoDB credentials (SECRET!)
├── .gitignore                  ← Keeps .env private
├── server.js                   ← Main application
├── routes.rest                 ← Test file for REST Client
└── README.md                   ← Full documentation
```

---

## 🚀 Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start with auto-restart (development) |
| `npm start` | Start normally (production) |

---

## 🔗 Important URLs (when running locally)

| URL | Description |
|-----|-------------|
| http://localhost:3000 | Home page |
| http://localhost:3000/api-docs | Swagger documentation |
| http://localhost:3000/books | Books API |
| http://localhost:3000/authors | Authors API |

---

## 📝 Example API Calls

### Create a Book (POST)
```json
POST http://localhost:3000/books
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "978-0-7432-7356-5",
  "publishedYear": 1925,
  "genre": "Fiction",
  "pages": 180,
  "language": "English",
  "publisher": "Scribner",
  "description": "A classic American novel"
}
```

### Get All Books (GET)
```
GET http://localhost:3000/books
```

### Update a Book (PUT)
```json
PUT http://localhost:3000/books/{id}
Content-Type: application/json

{
  "title": "Updated Title",
  "author": "Updated Author",
  ...all required fields
}
```

### Delete a Book (DELETE)
```
DELETE http://localhost:3000/books/{id}
```

---

## ✅ Week 03 Checklist

- [x] Node.js project initialized
- [x] Dependencies installed
- [x] MongoDB connection configured
- [x] Two collections (books, authors)
- [x] Book model has 9 fields (meets 7+ requirement)
- [x] All CRUD operations implemented
  - [x] GET (all and by ID)
  - [x] POST (create)
  - [x] PUT (update)
  - [x] DELETE (delete)
- [x] Data validation on all routes
- [x] Error handling on all routes
- [x] Swagger API documentation
- [ ] **YOU NEED TO:** Add your MongoDB connection string to `.env`
- [ ] **YOU NEED TO:** Test all endpoints
- [ ] **YOU NEED TO:** Deploy to Render

---

## 🎬 Next Steps

1. **Edit `.env`** - Add your MongoDB connection string
2. **Run `npm run dev`** - Start the server
3. **Visit `http://localhost:3000/api-docs`** - View API docs
4. **Use `routes.rest`** - Test all endpoints (install REST Client extension)
5. **Check MongoDB Compass** - Verify data is being saved
6. **Read `DEPLOYMENT.md`** - Deploy to Render when ready

---

## 🆘 Troubleshooting

**Server won't start?**
- Check that MongoDB connection string is in `.env`
- Make sure all dependencies are installed: `npm install`

**Can't connect to MongoDB?**
- Verify connection string is correct
- Check MongoDB Atlas network access (allow 0.0.0.0/0)

**Routes not working?**
- Check server is running: `npm run dev`
- Verify URL is correct: `http://localhost:3000`

**Need help?**
- Check `README.md` for full documentation
- Check `DEPLOYMENT.md` for deployment help
- Review error messages in terminal

---

## 📚 Files to Read

1. **README.md** - Complete project documentation
2. **DEPLOYMENT.md** - Step-by-step deployment guide
3. **routes.rest** - API testing examples

---

**Ready to start? Edit `.env` and run `npm run dev`!**
