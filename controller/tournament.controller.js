const tournamentService = require('../services/tournament.service');

exports.saveTournament = async (req, res) => {
    const { id_stand, participants_min, participants_max, prix_entree, heure_debut, objet_tournoi, nom_tournoi, description_tournoi } = req.body;
    const image_path = req.file ? `/images/tournaments/${req.file.filename}` : null;

    if (!id_stand || !participants_min || !participants_max || !prix_entree || !heure_debut || !objet_tournoi || !nom_tournoi || !description_tournoi) {
        return res.status(400).send("Tous les champs requis doivent être fournis.");
    }

    await tournamentService.createTournament(
        id_stand, participants_min, participants_max, prix_entree, heure_debut, objet_tournoi, nom_tournoi, description_tournoi, image_path,
        (error, data) => {
            if (error) {
                return res.status(500).send("Erreur lors de la création du tournoi.");
            }
            return res.status(200).send(data);
        }
    );
}

exports.deleteTournament = async (req, res) => {
    const id = req.params.id;
    await tournamentService.deleteTournament(id, (error, data) => {
        if (error) {
            return res.status(500).send("Erreur");
        }
        return res.status(200).send(data);
    });
}

exports.getTournamentById = async (req, res) => {
    const id = req.params.id;
    const tournament = await tournamentService.fetchSpecificTournament(id);
    if (!tournament) {
        return res.status(404).send("Tournoi non trouvé");
    }
    return res.status(200).send(tournament);
}

exports.getTournaments = async (req, res) => {
    const tournaments = await tournamentService.fetchTournaments();
    return res.status(200).send(tournaments);
}

exports.updateTournament = async (req, res) => {
    const id = req.params.id;
    const image_path = req.file ? `/images/tournaments/${req.file.filename}` : null;
    const { id_stand, lieu, prix, nom, description } = req.body;
    await tournamentService.updateTournament(id, id_stand, lieu, prix, nom, description, image_path, (error, data) => {
        if (error) {
            return res.status(500).send("Erreur");
        }
        return res.status(200).send(data);
    });
}

