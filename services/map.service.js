const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const pool = require('../database/db.js');


//sélectionne tous les emplacements existants
const fetchEmplacements = async () => {
    const user = await pool.connect();
    const SQL = "SELECT * FROM emplacement"
    const res = await user.query(SQL)
    user.release();
    console.log(res.rows)
}

//récupère tous les emplacements libres
const fetchEmplacementsLibres = async () => {
    const user = await pool.connect();
    const SQL = "SELECT * FROM emplacement WHERE reservé=false"
    const res = await user.query(SQL)
    user.release();
    console.log(res.rows)
}


//récupère tous les emplacements occupés
const fetchEmplacementsOccupes = async () => {
    const user = await pool.connect();
    const SQL = "SELECT * FROM emplacement WHERE reservé=true"
    const res = await user.query(SQL)
    user.release();
    console.log(res.rows)
}


//assigne un prestataire à un emplacement, puis met cet emplacement en mode "réservé"
const assignerPrestataire = async (id_prestataire, id_emplacement, callback) => {
    const user = await pool.connect();
    const prestaSide = "UPDATE prestataire SET id_emplacement = $1 WHERE id = $2"
    const resPresta = await user.query(prestaSide, [id_emplacement, id_prestataire])
    const SQL = "UPDATE emplacement SET reservé = true WHERE id_emplacement = $1"
    const resLot = await user.query(SQL, [id_emplacement])
    user.release();
    console.log(resPresta.rows)
    console.log(resLot.rows)
}


//libère un emplacement, puis le rend disponible
const libererEmplacement = async (id_emplacement, callback) => {
    const user = await pool.connect();
    const SQL1 = "UPDATE prestataire SET id_emplacement = null WHERE id_emplacement = $1"
    const res1 = await user.query(SQL, [id_emplacement])
    const SQL2 = "UPDATE emplacement SET reservé = false WHERE id_emplacement = $1"
    const res2 = await user.query(SQL, [id_emplacement])
    user.release();
    console.log(res1.rows)
    console.log(res2.rows)
}

module.exports = {
    fetchEmplacements,
    fetchEmplacementsLibres,
    fetchEmplacementsOccupes,
    assignerPrestataire,
    libererEmplacement
}