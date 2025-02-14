const express = require('express');
const router = express.Router();
const inscriptionController = require('../controller/inscription.controller');

/**
 * @swagger
 * /inscrire:
 *   post:
 *     description: Inscrit un utilisateur à un tournoi
 *     tags:
 *       - inscription
 *     parameters:
 *       - in: body
 *         name: inscription
 *         description: inscription data to create a new inscription
 *         schema:
 *           type: object
 *           required:
 *             - id_utilisateur
 *             - id_session
 *           properties:
 *             nom:
 *               type: string
 *               example: "1"
 *             description:
 *               type: string
 *               example: "1"
 *     responses:
 *       '200':
 *         description: Inscription created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post('/inscrire', inscriptionController.inscrireUtilisateur);

module.exports = router;