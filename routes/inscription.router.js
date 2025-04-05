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



/**
 * @swagger
 * /api/inscription/inscriptions/{id}:
 *   get:
 *     description: Récupère une inscription par ID de l'utilisateur
 *     tags:
 *       - inscription
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur pour lequel récupérer les inscriptions
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Inscription récupérée avec succès
 *       '404':
 *         description: Inscription non trouvée
 */
router.get('/inscriptions/:id', inscriptionController.fetchInscription);



module.exports = router;