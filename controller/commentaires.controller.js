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

exports.updateComment = async (req, res) => {
    const id = req.params.id;
    const { comment } = req.body;
    try {
        const data = await commentairesService.updateComment(id,  comment);
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


