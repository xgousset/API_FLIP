const fs = require('fs')
const path = require('path')
const chemin = path.join(__dirname, '../', 'data/users.json')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
const saltRounds = 10;


//crypte un mot de passe avec bcrypt
const createpassword = (password)=>{
    let passwordC = bcrypt.hash(password,saltRounds)
    return passwordC
}



//crée un nouvel utilisateur avec un nom, un prénom, un mot de passe et un email
const createUser = (nom, prenom, email,password,autorisation, callback) => {
    let users = []
    try {
        const data = fs.readFileSync(chemin)
        const dataStr = data.toString()
        users = JSON.parse(dataStr)
    } catch (error) {
        console.log(error)
        return callback(error)
    }

    const newUser = { id: uuidv4(), nom: nom, prenom: prenom, email: email, autorisation:autorisation, password: createpassword(password) }
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


const checkpassword = (password,uuid)=>{
    let hash = fetchSpecificUser(uuid).password
    return bcrypt.compare(password,hash)
}


const UserAttributesFetch = (uuid)=>{
    let user = fetchSpecificUser(uuid)
    return {nom:user.nom,prenom:user.prenom,email:user.email,password:user.password}
}

module.exports = { createUser, fetchUsers, fetchSpecificUser, deleteUser, checkpassword, UserAttributesFetch };