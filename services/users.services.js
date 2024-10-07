const fs = require('fs')
const path = require('path')
const chemin = path.join(__dirname, '..', 'users.json')
const { v4: uuidv4 } = require('uuid')



//crée un nouvel utilisateur avec un nom, un prénom et un email
const createUser = (nom, prenom, email, callback) => {
    let users = []
    try {
        const data = fs.readFileSync(chemin)
        const dataStr = data.toString()
        users = JSON.parse(dataStr)
    } catch (error) {
        console.log(error)
        return callback(error)
    }

    const newUser = { id: uuidv4(), nom: nom, prenom: prenom, email: email }
    users.push(newUser)

    try {
        fs.writeFileSync(chemin, JSON.stringify(users))
        return callback(null, "écriture réussie")
    } catch (error) {
        console.log(error)
        return callback(error)
    }
}

//prend une liste d'utilisateurs et renvoie tous les utilisateurs
const fetchUsers = () => {
    let users = [];
    try {
        const data = fs.readFileSync(chemin);
        const dataStr = data.toString();
        users = JSON.parse(dataStr);
    } catch (error) {
        console.log(error);
    }
    return users;
}

//sélectionne un utilisateur spécifique par son id à partir de la liste d'utilisateurs
const fetchSpecificUser = (id) => {
    let users = fetchUsers();
    let user = users.find(user => user.id === id);
    return user;
}


//supprime un utilisateur spécifique par son id à partir de la liste d'utilisateurs
const deleteUser = (id, callback) => {
    let users = fetchUsers();
    let user = users.find(user => user.id === id);
    if (!user) {
        return callback("Utilisateur non trouvé");
    }
    users = users.filter(user => user.id !== id);
    try {
        fs.writeFileSync(chemin, JSON.stringify(users));
        return callback(null, "Utilisateur supprimé");
    } catch (error) {
        console.log(error);
        return callback(error);
    }
}

export { createUser, fetchUsers, fetchSpecificUser };