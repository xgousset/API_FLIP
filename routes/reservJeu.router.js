const express = require('express');
const reservJeuController = require('../controller/reservJeu.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: reservJeu
 *   description: API for managing game reservations
 */

/**
 * @swagger
 * /reservations:
 *   post:
 *     tags: [reservJeu]
 *     summary: Create a new reservation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idJeu:
 *                 type: integer
 *                 example: 1
 *               idUtilisateur:
 *                 type: integer
 *                 example: 1
 *               dateDebut:
 *                 type: string
 *                 format: date-time
 *                 example: '2023-01-01T10:00:00Z'
 *     responses:
 *       200:
 *         description: Reservation created successfully
 *       500:
 *         description: Error creating reservation
 */
router.post('/reservations', reservJeuController.saveReservation);

/**
 * @swagger
 * /reservations/{id}:
 *   delete:
 *     tags: [reservJeu]
 *     summary: Delete a reservation
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Reservation ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Reservation deleted successfully
 *       500:
 *         description: Error deleting reservation
 */
router.delete('/reservations/:id', reservJeuController.deleteReservation);

/**
 * @swagger
 * /reservations/jeu/{id}:
 *   get:
 *     tags: [reservJeu]
 *     summary: Get all reservations for a specific game
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Game ID
 *         example: 1
 *     responses:
 *       200:
 *         description: List of reservations
 *       500:
 *         description: Error fetching reservations
 */
router.get('/reservations/jeu/:id', reservJeuController.getReservationsJeu);

/**
 * @swagger
 * /reservations/user/{id}:
 *   get:
 *     tags: [reservJeu]
 *     summary: Get all reservations for a specific user
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *         example: 1
 *     responses:
 *       200:
 *         description: List of reservations
 *       500:
 *         description: Error fetching reservations
 */
router.get('/reservations/user/:id', reservJeuController.getReservationsByUser);

module.exports = router;