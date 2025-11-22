const { ObjectId } = require('mongodb');

class Book {
  constructor(book) {
    this.title = book.title;
    this.author = book.author;
    this.isbn = book.isbn;
    this.publishedYear = book.publishedYear;
    this.genre = book.genre;
    this.pages = book.pages;
    this.language = book.language;
    this.publisher = book.publisher;
    this.description = book.description;
  }

  static validate(book) {
    const errors = [];

    if (!book.title || typeof book.title !== 'string' || book.title.trim().length === 0) {
      errors.push('Title is required and must be a non-empty string');
    }

    if (!book.author || typeof book.author !== 'string' || book.author.trim().length === 0) {
      errors.push('Author is required and must be a non-empty string');
    }

    if (!book.isbn || typeof book.isbn !== 'string' || book.isbn.trim().length === 0) {
      errors.push('ISBN is required and must be a non-empty string');
    }

    if (!book.publishedYear || !Number.isInteger(book.publishedYear) || book.publishedYear < 1000 || book.publishedYear > new Date().getFullYear()) {
      errors.push('Published year must be a valid year');
    }

    if (!book.genre || typeof book.genre !== 'string' || book.genre.trim().length === 0) {
      errors.push('Genre is required and must be a non-empty string');
    }

    if (!book.pages || !Number.isInteger(book.pages) || book.pages <= 0) {
      errors.push('Pages must be a positive integer');
    }

    if (!book.language || typeof book.language !== 'string' || book.language.trim().length === 0) {
      errors.push('Language is required and must be a non-empty string');
    }

    if (!book.publisher || typeof book.publisher !== 'string' || book.publisher.trim().length === 0) {
      errors.push('Publisher is required and must be a non-empty string');
    }

    return errors;
  }
}

module.exports = Book;
