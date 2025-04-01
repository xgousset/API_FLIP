const notesService = require('../services/notes.service');
const assert = require("node:assert");

exports.saveNote = async (req, res) => {
    const { id_utilisateur, id_stand, note } = req.body;
    assert(note >= 0 && note <= 5, "La note doit être comprise entre 0 et 5");
    try {
        const data = await notesService.addNote(id_stand, id_utilisateur,  note);
        return res.status(200).send(data);
    } catch (error) {
        console.error("Error creating note:", error);
        return res.status(500).send("Erreur");
    }
}


exports.deleteNote = async (req, res) => {
    const { id_utilisateur, id_stand } = req.body;
    try {
        const data = await notesService.deleteNote(id_stand, id_utilisateur);
        return res.status(200).send(data);
    } catch (error) {
        console.error("Error deleting note:", error);
        return res.status(500).send("Erreur");
    }
}

exports.getAverageNote = async (req, res) => {
    const id_stand = req.params.idStand;
    try {
        const data = await notesService.fetchAverageNote(id_stand);
        return res.status(200).send(data);
    } catch (error) {
        console.error("Error fetching average note:", error);
        return res.status(500).send("Erreur");
    }
}

exports.updateNote = async (req, res) => {
    const { id_utilisateur, id_stand, note } = req.body;
    assert(note >= 0 && note <= 5, "La note doit être comprise entre 0 et 5");
    try {
        const data = await notesService.updateNote(id_stand, id_utilisateur, note);
        return res.status(200).send(data);
    } catch (error) {
        console.error("Error updating note:", error);
        return res.status(500).send("Erreur");
    }
}


exports.getNote = async (req, res) => {
    const id_utilisateur = req.params.idUser;
    const id_stand = req.params.idStand
    try {
        const data = await notesService.fetchNote(id_stand, id_utilisateur);
        return res.status(200).send(data);
    } catch (error) {
        console.error("Error fetching note:", error);
        return res.status(500).send("Erreur");
    }
}