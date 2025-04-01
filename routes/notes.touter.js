const express = require('express');
const notesController = require('../controller/notes.controller');
var router = express.Router();

router.post("/", notesController.saveNote);
/**
 * @swagger
 * /api/notes:
 *   post:
 *     description: Utilisé pour créer une nouvelle note
 *     tags:
 *       - notes
 *     parameters:
 *       - in: body
 *         name: note
 *         description: Données de la note à créer
 *         schema:
 *           type: object
 *           required:
 *             - id_utilisateur
 *             - id_article
 *             - note
 *           properties:
 *             id_utilisateur:
 *               type: integer
 *               example: 1
 *             id_article:
 *               type: integer
 *               example: 1
 *             note:
 *               type: integer
 *               example: 5
 *     responses:
 *       '200':
 *         description: Note créée avec succès
 *       '500':
 *         description: Erreur interne du serveur
 */

router.get("/specificNote/:idStand/:idUser", async (req, res) => await notesController.getNote(req, res));
/**
 * @swagger
 * /api/notes/specificNote/{idStand}/{idUser}:
 *   get:
 *     description: Utilisé pour obtenir une note spécifique d'un stand
 *     tags:
 *       - notes
 *     parameters:
 *       - in: path
 *         name: idStand
 *         required: true
 *         description: ID du stand pour lequel on veut la note
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: path
 *         name: idUser
 *         required: true
 *         description: ID de l'utilisateur pour lequel on veut la note
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: Note trouvée avec succès
 *       '404':
 *         description: Note non trouvée
 *       '500':
 *         description: Erreur interne du serveur
 */

router.get("/avg/:idStand", async (req, res) => await notesController.getAverageNote(req, res));
/**
 * @swagger
 * /api/notes/avg/{idStand}:
 *   get:
 *     description: Utilisé pour obtenir la note moyenne d'un stand
 *     tags:
 *       - notes
 *     parameters:
 *       - in: path
 *         name: idStand
 *         required: true
 *         description: ID du stand pour lequel on veut la note moyenne
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: Note moyenne trouvée avec succès
 *       '404':
 *         description: Note moyenne non trouvée
 *       '500':
 *         description: Erreur interne du serveur
 */

router.put("/", async (req, res) => await notesController.updateNote(req, res));
/**
 * @swagger
 * /api/notes:
 *   put:
 *     description: Utilisé pour mettre à jour une note
 *     tags:
 *       - notes
 *     parameters:
 *       - in: body
 *         name: note
 *         description: Données de la note à mettre à jour
 *         schema:
 *           type: object
 *           required:
 *             - id_utilisateur
 *             - id_article
 *             - note
 *           properties:
 *             id_utilisateur:
 *               type: integer
 *               example: 1
 *             id_article:
 *               type: integer
 *               example: 1
 *             note:
 *               type: integer
 *               example: 5
 *     responses:
 *       '200':
 *         description: Note mise à jour avec succès
 *       '500':
 *         description: Erreur interne du serveur
 */

router.delete("/", async (req, res) => await notesController.deleteNote(req, res));
/**
 * @swagger
 * /api/notes:
 *   delete:
 *     description: Utilisé pour supprimer une note
 *     tags:
 *       - notes
 *     parameters:
 *       - in: body
 *         name: note
 *         description: Données de la note à supprimer
 *         schema:
 *           type: object
 *           required:
 *             - id_utilisateur
 *             - id_article
 *           properties:
 *             id_utilisateur:
 *               type: integer
 *               example: 1
 *             id_article:
 *               type: integer
 *               example: 1
 *     responses:
 *       '200':
 *         description: Note supprimée avec succès
 *       '500':
 *         description: Erreur interne du serveur
 */

module.exports = router;