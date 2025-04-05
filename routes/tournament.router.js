const express = require('express');
const tournamentController = require('../controller/tournament.controller');
const tournamentMiddleware = require('../middlewares/tournament.middleware');
const { uploadTour } = require('../middlewares/upload');
var router = express.Router();

router.post("/", uploadTour.single('image'), tournamentMiddleware.validateTournament, tournamentController.saveTournament);
/**
 * @swagger
 * /api/tournaments:
 *   post:
 *     description: Utilisé pour créer un nouveau tournoi
 *     tags:
 *       - tournaments
 *     parameters:
 *       - in: body
 *         name: tournament
 *         description: Tournoi data to create a new tournament
 *         schema:
 *           type: object
 *           required:
 *             - id_stand
 *             - participants_min
 *             - participants_max
 *             - prix_entree
 *             - heure_debut
 *             - objet_tournoi
 *             - nom_tournoi
 *             - description_tournoi
 *           properties:
 *             id_stand:
 *               type: integer
 *               example: 1
 *             lieu:
 *               type: string
 *               example: "Lieu du tournoi"
 *             participants_min:
 *               type: integer
 *               example: 5
 *             participants_max:
 *               type: integer
 *               example: 10
 *             prix_entree:
 *               type: number
 *               format: float
 *               example: 5.99
 *             nom_tournoi:
 *               type: string
 *               example: "Nom du tournoi"
 *             description_tournoi:
 *               type: string
 *               example: "Description du tournoi"
 *             image:
 *               type: string
 *               format: binary
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

router.put("/:id", uploadTour.single('image'), tournamentMiddleware.validateTournament, tournamentController.updateTournament);
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
 *       - in: body
 *         name: tournament
 *         description: Tournoi data to create a new tournament
 *         schema:
 *           type: object
 *           required:
 *             - nom_tournoi
 *             - description_tournoi
 *             - image
 *           properties:
 *             nom_tournoi:
 *               type: string
 *               example: "Nom du tournoi"
 *             description_tournoi:
 *               type: string
 *               example: "Description du tournoi"
 *             image:
 *               type: string
 *               format: binary
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

router.get("/editions/:id", tournamentController.fetchEdition);
/**
 * @swagger
 * /api/tournaments/editions/{id}:
 *   get:
 *     description: Utilisé pour récupérer les éditions d'un tournoi par son ID
 *     tags:
 *       - tournaments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du tournoi dont on veut récupérer les éditions
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Éditions récupérées avec succès
 *       '404':
 *         description: Tournoi non trouvé
 *       '500':
 *         description: Erreur interne du serveur
 */

router.post("/editions", tournamentController.saveEdition);
/**
 * @swagger
 * /api/tournaments/editions:
 *   post:
 *     description: Utilisé pour créer une nouvelle édition de tournoi
 *     tags:
 *       - tournaments
 *     parameters:
 *       - in: body
 *         name: edition
 *         description: Édition data to create a new edition
 *         schema:
 *           type: object
 *           required:
 *             - id_tournoi
 *             - date_debut
 *             - date_fin
 *           properties:
 *             id_tournoi:
 *               type: integer
 *             date_debut:
 *               type: string
 *               format: date-time
 *             date_fin:
 *               type: string
 *               format: date-time
 *     responses:
 *       '200':
 *         description: Édition créée avec succès
 *       '400':
 *         description: Mauvaise requête
 *       '500':
 *         description: Erreur interne du serveur
 */

module.exports = router;