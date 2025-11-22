const mongodb = require('../config/database');
const { ObjectId } = require('mongodb');
const Author = require('../models/Author');

// Get all authors
const getAllAuthors = async (req, res) => {
  try {
    const db = mongodb.getDatabase();
    const authors = await db.collection('authors').find().toArray();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve authors', details: error.message });
  }
};

// Get single author by ID
const getAuthorById = async (req, res) => {
  try {
    const authorId = req.params.id;
    
    if (!ObjectId.isValid(authorId)) {
      return res.status(400).json({ error: 'Invalid author ID format' });
    }

    const db = mongodb.getDatabase();
    const author = await db.collection('authors').findOne({ _id: new ObjectId(authorId) });

    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }

    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve author', details: error.message });
  }
};

// Create new author
const createAuthor = async (req, res) => {
  try {
    const authorData = req.body;

    // Validate author data
    const errors = Author.validate(authorData);
    if (errors.length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }

    const author = new Author(authorData);
    const db = mongodb.getDatabase();
    const result = await db.collection('authors').insertOne(author);

    if (result.acknowledged) {
      res.status(201).json({ 
        message: 'Author created successfully', 
        authorId: result.insertedId 
      });
    } else {
      res.status(500).json({ error: 'Failed to create author' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to create author', details: error.message });
  }
};

// Update author
const updateAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;
    
    if (!ObjectId.isValid(authorId)) {
      return res.status(400).json({ error: 'Invalid author ID format' });
    }

    const authorData = req.body;

    // Validate author data
    const errors = Author.validate(authorData);
    if (errors.length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }

    const author = new Author(authorData);
    const db = mongodb.getDatabase();
    const result = await db.collection('authors').replaceOne(
      { _id: new ObjectId(authorId) },
      author
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Author not found' });
    }

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Author updated successfully' });
    } else {
      res.status(200).json({ message: 'No changes made to author' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update author', details: error.message });
  }
};

// Delete author
const deleteAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;
    
    if (!ObjectId.isValid(authorId)) {
      return res.status(400).json({ error: 'Invalid author ID format' });
    }

    const db = mongodb.getDatabase();
    const result = await db.collection('authors').deleteOne({ _id: new ObjectId(authorId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Author not found' });
    }

    res.status(200).json({ message: 'Author deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete author', details: error.message });
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
