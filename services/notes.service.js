const pool = require('../database/db');
const assert = require("node:assert");


const fetchAverageNote = async (id) => {
    const client = await pool.connect();
    try {
        const query = 'SELECT AVG(note) FROM note WHERE id_stand = $1';
        const values = [id];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        client.release();
    }
}

const addNote = async (id_stand, id_utilisateur, note) => {
    assert(note >= 0 && note <= 5, "La note doit être comprise entre 0 et 5");
    const client = await pool.connect();
    try {
        const query = 'INSERT INTO note (id_stand, id_utilisateur, note) VALUES ($1, $2, $3) RETURNING *';
        const values = [id_stand, id_utilisateur, note];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        client.release();
    }
}

const fetchNote = async (id_stand, id_utilisateur) => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM note WHERE id_stand = $1 AND id_utilisateur = $2';
        const values = [id_stand, id_utilisateur];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        client.release();
    }
}

const updateNote = async (id_stand, id_utilisateur, note) => {
    assert(note >= 0 && note <= 5, "La note doit être comprise entre 0 et 5");
    const client = await pool.connect();
    try {
        const query = 'UPDATE note SET note = $3 WHERE id_stand = $1 AND id_utilisateur = $2 RETURNING *';
        const values = [id_stand, id_utilisateur, note];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        client.release();
    }
}

const deleteNote = async (id_stand, id_utilisateur) => {
    const client = await pool.connect();
    try {
        const query = 'DELETE FROM note WHERE id_stand = $1 AND id_utilisateur = $2 RETURNING *';
        const values = [id_stand, id_utilisateur];
        const result = await client.query(query, values);
        if (result.rowCount === 0) {
            return "Note non trouvée";
        }
        return "suppression réussie";
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        client.release();
    }
}

module.exports = {
    fetchAverageNote,
    addNote,
    fetchNote,
    updateNote,
    deleteNote
}