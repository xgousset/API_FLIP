const express = require('express');
const prestataireController = require('../controller/prestataire.controller');
const prestataireMiddleware = require('../middlewares/prestataire.middleware');
var router = express.Router();

router.post("/", prestataireMiddleware.validatePrestataire, prestataireController.savePrestataire);
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
 *             - description
 *             - adresse
 *             - telephone
 *     responses:
 *       '200':
 *         description: Prestataire created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
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
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved prestataire
 *       '404':
 *         description: Prestataire not found
 *       '500':
 *         description: Internal server error
 */

router.put("/:id", prestataireMiddleware.validatePrestataire, prestataireController.updatePrestataire);
/**
 * @swagger
 * /api/prestataires/{id}:
 *   put:
 *     description: Used to update a prestataire by ID
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
 *         schema:
 *           type: object
 *           required:
 *             - nom
 *             - description
 *             - adresse
 *             - telephone
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
 *           type: string
 *     responses:
 *       '200':
 *         description: Prestataire deleted successfully
 *       '404':
 *         description: Prestataire not found
 *       '500':
 *         description: Internal server error
 */
module.exports = router;