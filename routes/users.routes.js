const express = require('express');
const userController = require('../controller/users.controllers');
const userMiddleware = require('../middlewares/users.middleware');
var router = express.Router();

router.post("/", userMiddleware.validateUser, userController.saveUser);
/**
 * @swagger
 * /api/users:
 *   post:
 *     description: Used to create a new user
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
 *     responses:
 *       '200':
 *         description: User created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

router.get("/", userController.getUsers);
/**
 * @swagger
 * /api/users:
 *   get:
 *     description: Used to get all users
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
 *     description: Used to get a user by ID
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

router.get("/:id", userController.checkPassword);
/**
 * @swagger
 * /api/users/{id}/check-password:
 *   get:
 *     description: Used to check the password of a user by ID
 *     tags:
 *       - users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to check password
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Password checked successfully
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */

router.get("/:id", userController.getUsersAttributes);
/**
 * @swagger
 * /api/users/{id}/attributes:
 *   get:
 *     description: Used to get attributes of a user by ID
 *     tags:
 *       - users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to get attributes
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved user attributes
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
module.exports = router;