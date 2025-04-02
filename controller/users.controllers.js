const usersService = require('../services/users.services');

exports.saveUser = async (req,res) => {
    const {nom,prenom,email,motDePasse,role, identifant} = req.body;
    try{
        const data = usersService.createUser(nom,prenom,email,motDePasse,role, identifant);
        return res.status(200).send(data);
    } catch (error) {
        console.error("Erreur de création d'utilisateur:", error);
        return res.status(500).send("Erreur");
    }
}




exports.checkPassword = async (req,res) => {
    const id = req.params.id;
    const password = req.body.password;
    const user = usersService.fetchSpecificUser(id);
    if(!user){
        return res.status(404).send("Utilisateur non trouvé");
    }
    if(await usersService.checkPassword(password, id)){
        return res.status(200).send("Mot de passe correct");
    }else{
        return res.status(401).send("Mot de passe incorrect");
    }
}

exports.getUsers = async (req,res) => {
    try{
        const users = await usersService.fetchUsers();
        return res.status(200).send(users);
    } catch (error) {
        console.error("Erreur de récupération des utilisateurs:", error);
        return res.status(500).send("Erreur");
    }
}

exports.getUserById = async (req,res) => {
    const id = req.params.id;
    try {
        const user = await usersService.fetchSpecificUser(id);
        if (!user) {
            return res.status(404).send("Utilisateur non trouvé");
        }
        return res.status(200).send(user);
    } catch (error) {
        console.error("Erreur de récupération de l'utilisateur par ID:", error);
        return res.status(500).send("Erreur");
    }
}

exports.updateUser = async (req,res) => {
    const id = req.params.id;
    const {nom,prenom,email,motDePasse,role, identifant} = req.body;
    try {
        const data = await usersService.updateUser(id,nom,prenom,email,motDePasse,role, identifant);
        return res.status(200).send(data);
    } catch (error) {
        console.error("Erreur de mise à jour de l'utilisateur:", error);
        return res.status(500).send("Erreur");
    }
}

exports.deleteUser = async (req,res) => {
    const id = req.params.id;
    try {
        const data = await usersService.deleteUser(id);
        return res.status(200).send(data);
    } catch (error) {
        console.error("Erreur de suppression de l'utilisateur:", error);
        return res.status(500).send("Erreur");
    }
}