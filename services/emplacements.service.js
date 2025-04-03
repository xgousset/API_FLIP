const pool = require('../database/db');


const fetchEmplacements = async () => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM emplacement';
        const result = await client.query(query);
        console.log(result);
        return result.rows;
    } catch (error) {
        console.log(error);
        return [];
    } finally {
        client.release();
    }
}

const fetchSpecificEmplacement = async (id) => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM emplacement WHERE id = $1';
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

const checkAvailability = async (id) => {
    const client = await pool.connect();
    try {
        const query = 'SELECT reserve FROM emplacement WHERE id = $1';
        const values = [id];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}

const updateAvailability = async (id) => {
    const client = await pool.connect();
    try {
        const query = 'UPDATE emplacement SET reserve = NOT reserve WHERE id = $1 RETURNING *';
        const values = [id];
        const result = await client.query(query, values);
        return result.rows[0].reserve;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    fetchEmplacements,
    fetchSpecificEmplacement,
    checkAvailability,
    updateAvailability
};