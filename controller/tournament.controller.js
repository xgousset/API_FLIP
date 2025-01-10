const tournamentService = require('../services/tournament.service');

exports.saveTournament = async (req,res) => {
    const {id_stand,participants_min,participants_max,prix_entree,heure_debut,objet_tournoi,nom_tournoi,description_tournoi} = req.body;
    await tournamentService.createTournament(id_stand,participants_min,participants_max,prix_entree,heure_debut,objet_tournoi,nom_tournoi,description_tournoi, (error, data) => {
        if (error) {
            return res.status(500).send("Erreur");
        }
        return res.status(200).send(data);
    });
}

exports.deleteTournament = async (req,res) => {
    const id = req.params.id;
    await tournamentService.deleteTournament(id, (error, data) => {
        if (error) {
            return res.status(500).send("Erreur");
        }
        return res.status(200).send(data);
    });
}

exports.getTournamentById = async (req,res) => {
    const id = req.params.id;
    const tournament = await tournamentService.fetchSpecificTournament(id);
    if(!tournament){
        return res.status(404).send("Tournoi non trouvé");
    }
    return res.status(200).send(tournament);
}

exports.getTournaments = async (req,res) => {
    const tournaments = await tournamentService.fetchTournaments();
    return res.status(200).send(tournaments);
}

exports.updateTournament = async (req,res) => {
    const id = req.params.id;
    const {id_stand,participants_min,participants_max,prix_entree,heure_debut,objet_tournoi,nom_tournoi,description_tournoi} = req.body;
    await tournamentService.updateTournament(id,id_stand,participants_min,participants_max,prix_entree,heure_debut,objet_tournoi,nom_tournoi,description_tournoi,(error,data)=>{
        if(error){
            return res.status(500).send("Erreur");
        }
        return res.status(200).send(data);
    });
}

