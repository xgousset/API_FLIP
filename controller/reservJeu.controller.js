// utilise reservJeu.service et récupère les données dans le path et dans le body

const reservJeuServices = require('../services/reservJeu.service');

exports.saveReservation = async (req, res) => {
    const { idJeu, idUtilisateur, dateReserv } = req.body;
    try {
        const data = await reservJeuServices.createReservation(idJeu, idUtilisateur, dateReserv);
        return res.status(200).send(data);
    } catch (error) {
        console.error("Error creating reservation:", error);
        return res.status(500).send("Erreur");
    }
}


exports.deleteReservation = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await reservJeuServices.cancelReservation(id);
        return res.status(200).send(data);
    } catch (error) {
        console.error("Error deleting reservation:", error);
        return res.status(500).send("Erreur");
    }
}


exports.getReservationsJeu = async (req, res) => {
    const idJeu = req.params.id;
    try {
        const data = await reservJeuServices.fetchReservations(idJeu);
        return res.status(200).send(data);
    } catch (error) {
        console.error("Error fetching reservations:", error);
        return res.status(500).send("Erreur");
    }
}

exports.getReservationsByUser = async (req, res) => {
    const idUtilisateur = req.params.id;
    try {
        const data = await reservJeuServices.fetchReservationsByUser(idUtilisateur);
        return res.status(200).send(data);
    } catch (error) {
        console.error("Error fetching reservations by user:", error);
        return res.status(500).send("Erreur");
    }
}