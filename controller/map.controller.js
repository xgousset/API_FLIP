const mapService = require('../services/map.service');

exports.asignLot = async (req,res) => {
    const id = req.params.id;
    const {id_lot} = req.body;
    mapService.asignLot(id,id_lot,(error,data)=>{
        if(error){
            return res.status(500).send("Erreur");
        }
        return res.status(200).send(data);
    });
}

exports.getFreeLot = async (req,res) => {
    const lots = mapService.fetchEmplacementsLibres();
    return res.status(200).send(lots);
}

exports.getOccupiedLot = async (req,res) => {
    const lots = mapService.fetchEmplacementsOccupes();
    return res.status(200).send(lots);
}

exports.getLots = async (req,res) => {
    const lots = mapService.fetchEmplacements();
    return res.status(200).send(lots);
}


exports.deleteLot = async (req,res) => {
    const id = req.params.id;
    await mapService.libererEmplacement(id, (error, data) => {
        if (error) {
            return res.status(500).send("Erreur");
        }
        return res.status(200).send(data);
    });
}

