const express = require('express');
const commentairesController = require('../controller/commentaires.controller');
var router = express.Router();

router.post("/", commentairesController.saveComment);
/**
 * @swagger
 * /api/commentaires:
 *   post:
 *     description: Utilisé pour créer un nouveau commentaire
 *     tags:
 *       - commentaires
 *     parameters:
 *       - in: body
 *         name: commentaire
 *         description: Données du commentaire à créer
 *         schema:
 *           type: object
 *           required:
 *             - id_utilisateur
 *             - id_article
 *             - contenu
 *           properties:
 *             id_utilisateur:
 *               type: integer
 *               example: 1
 *             id_article:
 *               type: integer
 *               example: 1
 *             contenu:
 *               type: string
 *               example: "Ceci est un commentaire"
 *     responses:
 *       '200':
 *         description: Commentaire créé avec succès
 *       '500':
 *         description: Erreur interne du serveur
 */

router.delete("/:id", commentairesController.deleteComment);
/**
 * @swagger
 * /api/commentaires/{id}:
 *   delete:
 *     description: Utilisé pour supprimer un commentaire par ID
 *     tags:
 *       - commentaires
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du commentaire à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Commentaire supprimé avec succès
 *       '500':
 *         description: Erreur interne du serveur
 */

router.put("/:id", commentairesController.updateComment);
/**
 * @swagger
 * /api/commentaires/{id}:
 *   put:
 *     description: Utilisé pour mettre à jour un commentaire par ID
 *     tags:
 *       - commentaires
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du commentaire à mettre à jour
 *         schema:
 *           type: string
 *       - in: body
 *         name: commentaire
 *         description: Données du commentaire à créer
 *         schema:
 *           type: object
 *           required:
 *             - id_utilisateur
 *             - id_article
 *             - contenu
 *           properties:
 *             id_utilisateur:
 *               type: integer
 *               example: 1
 *             id_article:
 *               type: integer
 *               example: 1
 *             contenu:
 *               type: string
 *               example: "Ceci est un commentaire"
 *     responses:
 *       '200':
 *         description: Commentaire mis à jour avec succès
 *       '500':
 *         description: Erreur interne du serveur
 */

router.get("/comm/stand/:id", commentairesController.getCommentsByStand)
/**
 * @swagger
 * /api/commentaires/comm/stand/{id}:
 *   get:
 *     description: Utilisé pour obtenir les commentaires par stand
 *     tags:
 *       - commentaires
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du stand
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Commentaires récupérés avec succès
 *       '500':
 *         description: Erreur interne du serveur
 */

module.exports = router;