const express = require('express');
const tournamentController = require('../controller/tournament.controller');
const tournamentMiddleware = require('../middlewares/tournament.middleware');
var router = express.Router();

router.post("/", tournamentMiddleware.validateTournament, tournamentController.saveTournament);
/**
 * @swagger
 * /api/tournaments:
 *   post:
 *     description: Utilisé pour créer un nouveau tournoi
 *     tags:
 *       - tournaments
 *     parameters:
 *     - in: body
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
 *                 example: 1
 *               participants_min:
 *                 type: integer
 *                 example: 4
 *               participants_max:
 *                 type: integer
 *                 example: 16
 *               prix_entree:
 *                 type: number
 *                 format: float
 *                 example: 10.50
 *               heure_debut:
 *                 type: string
 *                 format: time
 *                 example: "14:00:00"
 *               objet_tournoi:
 *                 type: string
 *                 example: "Jeu de cartes"
 *               nom_tournoi:
 *                 type: string
 *                 example: "Tournoi d'été"
 *               description_tournoi:
 *                 type: string
 *                 example: "Tournoi annuel pour les amateurs de cartes."
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

router.put("/:id", tournamentMiddleware.validateTournament, tournamentController.updateTournament);
/**
 * @swagger
 * /api/tournaments/{id}:
 *   put:
 *     description: Utilisé pour mettre à jour un tournoi par son ID
 *     tags:
 *       - tournaments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du tournoi à mettre à jour
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
 *                 format: time
 *               objet_tournoi:
 *                 type: string
 *               nom_tournoi:
 *                 type: string
 *               description_tournoi:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Tournoi mis à jour avec succès
 *       '400':
 *         description: Mauvaise requête
 *       '404':
 *         description: Tournoi non trouvé
 *       '500':
 *         description: Erreur interne du serveur
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
