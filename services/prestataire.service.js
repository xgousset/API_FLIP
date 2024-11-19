const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const pool = require('../database/db.js');

//crée un nouveau prestataire avec un nom, une description
const createPrestataire = async (nom, id_type, callback) => {
    const user = await pool.connect();
    const SQL = "INSERT INTO prestataire (nom, id_type) VALUES ($1, $2)"
    const res = await user.query(SQL, [nom, id_type])
    user.release();
    console.log(res.rows)

}

const fetchPrestataires = async () => {
    const user = await pool.connect();
    const SQL = "SELECT * FROM prestataire"
    const res = await user.query(SQL)
    user.release();
    console.log(res.rows)

}

const fetchSpecificPrestataire = (id) => {
    let prestataires = fetchPrestataires();
    let prestataire = prestataires.find(prestataire => prestataire.id === id);
    return prestataire;
}

const deletePrestataire = async (id, callback) => {
    const user = await pool.connect();
    const SQL = "DELETE FROM prestataire WHERE id = $1"
    const res = await user.query(SQL, [id])
    user.release();
    console.log(res.rows)
}

const updatePrestataire = async (id,nom, id_type,id_emplacement,callback) => {
    const user = await pool.connect();
    const SQL = "UPDATE prestataire SET nom = $1, id_type = $2, id_emplacement = $3 WHERE id = $4"
    const res = await user.query(SQL, [nom, id_type, id_emplacement, id])
    user.release();
    console.log(res.rows)
}

module.exports = {
    createPrestataire,
    fetchPrestataires,
    fetchSpecificPrestataire,
    deletePrestataire,
    updatePrestataire
}