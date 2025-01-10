const pool = require('../database/db')
const bcrypt = require('bcrypt')
const saltRounds = 10;


//crypte un mot de passe avec bcrypt
const createpassword = (password)=>{
    let passwordC = bcrypt.hash(password,saltRounds)
    console.log(passwordC)
    return passwordC
}



//crée un nouvel utilisateur avec un nom, un prénom, un mot de passe et un email
const createUser = async (nom, prenom, email, password, autorisation, callback) => {
    const clients = await pool.connect()
    try {
        const requete = 'INSERT INTO utilisateur (nom, prenom, mdp, email, niveau_autorisation, currentbasket) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *'
        values = [nom, prenom, await bcrypt.hash(password,saltRounds), email, autorisation, null]
        result = clients.query(requete, values)
        return result.rows
    } catch (error) {
        console.log(error)
        return callback(error)
    } finally {
        clients.release()
    }
}

//renvoie tous les utilisateurs
const fetchUsers = async () =>  {
    const clients = await pool.connect()
    try {
        const result = await clients.query('SELECT * FROM utilisateur')
        console.log(result.rows)
        return result.rows
    } catch (error) {
        console.log(error)
        return []
    } finally {
        clients.release()
    }
}

//sélectionne un utilisateur spécifique par son id à partir de la liste d'utilisateurs
const fetchSpecificUser = async (id) => {
    const clients = await pool.connect()
    try {
        const result = clients.query('SELECT * FROM utilisateur WHERE id = $1', [id])
        return result.rows[0]
    } catch (error) {
        console.log(error)
        return null
    } finally {
        clients.release()
    }
}


//supprime un utilisateur spécifique par son id à partir de la liste d'utilisateurs
const deleteUser = async (id) => {
    const clients = await pool.connect()
    try {
        const result = clients.query('DELETE FROM utilisateur WHERE id = $1 RETURNING *', [id])
        if (result.rowCount === 0) {
            return "Utilisateur non trouvé"
        }
        return "suppression réussie"
    } catch (error) {
        console.log(error)
        return (error)
    } finally {
        clients.release()
    }
}


module.exports = { createUser, fetchUsers, fetchSpecificUser, deleteUser};