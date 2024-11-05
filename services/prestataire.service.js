const fs = require('fs')
const path = require('path')
const chemin = path.join(__dirname, '..', 'prestataire.json')
const { v4: uuidv4 } = require('uuid')

//crée un nouveau prestataire avec un nom, une description
const createPrestataire = (nom, description, callback) => {
    let prestataires = []
    try {
        const data = fs.readFileSync(chemin)
        const dataStr = data.toString()
        prestataires = JSON.parse(dataStr)
    } catch (error) {
        console.log(error)
        return callback(error)
    }

    const newPrestataire = { id: uuidv4(), nom: nom, description: description }
    prestataires.push(newPrestataire)

    try {
        fs.writeFileSync(chemin, JSON.stringify(prestataires))
        return callback(null, "écriture réussie")
    } catch (error) {
        console.log(error)
        return callback(error)
    }
}

const fetchPrestataires = () => {
    let prestataires = [];
    try {
        const data = fs.readFileSync(chemin);
        const dataStr = data.toString();
        prestataires = JSON.parse(dataStr);
    } catch (error) {
        console.log(error);
    }
    return prestataires;
}

const fetchSpecificPrestataire = (id) => {
    let prestataires = fetchPrestataires();
    let prestataire = prestataires.find(prestataire => prestataire.id === id);
    return prestataire;
}

const deletePrestataire = (id, callback) => {
    let prestataires = fetchPrestataires()
    let prestataire = prestataires.find(prestataire => prestataire.id === id)
    if (!prestataire) {
        return callback("Prestataire non trouvé")
    }
    prestataires = prestataires.filter(prestataire => prestataire.id !== id)
    try {
        fs.writeFileSync(chemin, JSON.stringify(prestataires))
        return callback(null, "suppression réussie")
    } catch (error) {
        console.log(error)
        return callback(error)
    }
}

const updatePrestataire = (id, nom, description, callback) => {
    let prestataires = fetchPrestataires();
    let prestataire = prestataires.find(prestataire => prestataire.id === id);
    if (!prestataire) {
        return callback("Prestataire non trouvé");
    }
    prestataire.nom = nom;
    prestataire.description = description;
    try {
        fs.writeFileSync(chemin, JSON.stringify(prestataires));
        return callback(null, "modification réussie");
    } catch (error) {
        console.log(error);
        return callback(error);
    }
}

module.exports = {
    createPrestataire,
    fetchPrestataires,
    fetchSpecificPrestataire,
    deletePrestataire,
    updatePrestataire
}