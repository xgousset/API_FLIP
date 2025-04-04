const pool = require('../database/db');
const assert = require("node:assert");



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

const fetchNote = async (id_stand) => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM note WHERE id_stand = $1';
        const values = [id_stand];
        const result = await client.query(query, values);
        return result.rows;
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        client.release();
    }
}

const updateNote = async (ratingId, note) => {
    assert(note >= 0 && note <= 5, "La note doit être comprise entre 0 et 5");
    const client = await pool.connect();
    try {
        const query = 'UPDATE note SET note = $2 WHERE id = $1 RETURNING *';
        const values = [ratingId, note];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        client.release();
    }
}

const deleteNote = async (ratingId) => {
    const client = await pool.connect();
    try {
        const query = 'DELETE FROM note WHERE id = $1 RETURNING *';
        const values = [ratingId];
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
    addNote,
    fetchNote,
    updateNote,
    deleteNote
}