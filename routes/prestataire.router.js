const express = require('express');
const prestataireController = require('../controller/prestataire.controller');
const prestataireMiddleware = require('../middlewares/prestataire.middleware');
const { uploadStand } = require('../middlewares/upload');
var router = express.Router();

router.post("/", uploadStand.single('image') , prestataireMiddleware.validatePrestataire, prestataireController.savePrestataire);
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
 *           properties:
 *             nom:
 *               type: string
 *               example: "Prestataire 1"
 *             type:
 *               type: integer
 *               example: 1
 *             emplacement:
 *               type: integer
 *               example: 1
 *             description:
 *               type: string
 *               example: "Description du stand 1"
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
 *           "emplacement": 1,
 *           "description": "Description du stand 1"
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
 *                   nom_stand:
 *                     type: string
 *                   id_type:
 *                     type: integer
 *                   id_emplacement:
 *                     type: integer
 *                   description:
 *                     type: string
 *         examples:
 *           application/json:
 *             [
 *               {
 *                 "id": 1,
 *                 "nom_stand": "Stand 1",
 *                 "id_type": 1,
 *                 "id_emplacement": 1,
 *                 "description": "Description du stand 1"
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
 *                 nom_stand:
 *                   type: string
 *                 id_type:
 *                   type: integer
 *                 id_emplacement:
 *                   type: integer
 *                 description:
 *                   type: string
 *         examples:
 *           application/json:
 *             [
 *               {
 *                 "id": 1,
 *                 "nom_stand": "Stand 1",
 *                 "id_type": 1,
 *                 "id_emplacement": 1,
 *                 "description": "Description du stand 1"
 *               }
 *             ]
 *       '404':
 *         description: Prestataire not found
 *       '500':
 *         description: Internal server error
 */

router.put("/:id",uploadStand.single('image') , prestataireMiddleware.validatePrestataire, prestataireController.updatePrestataire);
/**
 * @swagger
 * /api/prestataires/{id}:
 *   put:
 *     description: Updates a prestataire by ID
 *     tags:
 *       - prestataires
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the prestataire to update
 *         schema:
 *           type: string
 *       - in: body
 *         name: prestataire
 *         description: Prestataire data to update
 *         required: true
 *         content:
 *           application/json:
 *             properties:
 *             nom:
 *               type: string
 *               example: "Prestataire 1"
 *             type:
 *               type: integer
 *               example: 1
 *             emplacement:
 *               type: integer
 *               example: 1
 *             description:
 *               type: string
 *               example: "Description du stand 1"
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

router.delete("/:id", prestataireController.deletePrestataire);
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