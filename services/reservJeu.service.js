//gère la réservation et l'annulation de la réservation des jeux

const pool = require('../database/db');

// Crée une nouvelle réservation
const createReservation = async (idEmplacement, idUtilisateur, timestamp) => {
    const client = await pool.connect();
    try {
        const query = 'INSERT INTO reservationjeu (id_jeu, id_utilisateur, date_reservation) VALUES ($1, $2, $3) RETURNING *';
        const values = [idEmplacement, idUtilisateur,timestamp];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        client.release();
    }
}


// récupère toutes les réservations d'un jeu donné
const fetchReservations = async (idJeu) => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM reservationjeu WHERE id_jeu = $1';
        const values = [idJeu];
        const result = await client.query(query, values);
        return result.rows;
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        client.release();
    }
}


// récupère toutes les réservations d'un utilisateur donné
const fetchReservationsByUser = async (idUtilisateur) => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM reservationjeu WHERE id_utilisateur = $1';
        const values = [idUtilisateur];
        const result = await client.query(query, values);
        return result.rows;
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        client.release();
    }
}


// Annule une réservation
const cancelReservation = async (idReservation) => {
    const client = await pool.connect();
    try {
        const query = 'DELETE FROM reservationjeu WHERE id = $1 RETURNING *';
        const values = [idReservation];
        const result = await client.query(query, values);
        if (result.rowCount === 0) {
            return "Réservation non trouvée";
        }
        return "Annulation réussie";
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        client.release();
    }
}


const fetchAllReservations = async () => {
    const client = await pool.connect();
    try {
        const query = 'SELECT * FROM reservationjeu';
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        client.release();
    }
}



module.exports = {
    createReservation,
    fetchReservations,
    fetchReservationsByUser,
    cancelReservation,
    fetchAllReservations
}