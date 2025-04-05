const pool = require('../database/db');

const createTournament = async (id_stand, lieu, participants_max, prix_entree,  nom_tournoi, description_tournoi, image_path, callback) => {
    const client = await pool.connect();
    try {
        const query = `
            INSERT INTO tournoi (id_stand,lieu,  participants_max, prix_entree, nom_tournoi, description_tournoi, image_path)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        const values = [id_stand, lieu, participants_max, prix_entree,  nom_tournoi, description_tournoi, image_path];
        await client.query(query, values);
        return callback(null, "écriture réussie");
    } catch (error) {
        console.log(error);
        return callback(error);
    } finally {
        client.release();
    }
};

const addEdition = async (id_tournoi, capacite, date_edition, callback) => {
    const client = await pool.connect();
    try {
        const query = 'INSERT INTO edition_tournoi (id_tournoi, capacitee, date_edition) VALUES ($1, $2, $3)';
        const values = [id_tournoi, capacite, date_edition];
        await client.query(query, values);
        return callback(null, "écriture réussie");
    }
    catch (error) {
        console.log(error);
        return callback(error);
    } finally {
        client.release();
    }
}

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

const updateTournament = async (id, nom, description,  image_path, callback) => {
    const client = await pool.connect();
    try {
        const query = 'UPDATE tournoi SET nom_tournoi= $2, description_tournoi = $3,  image_path = $4 WHERE id = $1 RETURNING *';
        const values = [id, nom, description,  image_path];
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

const fetchEditions = async (id_tournoi) => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM edition_tournoi WHERE id_tournoi = $1';
        const values = [id_tournoi];
        const result = await client.query(query, values);
        return result.rows;
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        client.release();
    }
}

const createEdition = async (id_tournoi, capacitee, date_edition) => {
    const client = await pool.connect();
    try {
        const query = 'INSERT INTO edition_tournoi (id_tournoi, capacitee, date_edition) VALUES ($1, $2, $3)';
        const values = [id_tournoi, capacitee, date_edition];
        await client.query(query, values);
        return "écriture réussie";
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        client.release();
    }
};

module.exports = {
    createTournament,
    fetchTournaments,
    fetchSpecificTournament,
    deleteTournament,
    updateTournament,
    addEdition,
    fetchEditions,
    createEdition
};