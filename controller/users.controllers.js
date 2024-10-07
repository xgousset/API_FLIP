const usersService = require('../services/users.services');

exports.saveUser = async (req,res) => {
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    usersService.createUser(prenom,nom,(error,data)=>{
        if(error){
            return res.status(500).send("Erreur");
        }
        return res.status(200).send(data);
    });
}


exports.deleteUser = async (req,res) => {
    const id = req.params.id;
    usersService.deleteUser(id,(error,data)=>{
        if(error){
            return res.status(500).send("Erreur");
        }
        return res.status(200).send(data);
    });
}