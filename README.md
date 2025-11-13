# Contacts API - Week 1

A REST API for managing contacts with MongoDB storage, built with Node.js, Express, and MongoDB.

## Features

- **Full CRUD Operations**: Create, Read, Update, and Delete contacts
- **MongoDB Integration**: Mongoose ODM for database operations
- **Data Validation**: Express validator and Mongoose validation
- **Professional API Documentation**: Swagger UI integration
- **Error Handling**: Comprehensive error handling and validation
- **Modern Architecture**: MVC pattern with proper separation of concerns

## Contact Schema

Each contact includes:
- `firstName` (required, max 50 characters)
- `lastName` (required, max 50 characters)
- `email` (required, unique, valid email format)
- `favoriteColor` (required, max 30 characters)
- `birthday` (required, date in YYYY-MM-DD format, cannot be in future)

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Environment Configuration
1. Copy the `.env` file and update the MongoDB connection string:
```env
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/contacts-db?retryWrites=true&w=majority
PORT=3000
NODE_ENV=development
```

### Step 3: MongoDB Setup
**Option A: MongoDB Atlas (Recommended)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user with read/write permissions
4. Get your connection string and update the `.env` file

**Option B: Local MongoDB**
```env
MONGODB_URI=mongodb://localhost:27017/contacts-db
```

### Step 4: Start the Server
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## API Documentation

Once the server is running, access the interactive API documentation at:
**http://localhost:3000/api-docs**

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/contacts` | Get all contacts |
| GET | `/contacts/:id` | Get contact by ID |
| POST | `/contacts` | Create new contact |
| PUT | `/contacts/:id` | Update contact |
| DELETE | `/contacts/:id` | Delete contact |

### Example API Calls

**Create a new contact:**
```json
POST /contacts
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "favoriteColor": "Blue",
  "birthday": "1990-05-15"
}
```

**Update a contact:**
```json
PUT /contacts/507f1f77bcf86cd799439011
{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@example.com",
  "favoriteColor": "Green",
  "birthday": "1990-05-15"
}
```

## Project Structure

```
contacts-api/
├── controllers/           # Business logic
│   └── contactController.js
├── models/               # Database models
│   └── Contact.js
├── routes/               # API routes
│   └── contacts.js
├── config/               # Configuration files
├── .env                  # Environment variables
├── .gitignore           # Git ignore file
├── package.json         # Project dependencies
├── server.js            # Main server file
└── README.md           # This file
```

## Error Handling

The API provides comprehensive error handling with appropriate HTTP status codes:

- **400**: Bad Request (validation errors, invalid data)
- **404**: Not Found (contact doesn't exist)
- **500**: Internal Server Error

All errors return a consistent JSON format:
```json
{
  "success": false,
  "error": "Error Type",
  "message": "Detailed error message",
  "details": ["Additional error details if available"]
}
```

## Data Validation

- All required fields must be provided
- Email addresses must be valid and unique
- Names and colors have character limits
- Birthday must be a valid date in the past
- Data is sanitized and trimmed automatically

## Development

### Running in Development Mode
```bash
npm run dev
```
This uses `nodemon` for automatic server restart when files change.

### Testing the API
Use tools like:
- Postman
- Thunder Client (VS Code extension)
- curl commands
- The built-in Swagger UI documentation

## Next Steps for Week 2

- Deploy to Render or similar cloud platform
- Add authentication and authorization
- Implement advanced features like pagination and filtering
- Create comprehensive test suite
- Add logging and monitoring

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **Swagger**: API documentation
- **Express Validator**: Request validation
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.