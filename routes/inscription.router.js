const express = require('express');
const router = express.Router();
const inscriptionController = require('../controller/inscription.controller');

/**
 * @swagger
 * /api/inscription/inscrire:
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
 *             - nomEquipe
 *           properties:
 *             id_utilisateur:
 *               type: integer
 *               example: 1
 *             id_session:
 *               type: integer
 *               example: 1
 *             nomEquipe:
 *               type: string
 *               example: "Team A"
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