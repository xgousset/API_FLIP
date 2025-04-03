const express = require('express');
const tournamentController = require('../controller/tournament.controller');
const tournamentMiddleware = require('../middlewares/tournament.middleware');
const { uploadTour} = require('../middlewares/upload');
var router = express.Router();

router.post("/", uploadTour.single('image') ,  tournamentMiddleware.validateTournament, tournamentController.saveTournament);
/**
 * @swagger
 * /api/tournaments:
 *   post:
 *     description: Utilisé pour créer un nouveau tournoi
 *     tags:
 *       - tournaments
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - id_stand
 *               - participants_min
 *               - participants_max
 *               - prix_entree
 *               - heure_debut
 *               - objet_tournoi
 *               - nom_tournoi
 *               - description_tournoi
 *             properties:
 *               id_stand:
 *                 type: integer
 *               participants_min:
 *                 type: integer
 *               participants_max:
 *                 type: integer
 *               prix_entree:
 *                 type: number
 *                 format: float
 *               heure_debut:
 *                 type: string
 *                 format: date-time
 *               objet_tournoi:
 *                 type: string
 *               nom_tournoi:
 *                 type: string
 *               description_tournoi:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Tournoi créé avec succès
 *       '400':
 *         description: Mauvaise requête
 *       '500':
 *         description: Erreur interne du serveur
 */

router.get("/", tournamentController.getTournaments);
/**
 * @swagger
 * /api/tournaments:
 *   get:
 *     description: Utilisé pour récupérer tous les tournois
 *     tags:
 *       - tournaments
 *     responses:
 *       '200':
 *         description: Liste des tournois récupérée avec succès
 *       '500':
 *         description: Erreur interne du serveur
 */

router.get("/:id", tournamentController.getTournamentById);
/**
 * @swagger
 * /api/tournaments/{id}:
 *   get:
 *     description: Utilisé pour récupérer un tournoi par son ID
 *     tags:
 *       - tournaments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du tournoi à récupérer
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Détails du tournoi récupérés avec succès
 *       '404':
 *         description: Tournoi non trouvé
 *       '500':
 *         description: Erreur interne du serveur
 */

router.put("/:id",uploadTour.single('image'), tournamentMiddleware.validateTournament, tournamentController.updateTournament);
/**
 * @swagger
 * /api/tournaments/{id}:
 *   put:
 *     description: Update a tournament by ID
 *     tags:
 *       - tournaments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the tournament to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_stand
 *               - participants_min
 *               - participants_max
 *               - prix_entree
 *               - heure_debut
 *               - objet_tournoi
 *               - nom_tournoi
 *               - description_tournoi
 *             properties:
 *               id_stand:
 *                 type: integer
 *               participants_min:
 *                 type: integer
 *               participants_max:
 *                 type: integer
 *               prix_entree:
 *                 type: number
 *                 format: float
 *               heure_debut:
 *                 type: string
 *                 format: date-time
 *               objet_tournoi:
 *                 type: string
 *               nom_tournoi:
 *                 type: string
 *               description_tournoi:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Tournament updated successfully
 *       '404':
 *         description: Tournament not found
 *       '500':
 *         description: Internal server error
 */

router.delete("/:id", tournamentController.deleteTournament);
/**
 * @swagger
 * /api/tournaments/{id}:
 *   delete:
 *     description: Utilisé pour supprimer un tournoi par son ID
 *     tags:
 *       - tournaments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du tournoi à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Tournoi supprimé avec succès
 *       '404':
 *         description: Tournoi non trouvé
 *       '500':
 *         description: Erreur interne du serveur
 */

module.exports = router;
