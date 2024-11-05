const fs = require('fs');
const path = require('path');
const chemin = path.join(__dirname,"..","tournament.json");
const uuid = require('uuid');

const createTournament = (nom,description,capacitee,callback) => {
    let tournaments = [];
    try{
        const data = fs.readFileSync(chemin);
        const dataStr = data.toString();
        tournaments = JSON.parse(dataStr);
    }catch(error){
        console.log(error);
        return callback(error);
    }

    const newTournament = {id: uuid.v4(), nom:nom, description:description, capacitee:capacitee};
    tournaments.push(newTournament);

    try {
        fs.writeFileSync(chemin,JSON.stringify(tournaments));
        return callback(null,"écriture réussie");
    }catch (error){
        console.log(error);
        return callback(error);
    }
}


const fetchTournaments = () => {
    let tournaments = [];
    try{
        const data = fs.readFileSync(chemin);
        const dataStr = data.toString();
        tournaments = JSON.parse(dataStr);
    }catch(error){
        console.log(error);
    }
    return tournaments;
}


const fetchSpecificTournament = (id) => {
    let tournaments = fetchTournaments();
    let tournament = tournaments.find(tournament => tournament.id === id);
    return tournament;
}


const deleteTournament = (id,callback) => {
    let tournaments = fetchTournaments();
    let tournament = tournaments.find(tournament => tournament.id === id);
    if (!tournament) {
        return callback("Tournoi non trouvé");
    }
    tournaments = tournaments.filter(tournament => tournament.id !== id);
    try {
        fs.writeFileSync(chemin,JSON.stringify(tournaments));
        return callback(null,"suppression réussie");
    }catch (error){
        console.log(error);
        return callback(error);
    }
}


const updateTournament = (id,nom,description,capacitee,callback) => {
    let tournaments = fetchTournaments();
    let tournament = tournaments.find(tournament => tournament.id === id);
    if (!tournament) {
        return callback("Tournoi non trouvé");
    }
    tournament.nom = nom;
    tournament.description = description;
    tournament.capacitee = capacitee;
    try {
        fs.writeFileSync(chemin,JSON.stringify(tournaments));
        return callback(null,"mise à jour réussie");
    }catch (error){
        console.log(error);
        return callback(error);
    }
}


