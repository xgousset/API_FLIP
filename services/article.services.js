const pool = require('../database/db');

// Create a new article with a name, description, stocks, price, and image path
const createArticle = async (nom, description, stocks, prix, type_article, image_path) => {
    const client = await pool.connect();
    try {
        const query = 'INSERT INTO produit (nom_produit, description_produit, stocks, prix_produit, type_article, image_path) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
        const values = [nom, description, stocks, prix, type_article, image_path];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        client.release();
    }
};

// Fetch all articles
const fetchArticles = async () => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM produit';
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.log(error);
        return [];
    } finally {
        client.release();
    }
};

// Fetch a specific article by its id
const fetchSpecificArticle = async (id) => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM produit WHERE id = $1';
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

// Delete a specific article by its id
const deleteArticle = async (id) => {
    const client = await pool.connect();
    try {
        const query = 'DELETE FROM produit WHERE id = $1 RETURNING *';
        const values = [id];
        const result = await client.query(query, values);
        if (result.rowCount === 0) {
            return "Article non trouvé";
        }
        return "suppression réussie";
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        client.release();
    }
};

// Update a specific article by its id
const updateArticle = async (id, nom, description, stocks, prix, type_article, image_path) => {
    const client = await pool.connect();
    try {
        const query = 'UPDATE produit SET nom_produit = $1, description_produit = $2, stocks = $3, prix_produit = $4, type_article = $5, image_path = $6 WHERE id = $7 RETURNING *';
        const values = [nom, description, stocks, prix, type_article, image_path, id];
        const result = await client.query(query, values);
        if (result.rowCount === 0) {
            return "Article non trouvé";
        }
        return "mise à jour réussie";
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        client.release();
    }
};

module.exports = { createArticle, fetchArticles, fetchSpecificArticle, deleteArticle, updateArticle };