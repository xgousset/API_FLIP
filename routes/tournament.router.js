const expresss = require('express');
const tournamentController = require('../controller/tournament.controller');
const tournamentMiddleware = require('../middlewares/tournament.middleware');
var router = expresss.Router();

router.post("/", tournamentMiddleware.validateTournament, tournamentController.saveTournament);
/**
 * @swagger
 * /api/tournaments:
 *   post:
 *     description: Used to create a new tournament
 *     tags:
 *       - tournaments
 *     parameters:
 *       - in: body
 *         name: tournament
 *         description: Tournament data to create a new tournament
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - date
 *             - location
 *     responses:
 *       '200':
 *         description: Tournament created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

router.get("/", tournamentController.getTournaments);
/**
 * @swagger
 * /api/tournaments:
 *   get:
 *     description: Used to get all tournaments
 *     tags:
 *       - tournaments
 *     responses:
 *       '200':
 *         description: Successfully retrieved tournaments
 *       '500':
 *         description: Internal server error
 */

router.get("/:id", tournamentController.getTournamentById);
/**
 * @swagger
 * /api/tournaments/{id}:
 *   get:
 *     description: Used to get a tournament by ID
 *     tags:
 *       - tournaments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the tournament to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved tournament
 *       '404':
 *         description: Tournament not found
 *       '500':
 *         description: Internal server error
 */

router.put("/:id", tournamentMiddleware.validateTournament, tournamentController.updateTournament);
/**
 * @swagger
 * /api/tournaments/{id}:
 *   put:
 *     description: Used to update a tournament by ID
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
 *         description: Tournament data to update
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - date
 *             - location
 *     responses:
 *       '200':
 *         description: Tournament updated successfully
 *       '400':
 *         description: Bad request
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
 *     description: Used to delete a tournament by ID
 *     tags:
 *       - tournaments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the tournament to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Tournament deleted successfully
 *       '404':
 *         description: Tournament not found
 *       '500':
 *         description: Internal server error
 */
module.exports = router;