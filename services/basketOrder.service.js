const pool = require('../database/db');
const { updateArticle } = require('./article.services');

const fetchOrderFromBasket = async (id) => {
    const client = await pool.connect();
    try {
        const query = 'SELECT produit.id,produit.nom_produit, produit.prix_produit, panier_produit.quantite FROM panier_produit JOIN public.produit ON public.produit.id = public.panier_produit.id_produit WHERE id_panier = $1';
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

const fetchBasket = async () => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM panier_produit';
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.log(error);
        return [];
    } finally {
        client.release();
    }
}

const deleteBasket = async (id) => {
    const client = await pool.connect();
    try {
        const query = 'DELETE FROM panier_produit WHERE id_panier = $1 RETURNING *';
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

const addProductToBasket = async (id_panier, id_produit, quantite) => {
    const client = await pool.connect();
    const product = await fetchProductById(id_produit);
    try {
        if (product.rows[0].stocks < quantite) {
            return null;
        }
        const query = 'INSERT INTO panier_produit (id_panier, id_produit, quantite) VALUES ($1,$2,$3) RETURNING *';
        const values = [id_panier, id_produit, quantite];
        const result = await client.query(query, values);
        await updateArticle(id_produit,product.rows[0].nom_produit,product.rows[0].prix_produit,product.rows[0].stocks - quantite);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        client.release();
    }
    await updateBasketValue(id_panier);
}


const removeProductFromBasket = async (id_panier, id_produit) => {
    const client = await pool.connect();
    const product = await fetchProductById(id_produit);
    try {
        const query = 'DELETE FROM panier_produit WHERE id_panier = $1 AND id_produit = $2 RETURNING *';
        const values = [id_panier, id_produit];
        const result = await client.query(query, values);
        await updateArticle(id_produit, product.rows[0].nom_produit, product.rows[0].prix_produit, product.rows[0].stocks + result.rows[0].quantite);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        client.release();
    }
    await updateBasketValue(id_panier);
}

const updateAmmountOfInBasket = async (id_panier, id_produit, quantite) => {
    const client = await pool.connect();
    const product = await fetchProductById(id_produit);
    try {
        if (product.rows[0].stocks < quantite || quantite < 0) {
            return null;
        }
        const query = 'UPDATE panier_produit SET quantite = $3 WHERE id_panier = $1 AND id_produit = $2 RETURNING *';
        const values = [id_panier, id_produit, quantite];
        const result = await client.query(query, values);
        await updateArticle(id_produit, product.rows[0].nom_produit, product.rows[0].prix_produit, product.rows[0].stocks - quantite);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        client.release();
    }
    await updateBasketValue(id_panier);
}

const createBasket = async (id_utilisateur) => {
    const client = await pool.connect();
    try {
        const query = 'INSERT INTO panier (valeur_panier) VALUES ($1) RETURNING *';
        const result = await client.query(query, [0]);
        const query2 = 'UPDATE utilisateur SET currentbasket = $1 WHERE id = $2 RETURNING *';
        const result2 = await client.query(query2, [result.rows[0].id, id_utilisateur]);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        client.release();
    }
}

const updateBasketValue = async (id_panier) => {
    const client = await pool.connect();
    try {
        // Reset the basket value to 0
        await client.query('UPDATE panier SET valeur_panier = 0 WHERE id = $1', [id_panier]);

        // Fetch all products in the basket
        const query = 'SELECT produit.prix_produit, panier_produit.quantite FROM panier_produit JOIN produit ON panier_produit.id_produit = produit.id WHERE id_panier = $1';
        const result = await client.query(query, [id_panier]);

        // Calculate the total value
        let totalValue = 0;
        result.rows.forEach(row => {
            totalValue += row.prix_produit * row.quantite;
        });

        // Update the basket with the new total value
        const updateQuery = 'UPDATE panier SET valeur_panier = $2 WHERE id = $1 RETURNING *';
        const updateResult = await client.query(updateQuery, [id_panier, totalValue]);
        return updateResult.rows[0];
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        client.release();
    }
}

const fetchSpecificBasket = async (id) => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM panier WHERE id = $1';
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

const sendBasketToHistoric = async (id_panier) => {
    const client = await pool.connect();
    let userResult = await client.query('SELECT id FROM utilisateur WHERE currentbasket = $1', [id_panier]);
    let id_utilisateur = userResult.rows[0].id;
    try {
        const query = 'INSERT INTO historique_commandes (id_panier,id_utilisateur) VALUES ($1,$2) RETURNING *';
        const values = [id_panier, id_utilisateur];
        const result = await client.query(query, values);
        await createBasket(id_utilisateur);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        client.release();
    }
}

const fetchUserHistoric = async (id_utilisateur) => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM historique_commandes WHERE id_utilisateur = $1';
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


const fetchSpecificOrderInHistoric = async (id) => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM historique_commandes WHERE id = $1';
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


const fetchAllHistoric = async () => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM historique_commandes';
        const result = await client.query(query);
        console.log(result.rows);
        return result.rows;
    } catch (error) {
        console.log(error);
        return [];
    } finally {
        client.release();
    }
}

module.exports = {
    fetchOrderFromBasket,
    fetchBasket,
    deleteBasket,
    addProductToBasket,
    removeProductFromBasket,
    updateAmmountOfInBasket,
    createBasket,
    updateBasketValue,
    fetchSpecificBasket,
    sendBasketToHistoric,
    fetchUserHistoric,
    fetchSpecificOrderInHistoric,
    fetchAllHistoric
}