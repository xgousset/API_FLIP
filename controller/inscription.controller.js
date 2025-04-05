const pool = require('../database/db');

exports.inscrireUtilisateur = async (req, res) => {
    const { id_utilisateur, id_session, nomEquipe } = req.body;
    const client = await pool.connect();
    try {
        const query = 'INSERT INTO inscription (id_utilisateur, id_edition_tournoi, nomequipe) VALUES ($1, $2, $3) RETURNING *';
        const values = [id_utilisateur, id_session, nomEquipe];
        const result = await client.query(query, values);
        //ajoute 1 au nombre d'inscrits
        const query2 = 'UPDATE edition_tournoi SET current_participants = current_participants + 1 WHERE id = $1';
        const values2 = [id_session];
        await client.query(query2, values2);
        res.status(200).send(result.rows[0]);
    } catch (error) {
        console.error("Erreur d'inscription:", error);
        res.status(500).send("Erreur");
    } finally {
        client.release();
    }
};


exports.fetchInscription = async (req, res) => {
    const { id } = req.params;
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM inscription WHERE id_utilisateur = $1';
        const values = [id];
        const result = await client.query(query, values);
        res.status(200).send(result.rows);
    } catch (error) {
        console.error("Erreur de récupération des inscriptions:", error);
        res.status(500).send("Erreur");
    } finally {
        client.release();
    }
};