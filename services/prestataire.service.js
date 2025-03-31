const pool = require('../database/db');
const { v4: uuidv4 } = require('uuid');

// Create a new prestataire with a name, type, and emplacement
const createPrestataire = async (nom, type, emplacement, description, image_path) => {
    const client = await pool.connect();
    try {
        console.log(nom, type, emplacement,description);
        const query = 'INSERT INTO stand (nom_stand, id_type, id_emplacement,description, image_path) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [nom, type, emplacement,description, image_path];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        client.release();
    }
};

// Fetch all prestataires
const fetchPrestataires = async () => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM stand';
        const result = await client.query(query);
        console.log(result.rows);
        return result.rows;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        client.release();
    }
};

// Fetch a specific prestataire by its id
const fetchSpecificPrestataire = async (id) => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM stand WHERE id = $1';
        const values = [id];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        client.release();
    }
};

// Delete a specific prestataire by its id
const deletePrestataire = async (id) => {
    const client = await pool.connect();
    try {
        const query = 'DELETE FROM stand WHERE id = $1 RETURNING *';
        const values = [id];
        const result = await client.query(query, values);
        if (result.rows === []) {
            return "Prestataire non trouvé";
        }
        return "suppression réussie";
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        client.release();
    }
};

// Update a specific prestataire by its id
const updatePrestataire = async (id, nom, type, emplacement,description, image_path) => {
    const client = await pool.connect();
    try {
        const query = 'UPDATE stand SET nom_stand = $1, id_type = $2, id_emplacement = $3, description = $4, image_path = $5 WHERE id = $6 RETURNING *';
        const values = [nom, type, emplacement,description, image_path, id];
        const result = await client.query(query, values);
        if (result.rowCount === 0) {
            return "Prestataire non trouvé";
        }
        return result.rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        client.release();
    }
};

module.exports = {
    createPrestataire,
    fetchPrestataires,
    fetchSpecificPrestataire,
    deletePrestataire,
    updatePrestataire
};