const express = require('express');
const userController = require('../controller/users.controllers');
const userMiddleware = require('../middlewares/users.middleware');
var router = express.Router();

router.post("/", userMiddleware.validateUser, userController.saveUser);
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
 *             - password
 *             - autorisation
 *           properties:
 *             nom:
 *               type: string
 *               example: "Doe"
 *             prenom:
 *               type: string
 *               example: "John"
 *             email:
 *               type: string
 *               example: "JohnDoe@example.com"
 *             password:
 *               type: string
 *               example: "password"
 *             autorisation:
 *               type: integer
 *               example: 0
 *     responses:
 *       '200':
 *         description: User created successfully
 *       '500':
 *         description: Internal server error
 */

router.get("/", userController.getUsers);
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

router.get("/:id", userController.getUserById);
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

router.get("/:id/check-password", userController.checkPassword);
/**
 * @swagger
 * /api/users/{id}/check-password:
 *   get:
 *     description: Check the password of a user by ID
 *     tags:
 *       - users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to check password
 *         schema:
 *           type: string
 *       - in: body
 *         name: password
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             password:
 *               type: string
 *               example: "password"
 *     responses:
 *       '200':
 *         description: Password checked successfully
 *       '401':
 *         description: Incorrect password
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */

router.put("/updateUser/:id", userController.updateUser);
/**
 * @swagger
 * /api/users/{id}:
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - prenom
 *               - email
 *               - password
 *               - autorisation
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               autorisation:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '500':
 *         description: Internal server error
 */

router.delete("/:id", userController.deleteUser);
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
 *       '500':
 *         description: Internal server error
 */

module.exports = router;
