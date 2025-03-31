const pool = require('../database/db');


const createTournament = async (nom_stand, min, max, entree, debut, objet,nom,description,image_path, callback) => {
    const client = await pool.connect();
    const newTournament = {nom_stand, min, max, entree, debut, objet, nom, description, image_path };
    try {
        const query = 'INSERT INTO tournoi (id_stand, participants_min, participants_max, prix_entree, heure_debut, objet_tournoi,nom_tournoi,description_tournoi, image_path) VALUES ($1, $2, $3, $4, $5, $6,$7,$8, $9)';
        const values = [newTournament.nom_stand, newTournament.min, newTournament.max, newTournament.entree, newTournament.debut, newTournament.objet,newTournament.nom,newTournament.description, newTournament.image_path];
        await client.query(query, values);
        return callback(null, "écriture réussie");
    } catch (error) {
        console.log(error);
        return callback(error);
    } finally {
        client.release();
    }
};

const fetchTournaments = async () => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM tournoi';
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.log(error);
        return [];
    } finally {
        client.release();
    }
};

const fetchSpecificTournament = async (id) => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM tournoi WHERE id = $1';
        const values = [id];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        client.release();
    }
};

const deleteTournament = async (id, callback) => {
    const client = await pool.connect();
    try {
        const query = 'DELETE FROM tournoi WHERE id = $1 RETURNING *';
        const values = [id];
        const result = await client.query(query, values);
        if (result.rowCount === 0) {
            return callback("Tournoi non trouvé");
        }
        return callback(null, "suppression réussie");
    } catch (error) {
        console.log(error);
        return callback(error);
    } finally {
        client.release();
    }
};

const updateTournament = async (id, nom, description, heure_debut,image_path, callback) => {
    const client = await pool.connect();
    try {
        const query = 'UPDATE tournoi SET nom_tournoi= $2, description_tournoi = $3, heure_debut = $4, image_path = $5 WHERE id = $1 RETURNING *';
        const values = [id, nom, description, heure_debut,image_path];
        const result = await client.query(query, values);
        if (result.rowCount === 0) {
            return callback("Tournoi non trouvé");
        }
        return callback(null, "mise à jour réussie");
    } catch (error) {
        console.log(error);
        return callback(error);
    } finally {
        client.release();
    }
};

module.exports = {
    createTournament,
    fetchTournaments,
    fetchSpecificTournament,
    deleteTournament,
    updateTournament
};