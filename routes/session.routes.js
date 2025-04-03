const express = require('express');
const router = express.Router();
const pool = require('../database/db');
const bcrypt = require('bcrypt');
const {hash} = require("bcrypt");

/**
 * @swagger
 * /api/session/login:
 *   post:
 *     summary: Authentifie un utilisateur
 *     tags:
 *       - Authentification
 *     parameters:
 *       - in: body
 *         name: user
 *         description: Les informations d'authentification de l'utilisateur
 *         schema:
 *           type: object
 *           required:
 *             - identifiant
 *             - password
 *           properties:
 *             identifiant:
 *               type: string
 *               example: "johndoe"
 *               description: Le nom d'utilisateur de l'utilisateur
 *             password:
 *               type: string
 *               example: "password123"
 *               description: Le mot de passe de l'utilisateur
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       401:
 *         description: Identifiants invalides
 *       500:
 *         description: Erreur serveur interne
 */
router.post('/login', async (req, res) => {
    const { identifiant, password } = req.body;
    const client = await pool.connect();
    try {
        const findUser = 'SELECT mdp FROM utilisateur WHERE identifiant = $1';
        const result = await client.query(findUser, [identifiant]);
        if (result.rows.length === 0) {
            return res.status(401).send('Utilisateur non trouvé');
        }
        console.log(result.rows[0]);
        console.log(password);
        if (bcrypt.compare(password, result.rows[0].mdp)) {
            req.session.user = { username: identifiant };
            return res.status(200).send('Connecté');
        } else {
            return res.status(401).send('Mot de passe incorrect');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    } finally {
        client.release();
    }
});

/**
 * @swagger
 * /api/session/logout:
 *   post:
 *     summary: Déconnecte un utilisateur
 *     tags:
 *       - Authentification
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 *       500:
 *         description: Impossible de se déconnecter
 */
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Could not log out');
        }
        res.status(200).send('Logged out');
    });
});

/**
 * @swagger
 * /api/session/status:
 *   get:
 *     summary: Vérifie si un utilisateur est connecté
 *     tags:
 *       - Authentification
 *     responses:
 *       200:
 *         description: Utilisateur connecté avec succès
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       401:
 *         description: Utilisateur non connecté
 */
router.get('/status', (req, res) => {
    if (req.session.user) {
        res.status(200).send(`Logged in as ${req.session.user.username}`);
    } else {
        res.status(401).send('Not logged in');
    }
});

module.exports = router;