const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const pool = require('../database/db.js');

//crée un nouvel article avec un nom, une description et un prix
const createArticle = async (nom_produit,description_produit,stocks,prix_produit,id, callback) => {

    const user = await pool.connect();

    const SQL = "INSERT INTO produits (nom_produit,description_produit,stocks,prix_produit,id) VALUES ($1, $2, $3, $4, $5)"

    const res = await user.query(SQL, [nom, description, 0, prix, id])

    user.release();

    console.log(res.rows)
}

const fetchArticles = async () => {

    const user = await pool.connect();
    const SQL = "SELECT * FROM produits"
    const res = await user.query(SQL)
    user.release();
    console.log(res.rows)

}

//sélectionne un article spécifique par son id à partir de la liste d'articles
const fetchSpecificArticle = (id) => {
    let articles = fetchArticles();
    let article = articles.find(article => article.id === id);
    return article;
}

//supprime un article spécifique par son id à partir de la liste d'articles
const deleteArticle = async (id, callback) => {

    const user = await pool.connect();
    const SQL = "DELETE FROM produits WHERE id = $1"
    const res = await user.query(SQL, [id_produit])
    user.release();
    console.log(res.rows)

}

//met à jour un article spécifique par son id à partir de la liste d'articles
const updateArticle = async (id_produit,nom_produit,description_produit,stocks,prix_produit,id, callback) => {

    const user = await pool.connect();
    const SQL = "UPDATE produits SET nom_produit = $1, description_produit = $2, stocks = $3, prix_produit = $4, id = $5 WHERE id = $6"
    const res = await user.query(SQL, [nom_produit, description_produit, stocks, prix_produit, id, id_produit])
    user.release();
    console.log(res.rows)
}

module.exports = { createArticle, fetchArticles, fetchSpecificArticle, deleteArticle,updateArticle  }