const express = require('express');
const router = express.Router();
const pool = require('../database/db');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM utilisateur WHERE nom = $1 AND mdp = $2';
        const values = [username, password];
        const result = await client.query(query, values);
        if (result.rows.length > 0) {
            req.session.user = { username };
            res.status(200).send('Logged in');
        } else {
            res.status(401).send('Invalid credentials');
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
 * /login:
 *   post:
 *     summary: Authentifie un utilisateur
 *     tags:
 *       - Authentification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Le nom d'utilisateur de l'utilisateur
 *               password:
 *                 type: string
 *                 description: Le mot de passe de l'utilisateur
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       401:
 *         description: Identifiants invalides
 *       500:
 *         description: Erreur serveur interne
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
 * /logout:
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

router.get('/status', (req, res) => {
    if (req.session.user) {
        res.status(200).send(`Logged in as ${req.session.user.username}`);
    } else {
        res.status(401).send('Not logged in');
    }
});

/**
 * @swagger
 * /status:
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

module.exports = router;
