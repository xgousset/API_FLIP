const express = require('express');
const tournamentController = require('../controller/tournament.controller');
var router = express.Router();


router.get("/getAllEditions/", tournamentController.getAllEditions);
/**
 * @swagger
 * /api/editions/getAllEditions/:
 *   get:
 *     description: Utilisé pour récupérer toutes les éditions de tournoi
 *     tags:
 *       - editions
 *     responses:
 *       '200':
 *         description: Liste des éditions récupérée avec succès
 *       '500':
 *         description: Erreur interne du serveur
 */


module.exports = router;