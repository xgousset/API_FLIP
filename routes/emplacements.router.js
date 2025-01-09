const express = require('express');
const emplacementController = require('../controller/emplacements.controller');

var router = express.Router();

router.get("/", emplacementController.getEmplacements);
/**
 * @swagger
 * /api/emplacements:
 *   get:
 *     description: Used to get all emplacements
 *     tags:
 *       - emplacements
 *     responses:
 *       '200':
 *         description: Successfully retrieved emplacements
 *       '500':
 *         description: Internal server error
 */

router.get("/:id", emplacementController.getEmplacementById);
/**
 * @swagger
 * /api/emplacements/{id}:
 *   get:
 *     description: Used to get an emplacement by ID
 *     tags:
 *       - emplacements
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the emplacement to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved emplacement
 *       '404':
 *         description: Emplacement not found
 *       '500':
 *         description: Internal server error
 */

router.get("/:id/disponibilite", emplacementController.checkAvailability);
/**
 * @swagger
 * /api/emplacements/{id}/disponibilite:
 *   get:
 *     description: Used to get the availability of an emplacement by ID
 *     tags:
 *       - emplacements
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the emplacement to check
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved availability
 *       '500':
 *         description: Internal server error
 */

router.put("/:id/disponibilite", emplacementController.updateAvailability);
/**
 * @swagger
 * /api/emplacements/{id}/disponibilite:
 *   put:
 *     description: Used to update the availability of an emplacement by ID
 *     tags:
 *       - emplacements
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the emplacement to update
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully updated availability
 *       '500':
 *         description: Internal server error
 */

module.exports = router;