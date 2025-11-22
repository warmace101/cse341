const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - birthYear
 *         - country
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         firstName:
 *           type: string
 *           description: Author's first name
 *         lastName:
 *           type: string
 *           description: Author's last name
 *         birthYear:
 *           type: integer
 *           description: Year of birth
 *         country:
 *           type: string
 *           description: Country of origin
 *         biography:
 *           type: string
 *           description: Author biography
 */

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Retrieve all authors
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: List of all authors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 *       500:
 *         description: Server error
 */
router.get('/', authorController.getAllAuthors);

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get an author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Author ID
 *     responses:
 *       200:
 *         description: Author details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 */
router.get('/:id', authorController.getAuthorById);

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *           example:
 *             firstName: "Jane"
 *             lastName: "Austen"
 *             birthYear: 1775
 *             country: "England"
 *             biography: "English novelist known for romantic fiction"
 *     responses:
 *       201:
 *         description: Author created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post('/', authorController.createAuthor);

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Update an author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Author ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       400:
 *         description: Invalid ID format or validation error
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 */
router.put('/:id', authorController.updateAuthor);

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Author ID
 *     responses:
 *       200:
 *         description: Author deleted successfully
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', authorController.deleteAuthor);

module.exports = router;
