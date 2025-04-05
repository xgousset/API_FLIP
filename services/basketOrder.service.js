// services/basketOrder.service.js

const db = require('../database/db'); // Assurez-vous d'avoir un fichier de connexion à la base de données

// Service to get all baskets
async function getBasket() {
    const result = await db.query('SELECT * FROM panier');
    return result.rows;
}

// Service to get a basket by ID
async function getBasketById(id) {
    const result = await db.query('SELECT * FROM panier WHERE id = $1', [id]);
    return result.rows[0];
}

// Service to create a new basket
async function createBasket(basket) {
    const result = await db.query(
        'INSERT INTO panier (valeur_panier,  id_utilisateur, type) VALUES ($1, $2, $3) RETURNING *',
        [0,basket.id_utilisateur, basket.type]
    );
    return result.rows[0];
}

async function getBasketByUserId(userId) {
    const result = await db.query('SELECT * FROM panier WHERE id_utilisateur = $1', [userId]);
    return result.rows;
}



// Service to delete a basket
async function deleteBasket(id) {
    await db.query('DELETE FROM panier WHERE id = $1', [id]);
}

// Service to add a product to a basket
async function addProductToBasket(basketId, productId, quantity) {
    const result = await db.query(
        'INSERT INTO panier_produit (id_panier, id_produit, quantite) VALUES ($1, $2, $3) RETURNING *',
        [basketId, productId, quantity]
    );
    const value = await db.query(
        'SELECT prix_produit FROM produit WHERE id = $1',
        [productId]
    );
    const totalValue = value.rows[0].prix_produit * quantity;

    const updateResult = await db.query(
        'UPDATE panier SET valeur_panier = valeur_panier + $1 WHERE id = $2 RETURNING *',
        [totalValue, basketId]
    );

    return result.rows[0];
}

// Service to remove a product from a basket
async function removeProductFromBasket(basketId, productId,quantitee) {
    let totalAmmount = await db.query(
        'SELECT quantite FROM panier_produit WHERE id_panier = $1 AND id_produit = $2',
        [basketId, productId]
    );
    console.log(totalAmmount.rows);
    let total = totalAmmount.rows[0].quantite;
    if (total <= quantitee) {
        total=quantitee
        await db.query('DELETE FROM panier_produit WHERE id_panier = $1 AND id_produit = $2', [basketId, productId]);

    }
    else {
        await db.query('UPDATE panier_produit SET quantite = quantite - $1 WHERE id_panier = $2 AND id_produit = $3', [quantitee, basketId, productId]);
    }

    const value = await db.query(
        'SELECT prix_produit FROM produit WHERE id = $1',
        [productId]
    );

    const totalValue = value.rows[0].prix_produit * total;

    const updateResult = await db.query(
        'UPDATE panier SET valeur_panier = valeur_panier - $1 WHERE id = $2 RETURNING *',
        [totalValue, basketId]
    );
}


// Service to fetch user historic
async function fetchUserHistoric(userId) {
    const result = await db.query('SELECT * FROM panier WHERE id_utilisateur = $1 AND paid = true', [userId]);
    return result.rows;
}

// Service to fetch a specific order in historic
async function fetchSpecificOrderInHistoric(orderId) {
    const result = await db.query('SELECT * FROM panier WHERE id = $1', [orderId]);
    return result.rows[0];
}

// Service to send the basket to historic
async function sendBasketToHistoric(basketId) {
    const result = await db.query(
        'UPDATE panier SET paid = TRUE WHERE id = $1 RETURNING *',
        [basketId]
    );
    return result.rows[0];
}


module.exports = {
    getBasket,
    getBasketById,
    createBasket,
    deleteBasket,
    addProductToBasket,
    removeProductFromBasket,
    fetchUserHistoric,
    fetchSpecificOrderInHistoric,
    sendBasketToHistoric,
    getBasketByUserId

};