const mongodb = require('../config/database');
const { ObjectId } = require('mongodb');
const Book = require('../models/Book');

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const db = mongodb.getDatabase();
    const books = await db.collection('books').find().toArray();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve books', details: error.message });
  }
};

// Get single book by ID
const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    
    if (!ObjectId.isValid(bookId)) {
      return res.status(400).json({ error: 'Invalid book ID format' });
    }

    const db = mongodb.getDatabase();
    const book = await db.collection('books').findOne({ _id: new ObjectId(bookId) });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve book', details: error.message });
  }
};

// Create new book
const createBook = async (req, res) => {
  try {
    const bookData = req.body;

    // Validate book data
    const errors = Book.validate(bookData);
    if (errors.length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }

    const book = new Book(bookData);
    const db = mongodb.getDatabase();
    const result = await db.collection('books').insertOne(book);

    if (result.acknowledged) {
      res.status(201).json({ 
        message: 'Book created successfully', 
        bookId: result.insertedId 
      });
    } else {
      res.status(500).json({ error: 'Failed to create book' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to create book', details: error.message });
  }
};

// Update book
const updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    
    if (!ObjectId.isValid(bookId)) {
      return res.status(400).json({ error: 'Invalid book ID format' });
    }

    const bookData = req.body;

    // Validate book data
    const errors = Book.validate(bookData);
    if (errors.length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }

    const book = new Book(bookData);
    const db = mongodb.getDatabase();
    const result = await db.collection('books').replaceOne(
      { _id: new ObjectId(bookId) },
      book
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Book updated successfully' });
    } else {
      res.status(200).json({ message: 'No changes made to book' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update book', details: error.message });
  }
};

// Delete book
const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    
    if (!ObjectId.isValid(bookId)) {
      return res.status(400).json({ error: 'Invalid book ID format' });
    }

    const db = mongodb.getDatabase();
    const result = await db.collection('books').deleteOne({ _id: new ObjectId(bookId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete book', details: error.message });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
