const pool = require('../database/db');


const createType = async (intitule,reserve,vente,anim) => {
    const client = await pool.connect();
    try {
        const query = 'INSERT INTO types_stand (intitule,peutReserver,peutvendre,peutanimer) VALUES ($1,$2,$3,$4) RETURNING *';
        const values = [intitule,reserve,vente,anim];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        client.release();
    }
}


const fetchTypes = async () => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM types_stand';
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.log(error);
        return [];
    } finally {
        client.release();
    }
}


const fetchSpecificType = async (id) => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM types_stand WHERE id = $1';
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


const updateType = async (id,intitule,reserve,vente,anim) => {
    const client = await pool.connect();
    try {
        const query = 'UPDATE types_stand SET intitule = $2, peutReserver = $3, peutvendre = $4, peutanimer = $5 WHERE id = $1 RETURNING *';
        const values = [id,intitule,reserve,vente,anim];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        client.release();
    }
}


const deleteType = async (id) => {
    const client = await pool.connect();
    try {
        const query = 'DELETE FROM types_stand WHERE id = $1';
        const values = [id];
        await client.query(query, values);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    } finally {
        client.release();
    }
}


module.exports = {
    createType,
    fetchTypes,
    fetchSpecificType,
    updateType,
    deleteType
};