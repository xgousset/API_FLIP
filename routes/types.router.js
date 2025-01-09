const express = require('express');
const typesController = require('../controller/types.controller');
const typesMiddleware = require('../middlewares/types.middleware');
var router = express.Router();

router.post("/", typesMiddleware.validateType, typesController.createType);
/**
 * @swagger
 * /api/types:
 *   post:
 *     description: Used to create a new type
 *     tags:
 *       - types
 *     parameters:
 *       - in: body
 *         name: type
 *         description: Type data to create a new type
 *         schema:
 *           type: object
 *           required:
 *             - intitule
 *             - reserve
 *             - vente
 *             - anim
 *           properties:
 *             intitule:
 *               type: string
 *               example: "Type 1"
 *             reserve:
 *               type: boolean
 *               example: true
 *             vente:
 *               type: boolean
 *               example: true
 *             anim:
 *               type: boolean
 *               example: false
 *     responses:
 *       '201':
 *         description: Type created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

router.get("/", typesController.getTypes);
/**
 * @swagger
 * /api/types:
 *   get:
 *     description: Used to get all types
 *     tags:
 *       - types
 *     responses:
 *       '200':
 *         description: Successfully retrieved types
 *       '500':
 *         description: Internal server error
 */

router.get("/:id", typesController.getTypeById);
/**
 * @swagger
 * /api/types/{id}:
 *   get:
 *     description: Used to get a specific type
 *     tags:
 *       - types
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Type ID
 *         required: true
 *         type: integer
 *     responses:
 *       '200':
 *         description: Successfully retrieved type
 *       '404':
 *         description: Type not found
 *       '500':
 *         description: Internal server error
 */

router.put("/:id", typesMiddleware.validateType, typesController.updateType);
/**
 * @swagger
 * /api/types/{id}:
 *   put:
 *     description: Used to update a specific type
 *     tags:
 *       - types
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Type ID
 *         required: true
 *         type: integer
 *       - in: body
 *         name: type
 *         description: Type data to update a type
 *         schema:
 *           type: object
 *           required:
 *             - intitule
 *             - reserve
 *             - vente
 *             - anim
 *           properties:
 *             intitule:
 *               type: string
 *               example: "Type 1"
 *             reserve:
 *               type: boolean
 *               example: true
 *             vente:
 *               type: boolean
 *               example: true
 *             anim:
 *               type: boolean
 *               example: false
 *     responses:
 *       '200':
 *         description: Type updated successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

router.delete("/:id", typesController.deleteType);
/**
 * @swagger
 * /api/types/{id}:
 *   delete:
 *     description: Used to delete a specific type
 *     tags:
 *       - types
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Type ID
 *         required: true
 *         type: integer
 *     responses:
 *       '200':
 *         description: Type deleted successfully
 *       '500':
 *         description: Internal server error
 */

module.exports = router;