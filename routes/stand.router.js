const express = require('express');
const prestataireController = require('../controller/prestataire.controller');
const prestataireMiddleware = require('../middlewares/prestataire.middleware');
const { uploadStand } = require('../middlewares/upload');
var router = express.Router();

router.post("/", uploadStand.single('image'), prestataireMiddleware.validatePrestataire, prestataireController.savePrestataire);
/**
 * @swagger
 * /api/prestataires:
 *   post:
 *     description: Used to create a new prestataire
 *     tags:
 *       - prestataires
 *     parameters:
 *       - in: body
 *         name: prestataire
 *         description: Prestataire data to create a new prestataire
 *         schema:
 *           type: object
 *           required:
 *             - nom
 *             - type
 *             - emplacement
 *             - description
 *             - compte
 *           properties:
 *             nom:
 *               type: string
 *               example: "Prestataire 1"
 *             type:
 *               type: integer
 *               example: 1
 *             emplacement:
 *               type: integer
 *               example: 2
 *             description:
 *               type: string
 *               example: "Updated description of the stand"
 *             compte:
 *               type: array
 *               items:
 *                 type: integer
 *               example: [1]
 *             image:
 *               type: string
 *               format: binary
 *     responses:
 *       '200':
 *         description: Prestataire created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 *     examples:
 *       application/json:
 *         {
 *           "nom": "Prestataire 1",
 *           "type": 1,
 *           "emplacement": 2,
 *           "description": "Updated description of the stand",
 *           "compte": [1]
 *         }
 */

router.get("/", prestataireController.getPrestataires);
/**
 * @swagger
 * /api/prestataires:
 *   get:
 *     description: Used to get all prestataires
 *     tags:
 *       - prestataires
 *     responses:
 *       '200':
 *         description: Successfully retrieved prestataires
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nom:
 *                     type: string
 *                   type:
 *                     type: integer
 *                   emplacement:
 *                     type: integer
 *                   description:
 *                     type: string
 *         examples:
 *           application/json:
 *             [
 *               {
 *                 "id": 1,
 *                 "nom": "Stand 1",
 *                 "type": 1,
 *                 "emplacement": 2,
 *                 "description": "Updated description of the stand"
 *               }
 *             ]
 *       '500':
 *         description: Internal server error
 */

router.get("/:id", prestataireController.getPrestataireById);
/**
 * @swagger
 * /api/prestataires/{id}:
 *   get:
 *     description: Used to get a prestataire by ID
 *     tags:
 *       - prestataires
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the prestataire to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successfully retrieved prestataire
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nom:
 *                   type: string
 *                 type:
 *                   type: integer
 *                 emplacement:
 *                   type: integer
 *                 description:
 *                   type: string
 *         examples:
 *           application/json:
 *             [
 *               {
 *                 "id": 1,
 *                 "nom": "Stand 1",
 *                 "type": 1,
 *                 "emplacement": 2,
 *                 "description": "Updated description of the stand"
 *               }
 *             ]
 *       '404':
 *         description: Prestataire not found
 *       '500':
 *         description: Internal server error
 */

router.put("/:id", uploadStand.single('image'), prestataireMiddleware.validatePrestataire, prestataireController.updatePrestataire);
/**
 * @swagger
 * /api/prestataires/{id}:
 *   put:
 *     description: Update a prestataire by ID
 *     tags:
 *       - prestataires
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the prestataire to update
 *         schema:
 *           type: integer
 *       - in: body
 *         name: prestataire
 *         description: Prestataire data to update
 *         schema:
 *           type: object
 *           required:
 *             - nom
 *             - type
 *             - emplacement
 *             - description
 *             - compte
 *           properties:
 *             nom:
 *               type: string
 *               example: "Prestataire 1"
 *             type:
 *               type: integer
 *               example: 1
 *             emplacement:
 *               type: integer
 *               example: 2
 *             description:
 *               type: string
 *               example: "Updated description of the stand"
 *             compte:
 *               type: array
 *               items:
 *                 type: integer
 *               example: [1]
 *             image:
 *               type: string
 *               format: binary
 *     responses:
 *       '200':
 *         description: Prestataire updated successfully
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Prestataire not found
 *       '500':
 *         description: Internal server error
 */

router.delete("/:id", prestataireMiddleware.validatePrestataire, prestataireController.deletePrestataire);
/**
 * @swagger
 * /api/prestataires/{id}:
 *   delete:
 *     description: Used to delete a prestataire by ID
 *     tags:
 *       - prestataires
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the prestataire to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Prestataire deleted successfully
 *       '404':
 *         description: Prestataire not found
 *       '500':
 *         description: Internal server error
 *     examples:
 *       application/json:
 *         {
 *           "id": 1
 *         }
 */

module.exports = router;