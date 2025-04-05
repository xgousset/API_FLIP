const usersService = require('../services/users.services');

exports.saveUser = async (req, res) => {
    const { nom, prenom, email, motDePasse, role, identifiant } = req.body;

    console.log("Données de l'utilisateur:", req.body);
    console.log("Nom:", nom);
    console.log("Prénom:", prenom);
    console.log("Email:", email);
    console.log("Mot de passe:", motDePasse);
    console.log("Rôle:", role);
    console.log("Identifiant:", identifiant);
    

    try {
        const data = await usersService.createUser(nom, prenom, email, motDePasse, role, identifiant);
        return res.status(200).send(data);
    } catch (error) {
        console.error("Erreur de création d'utilisateur:", error);
        return res.status(500).send("Erreur");
    }
};

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

exports.updateUser = async (req, res) => {
    const id = req.params.id;
    const { nom, prenom, email, motDePasse, role, identifiant } = req.body;
    try {
        const data = await usersService.updateUser(id, nom, prenom, email, motDePasse, role, identifiant);
        return res.status(200).send(data);
    } catch (error) {
        console.error("Erreur de mise à jour de l'utilisateur:", error);
        return res.status(500).send("Erreur");
    }
};

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