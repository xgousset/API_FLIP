const commentairesService = require('../services/commentaires.services');


exports.saveComment = async (req, res) => {
    const { id_utilisateur, id_article, contenu } = req.body;
    try {
        const data = await commentairesService.createComment(id_utilisateur, id_article, contenu);
        return res.status(200).send(data);
    } catch (error) {
        console.error("Error creating comment:", error);
        return res.status(500).send("Erreur");
    }
}

exports.deleteComment = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await commentairesService.deleteComment(id);
        return res.status(200).send(data);
    } catch (error) {
        console.error("Error deleting comment:", error);
        return res.status(500).send("Erreur");
    }
}

exports.getCommentById = async (req, res) => {
    const id = req.params.id;
    try {
        const comment = await commentairesService.fetchSpecificComment(id);
        if (!comment) {
            return res.status(404).send("Commentaire non trouvé");
        }
        return res.status(200).send(comment);
    } catch (error) {
        console.error("Error fetching comment by ID:", error);
        return res.status(500).send("Erreur");
    }
}

exports.getComments = async (req, res) => {
    try {
        const comments = await commentairesService.fetchComments();
        return res.status(200).send(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        return res.status(500).send("Erreur");
    }
}

exports.updateComment = async (req, res) => {
    const id = req.params.id;
    const { id_utilisateur, id_article, contenu } = req.body;
    try {
        const data = await commentairesService.updateComment(id, id_utilisateur, id_article, contenu);
        return res.status(200).send(data);
    } catch (error) {
        console.error("Error updating comment:", error);
        return res.status(500).send("Erreur");
    }
}

exports.getCommentsByStand = async (req, res) => {
    const id = req.params.id;
    try {
        const comments = await commentairesService.fetchCommentsByStand(id);
        return res.status(200).send(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        return res.status(500).send("Erreur");
    }
}

exports.getCommentsByUser = async (req, res) => {
    const id = req.params.id;
    try {
        const comments = await commentairesService.fetchCommentsByUser(id);
        return res.status(200).send(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        return res.status(500).send("Erreur");
    }
}

