const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - isbn
 *         - publishedYear
 *         - genre
 *         - pages
 *         - language
 *         - publisher
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         title:
 *           type: string
 *           description: Book title
 *         author:
 *           type: string
 *           description: Author name
 *         isbn:
 *           type: string
 *           description: ISBN number
 *         publishedYear:
 *           type: integer
 *           description: Year of publication
 *         genre:
 *           type: string
 *           description: Book genre
 *         pages:
 *           type: integer
 *           description: Number of pages
 *         language:
 *           type: string
 *           description: Language of the book
 *         publisher:
 *           type: string
 *           description: Publisher name
 *         description:
 *           type: string
 *           description: Book description
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieve all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of all books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       500:
 *         description: Server error
 */
router.get('/', bookController.getAllBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.get('/:id', bookController.getBookById);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *           example:
 *             title: "The Great Gatsby"
 *             author: "F. Scott Fitzgerald"
 *             isbn: "978-0-7432-7356-5"
 *             publishedYear: 1925
 *             genre: "Fiction"
 *             pages: 180
 *             language: "English"
 *             publisher: "Scribner"
 *             description: "A classic American novel"
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post('/', bookController.createBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
 *         description: Invalid ID format or validation error
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.put('/:id', bookController.updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', bookController.deleteBook);

module.exports = router;
