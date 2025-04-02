const pool = require('../database/db');
const { v4: uuidv4 } = require('uuid');

// Create a new prestataire with a name, type, and emplacement
const createPrestataire = async (nom, type, emplacement, comptes, image_path) => {
    const client = await pool.connect();
    try {
        const query = 'INSERT INTO stand (nom_stand, id_type, id_emplacement,comptes, image_path) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [nom, type, emplacement,comptes, image_path];
        //met à jour l'emplacement pour le rendre occupé
        const queryEmplacement = 'UPDATE emplacement SET reserve = true WHERE id = $1';
        const valuesEmplacement = [emplacement];
        await client.query(queryEmplacement, valuesEmplacement);
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
        // met l'emplacement occupé par le stand à libre
        const queryEmplacement = 'UPDATE emplacement SET reserve = false WHERE id = (SELECT id_emplacement FROM stand WHERE id = $1)';
        const query = 'DELETE FROM stand WHERE id = $1 RETURNING *';
        const values = [id];
        await client.query(queryEmplacement, values);
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
const updatePrestataire = async (id, nom, type, emplacement,comptes, image_path) => {
    const client = await pool.connect();
    try {
        const query = 'UPDATE stand SET nom_stand = $1, id_type = $2, id_emplacement = $3, comptes = $4, image_path = $5 WHERE id = $6 RETURNING *';
        const values = [nom, type, emplacement,comptes, image_path, id];
        //si l'emplacement est modifié, on met à jour les emplacements
        if (emplacement !== null) {
            const queryEmplacement = 'UPDATE emplacement SET reserve = false WHERE id = (SELECT id_emplacement FROM stand WHERE id = $1)';
            const valuesEmplacement = [id];
            await client.query(queryEmplacement, valuesEmplacement);
            const queryEmplacement2 = 'UPDATE emplacement SET reserve = true WHERE id = $1';
            const valuesEmplacement2 = [emplacement];
            await client.query(queryEmplacement2, valuesEmplacement2);
        }
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