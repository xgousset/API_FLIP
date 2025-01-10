const pool = require('../database/db');

exports.validateTournament = async (req, res, next) => {
    const { nom, description, capacitee } = req.body;

    if (!nom || !description) {
        return res.status(400).send("Nom et description sont obligatoires");
    }

    if (capacitee < 4) {
        return res.status(400).send("Capacitee doit etre superieur a 4");
    }

    try {
        const client = await pool.connect();
        const query = 'SELECT COUNT(*) FROM tournoi WHERE nom_tournoi = $1';
        const values = [nom];
        const result = await client.query(query, values);

        if (parseInt(result.rows[0].count) > 0) {
            return res.status(400).send("Un tournoi avec ce nom existe déjà");
        }

        client.release();
    } catch (error) {
        console.log(error);
        return res.status(500).send("Erreur de serveur");
    }

    next();
};