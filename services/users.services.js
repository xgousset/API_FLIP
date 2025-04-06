const pool = require('../database/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// crée un nouvel utilisateur avec un identifiant, un nom, un prénom, un mot de passe et un email
const createUser = async (nom, prenom, email, password, type, identifiant) => {
    console.log("createUser", identifiant, nom, prenom, email, password, type);
    const clients = await pool.connect();

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const requete = 'INSERT INTO utilisateur (identifiant, nom, prenom, mdp, email, role) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *';
        const values = [identifiant, nom, prenom, hashedPassword, email, type];
        const result = await clients.query(requete, values);
        return result.rows;
    } catch (error) {
        console.log(error);
        return error;
    } finally {
        clients.release();
    }
};

// renvoie tous les utilisateurs
const fetchUsers = async () => {
    const clients = await pool.connect();
    try {
        const result = await clients.query('SELECT * FROM utilisateur');
        console.log(result.rows);
        return result.rows;
    } catch (error) {
        console.log(error);
        return [];
    } finally {
        clients.release();
    }
};

const updateUser = async (id, nom, prenom, email, motDePasse, type, identifiant) => {
    const clients = await pool.connect();
    try {
        const hashedPassword = await bcrypt.hash(motDePasse, saltRounds);
        const requete = 'UPDATE utilisateur SET nom = $1, prenom = $2, mdp = $3, email = $4, role = $5, identifiant = $7 WHERE id = $6 RETURNING *';
        const values = [nom, prenom, hashedPassword, email, type, id, identifiant];
        const result = await clients.query(requete, values);
        return result.rows;
    } catch (error) {
        console.log(error);
        return error;
    } finally {
        clients.release();
    }
};

// sélectionne un utilisateur spécifique par son id à partir de la liste d'utilisateurs
const fetchSpecificUser = async (id) => {
    const clients = await pool.connect();
    try {
        const result = await clients.query('SELECT * FROM utilisateur WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        clients.release();
    }
};

// supprime un utilisateur spécifique par son id à partir de la liste d'utilisateurs
const deleteUser = async (id) => {
    const clients = await pool.connect();
    try {
        const result = await clients.query('DELETE FROM utilisateur WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return "Utilisateur non trouvé";
        }
        return "suppression réussie";
    } catch (error) {
        console.log(error);
        return error;
    } finally {
        clients.release();
    }
};

module.exports = { createUser, fetchUsers, fetchSpecificUser, deleteUser, updateUser };