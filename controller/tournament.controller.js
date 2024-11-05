const tournamentService = require('../services/tournament.service');

exports.saveTournament = async (req,res) => {
    const {nom,description} = req.body;
    tournamentService.createTournament(nom,description,capacitee,(error,data)=>{
        if(error){
            return res.status(500).send("Erreur");
        }
        return res.status(200).send(data);
    });
}

exports.deleteTournament = async (req,res) => {
    const id = req.params.id;
    tournamentService.deleteTournament(id,(error,data)=>{
        if(error){
            return res.status(500).send("Erreur");
        }
        return res.status(200).send(data);
    });
}

exports.getTournamentById = async (req,res) => {
    const id = req.params.id;
    const tournament = tournamentService.fetchSpecificTournament(id);
    if(!tournament){
        return res.status(404).send("Tournoi non trouvé");
    }
    return res.status(200).send(tournament);
}

exports.getTournaments = async (req,res) => {
    const tournaments = tournamentService.fetchTournaments();
    return res.status(200).send(tournaments);
}

exports.updateTournament = async (req,res) => {
    const id = req.params.id;
    const {nom,description} = req.body;
    tournamentService.updateTournament(id,nom,description,capacitee,(error,data)=>{
        if(error){
            return res.status(500).send("Erreur");
        }
        return res.status(200).send(data);
    });
}

