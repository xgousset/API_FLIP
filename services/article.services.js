const fs = require('fs')
const path = require('path')
const chemin = path.join(__dirname, '..', 'articles.json')
const { v4: uuidv4 } = require('uuid')

//crée un nouvel article avec un nom, une description et un prix
const createArticle = (nom, description,stocks, prix, callback) => {
    let articles = []
    try {
        const data = fs.readFileSync(chemin)
        const dataStr = data.toString()
        articles = JSON.parse(dataStr)
    } catch (error) {
        console.log(error)
        return callback(error)
    }

    const newArticle = { id: uuidv4(), nom: nom, description: description,stocks:stocks, prix: prix }
    articles.push(newArticle)

    try {
        fs.writeFileSync(chemin, JSON.stringify(articles))
        return callback(null, "écriture réussie")
    } catch (error) {
        console.log(error)
        return callback(error)
    }
}

const fetchArticles = () => {
    let articles = [];
    try {
        const data = fs.readFileSync(chemin);
        const dataStr = data.toString();
        articles = JSON.parse(dataStr);
    } catch (error) {
        console.log(error);
    }
    return articles;
}

//sélectionne un article spécifique par son id à partir de la liste d'articles
const fetchSpecificArticle = (id) => {
    let articles = fetchArticles();
    let article = articles.find(article => article.id === id);
    return article;
}

//supprime un article spécifique par son id à partir de la liste d'articles
const deleteArticle = (id, callback) => {
    let articles = fetchArticles()
    let article = articles.find(article => article.id === id)
    if (!article) {
        return callback("Article non trouvé")
    }
    articles = articles.filter(article => article.id !== id)
    try {
        fs.writeFileSync(chemin, JSON.stringify(articles))
        return callback(null, "suppression réussie")
    } catch (error) {
        console.log(error)
        return callback(error)
    }
}

//met à jour un article spécifique par son id à partir de la liste d'articles
const updateArticle = (id, nom, description, prix, callback) => {
    let articles = fetchArticles()
    let article = articles.find(article => article.id === id)
    if (!article) {
        return callback("Article non trouvé")
    }
    article.nom = nom
    article.description = description
    article.prix = prix
    try {
        fs.writeFileSync(chemin, JSON.stringify(articles))
        return callback(null, "mise à jour réussie")
    } catch (error) {
        console.log(error)
        return callback(error)
    }
}

module.exports = { createArticle, fetchArticles, fetchSpecificArticle, deleteArticle,updateArticle  }