const express = require("express");
const gameMiddleware = require('../middlewares/game.middleware');
const gameController = require('../controller/game.controller');
const router = express.Router();

router.post("/", gameMiddleware.validateGame, gameController.createGame);
/**
 * @swagger
 * /api/games:
 *   post:
 *     description: Used to create a new game
 *     tags:
 *       - games
 *     parameters:
 *       - in: body
 *         name: game
 *         description: Game data to create a new game
 *         schema:
 *           type: object
 *           required:
 *             - nom_produit
 *             - description_produit
 *             - nbJoueursMin
 *             - nbJoueursMax
 *             - ageLimite
 *             - type
 *             - id_stand
 *           properties:
 *             name:
 *               type: string
 *               example: "Jeu 1"
 *             nbJoueursMin:
 *               type: integer
 *               example: 2
 *             nbJoueursMax:
 *               type: integer
 *               example: 6
 *             ageLimite:
 *               type: integer
 *               example: 12
 *             type:
 *               type: string
 *               example: "Stratégie"
 *             duree:
 *               type: integer
 *               example: 60
 *             id_stand:
 *               type: integer
 *               example: 1
 *     responses:
 *       '201':
 *         description: Game created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

router.get("/", gameController.getGames);
/**
 * @swagger
 * /api/games:
 *   get:
 *     description: Used to get all games
 *     tags:
 *       - games
 *     responses:
 *       '200':
 *         description: Successfully retrieved games
 *       '500':
 *         description: Internal server error
 */

router.get("/:id", gameController.getGameById);
/**
 * @swagger
 * /api/games/{id}:
 *   get:
 *     description: Used to get a specific game
 *     tags:
 *       - games
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Game ID
 *         required: true
 *         type: integer
 *     responses:
 *       '200':
 *         description: Successfully retrieved game
 *       '404':
 *         description: Game not found
 *       '500':
 *         description: Internal server error
 */

router.put("/:id", gameMiddleware.validateGame, gameController.updateGame);
/**
 * @swagger
 * /api/games/{id}:
 *   put:
 *     description: Used to update a specific game
 *     tags:
 *       - games
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Game ID
 *         required: true
 *         type: integer
 *       - in: body
 *         name: game
 *         description: Game data to update a game
 *         schema:
 *           type: object
 *           required:
 *             - nom_produit
 *             - description_produit
 *             - prix_produit
 *             - stocks
 *             - nbJoueursMin
 *             - nbJoueursMax
 *             - ageLimite
 *           properties:
 *             nom_produit:
 *               type: string
 *               example: "Jeu 1"
 *             description_produit:
 *               type: string
 *               example: "Description du jeu 1"
 *             prix_produit:
 *               type: number
 *               format: float
 *               example: 19.99
 *             stocks:
 *               type: integer
 *               example: 100
 *             nbJoueursMin:
 *               type: integer
 *               example: 2
 *             nbJoueursMax:
 *               type: integer
 *               example: 6
 *             ageLimite:
 *               type: integer
 *               example: 12
 *     responses:
 *       '200':
 *         description: Game updated successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

router.delete("/:id", gameController.deleteGame);
/**
 * @swagger
 * /api/games/{id}:
 *   delete:
 *     description: Used to delete a specific game
 *     tags:
 *       - games
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Game ID
 *         required: true
 *         type: integer
 *     responses:
 *       '200':
 *         description: Game deleted successfully
 *       '404':
 *         description: Game not found
 *       '500':
 *         description: Internal server error
 */

module.exports = router;