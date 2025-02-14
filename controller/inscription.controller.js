const pool = require('../database/db');

exports.inscrireUtilisateur = async (req, res) => {
    const { id_utilisateur, id_edition_tournoi } = req.body;
    const client = await pool.connect();
    try {
        const query = 'INSERT INTO inscription (id_utilisateur, id_edition_tournoi) VALUES ($1, $2) RETURNING *';
        const values = [id_utilisateur, id_edition_tournoi];
        const result = await client.query(query, values);
        res.status(200).send(result.rows[0]);
    } catch (error) {
        console.error("Erreur d'inscription:", error);
        res.status(500).send("Erreur");
    } finally {
        client.release();
    }
};