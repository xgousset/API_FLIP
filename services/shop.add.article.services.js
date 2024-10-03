const fs = require('fs')
const path = require('path')
const chemin = path.join(__dirname, '..', 'articles.json')
const { v4: uuidv4 } = require('uuid')

//crée un nouvel article avec un nom, une description et un prix
const createArticle = (nom, description, prix, callback) => {
    let articles = []
    try {
        const data = fs.readFileSync(chemin)
        const dataStr = data.toString()
        articles = JSON.parse(dataStr)
    } catch (error) {
        console.log(error)
        return callback(error)
    }

    const newArticle = { id: uuidv4(), nom: nom, description: description, prix: prix }
    articles.push(newArticle)

    try {
        fs.writeFileSync(chemin, JSON.stringify(articles))
        return callback(null, "écriture réussie")
    } catch (error) {
        console.log(error)
        return callback(error)
    }
}