const express = require('express');
const userController = require('../controller/users.controllers');
const userMiddleware = require('../middlewares/users.middleware');
var router = express.Router();

/**
 * @swagger
 * tags:
 *   name: users
 *   description: API for managing users
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     description: Create a new user
 *     tags:
 *       - users
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User data to create a new user
 *         schema:
 *           type: object
 *           required:
 *             - nom
 *             - prenom
 *             - email
 *             - motDePasse
 *             - role
 *             - identifiant
 *           properties:
 *             nom:
 *               type: string
 *               example: "John"
 *             prenom:
 *               type: string
 *               example: "Doe"
 *             email:
 *               type: string
 *               example: "u.u@u.u"
 *             motDePasse:
 *               type: string
 *               example: "password123"
 *             role:
 *               type: string
 *               example: "admin"
 *             identifiant:
 *               type: string
 *               example: "johndoe"
 *     responses:
 *       '200':
 *         description: User created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post("/", userMiddleware.validateUser, userController.saveUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     description: Retrieve all users
 *     tags:
 *       - users
 *     responses:
 *       '200':
 *         description: Successfully retrieved users
 *       '500':
 *         description: Internal server error
 */
router.get("/", userController.getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     description: Retrieve a user by ID
 *     tags:
 *       - users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved user
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.get("/:id", userController.getUserById);

/**
 * @swagger
 * /api/users/updateUser/{id}:
 *   put:
 *     description: Update a user by ID
 *     tags:
 *       - users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *       - in: body
 *         name: user
 *         description: User data to update
 *         schema:
 *           type: object
 *           required:
 *             - nom
 *             - prenom
 *             - email
 *             - motDePasse
 *             - role
 *             - identifiant
 *           properties:
 *             nom:
 *               type: string
 *               example: "John"
 *             prenom:
 *               type: string
 *               example: "Doe"
 *             email:
 *               type: string
 *               example: "u.u@u.u"
 *             motDePasse:
 *               type: string
 *               example: "password123"
 *             role:
 *               type: string
 *               example: "admin"
 *             identifiant:
 *               type: string
 *               example: "johndoe"
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.put("/updateUser/:id", userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     description: Delete a user by ID
 *     tags:
 *       - users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.delete("/:id", userController.deleteUser);

module.exports = router;