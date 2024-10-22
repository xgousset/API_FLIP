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


exports.checkPassword = async (req,res) => {
    const id = req.params.id;
    const password = req.body.password;
    const user = usersService.fetchSpecificUser(id);
    if(!user){
        return res.status(404).send("Utilisateur non trouvé");
    }
    if(usersService.checkpassword(password,id)){
        return res.status(200).send("Mot de passe correct");
    }else{
        return res.status(401).send("Mot de passe incorrect");
    }
}

exports.getUsers = async (req,res) => {
    const users = usersService.fetchUsers();
    return res.status(200).send(users);
}

exports.getUserById = async (req,res) => {
    const id = req.params.id;
    const user = usersService.fetchSpecificUser(id);
    if(!user){
        return res.status(404).send("Utilisateur non trouvé");
    }
    return res.status(200).send(user);
}


exports.getUsersAttributes = async (req,res) => {
    const id = req.params.id;
    const user = usersService.UserAttributesFetch(id);
    if(!user){
        return res.status(404).send("Utilisateur non trouvé");
    }
    return res.status(200).send(user);
}