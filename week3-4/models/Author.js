const { ObjectId } = require('mongodb');

class Author {
  constructor(author) {
    this.firstName = author.firstName;
    this.lastName = author.lastName;
    this.birthYear = author.birthYear;
    this.country = author.country;
    this.biography = author.biography;
  }

  static validate(author) {
    const errors = [];

    if (!author.firstName || typeof author.firstName !== 'string' || author.firstName.trim().length === 0) {
      errors.push('First name is required and must be a non-empty string');
    }

    if (!author.lastName || typeof author.lastName !== 'string' || author.lastName.trim().length === 0) {
      errors.push('Last name is required and must be a non-empty string');
    }

    if (!author.birthYear || !Number.isInteger(author.birthYear) || author.birthYear < 1000 || author.birthYear > new Date().getFullYear()) {
      errors.push('Birth year must be a valid year');
    }

    if (!author.country || typeof author.country !== 'string' || author.country.trim().length === 0) {
      errors.push('Country is required and must be a non-empty string');
    }

    return errors;
  }
}

module.exports = Author;
