# Week 3-4 Project - REST API with CRUD Operations

## Project Description
This is a REST API built with Node.js, Express, and MongoDB for CSE 341. The API performs CRUD operations on two collections: Books and Authors.

## Features
- ✅ Two MongoDB collections (Books and Authors)
- ✅ Book model with 9 fields (7+ required)
- ✅ Complete CRUD operations (GET, POST, PUT, DELETE)
- ✅ Data validation for all inputs
- ✅ Error handling for all routes
- ✅ Swagger API documentation
- ✅ Ready for deployment to Render

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory (copy from `.env.example`):
```
MONGODB_URI=your_mongodb_connection_string_here
PORT=3000
```

### 3. Set Up MongoDB
- Use your existing MongoDB cluster
- Create a new database for this project
- Two collections will be created automatically: `books` and `authors`

### 4. Run the Application

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Documentation
Once the server is running, visit:
```
http://localhost:3000/api-docs
```

## API Endpoints

### Books
- `GET /books` - Get all books
- `GET /books/:id` - Get a single book by ID
- `POST /books` - Create a new book
- `PUT /books/:id` - Update a book
- `DELETE /books/:id` - Delete a book

### Authors
- `GET /authors` - Get all authors
- `GET /authors/:id` - Get a single author by ID
- `POST /authors` - Create a new author
- `PUT /authors/:id` - Update an author
- `DELETE /authors/:id` - Delete an author

## Data Models

### Book (9 fields)
- `title` (string, required)
- `author` (string, required)
- `isbn` (string, required)
- `publishedYear` (integer, required)
- `genre` (string, required)
- `pages` (integer, required)
- `language` (string, required)
- `publisher` (string, required)
- `description` (string, optional)

### Author (5 fields)
- `firstName` (string, required)
- `lastName` (string, required)
- `birthYear` (integer, required)
- `country` (string, required)
- `biography` (string, optional)

## Testing
Use the `routes.rest` file with the REST Client extension in VS Code to test all endpoints.

## Deployment to Render

1. Push your code to GitHub
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Add environment variable: `MONGODB_URI` with your MongoDB connection string
5. Deploy!

## Project Structure
```
week3-4/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── bookController.js    # Book CRUD operations
│   └── authorController.js  # Author CRUD operations
├── models/
│   ├── Book.js              # Book model with validation
│   └── Author.js            # Author model with validation
├── routes/
│   ├── books.js             # Book routes with Swagger docs
│   └── authors.js           # Author routes with Swagger docs
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies and scripts
├── server.js                # Main application file
└── routes.rest              # REST Client test file
```

## Week 03 Requirements Checklist
- ✅ Node.js project created
- ✅ MongoDB connection established
- ✅ Two collections (books, authors)
- ✅ At least one collection with 7+ fields (books has 9)
- ✅ GET routes implemented
- ✅ POST routes implemented
- ✅ PUT routes implemented
- ✅ DELETE routes implemented
- ✅ Data validation added
- ✅ Error handling implemented
- ✅ API documentation (Swagger)
- ✅ Ready for Render deployment

## Next Steps (Week 04)
- Add OAuth authentication
- Implement user management
- Add authentication middleware
- Update API documentation
- Create demonstration video
