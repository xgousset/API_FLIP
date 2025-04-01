const pool = require('../database/db');

const createComment = async (id_stand, id_utilisateur, contenu) => {
    const client = await pool.connect();
    try {
        const query = 'INSERT INTO commentaires (id_stand, id_utilisateur, commentaire) VALUES ($1, $2, $3) RETURNING *';
        const values = [id_stand, id_utilisateur, contenu];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        client.release();
    }
}

const fetchComments = async () => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM commentaires';
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.log(error);
        return [];
    } finally {
        client.release();
    }
}

const fetchSpecificComment = async (id) => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM commentaires WHERE id = $1';
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

const deleteComment = async (id) => {
    const client = await pool.connect();
    try {
        const query = 'DELETE FROM commentaires WHERE id = $1 RETURNING *';
        const values = [id];
        const result = await client.query(query, values);
        if (result.rowCount === 0) {
            return "Commentaire non trouvé";
        }
        return "suppression réussie";
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        client.release();
    }
}

const updateComment = async (id, contenu) => {
    const client = await pool.connect();
    try {
        const query = 'UPDATE commentaires SET commentaire = $2 WHERE id = $1 RETURNING *';
        const values = [id, contenu];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        client.release();
    }
}

const fetchCommentsByStand = async (id_stand) => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM commentaires WHERE id_stand = $1';
        const values = [id_stand];
        const result = await client.query(query, values);
        return result.rows;
    } catch (error) {
        console.log(error);
        return [];
    } finally {
        client.release();
    }
}

const fetchCommentsByUser = async (id_utilisateur) => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM commentaires WHERE id_utilisateur = $1';
        const values = [id_utilisateur];
        const result = await client.query(query, values);
        return result.rows;
    } catch (error) {
        console.log(error);
        return [];
    } finally {
        client.release();
    }
}

module.exports = { createComment, fetchComments, fetchSpecificComment, deleteComment, updateComment, fetchCommentsByStand, fetchCommentsByUser };