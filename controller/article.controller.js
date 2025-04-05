const articleService = require('../services/article.services');

exports.saveArticle = async (req, res) => {
    const { nom,  prix, type, idStand } = req.body;
    const image_path = req.file ? `/images/articles/${req.file.filename}` : null;
    try {
        const data = await articleService.createArticle( nom, prix, type,idStand, image_path);
        return res.status(200).send(data);
    } catch (error) {
        console.error("Error creating article:", error);
        return res.status(500).send("Erreur");
    }
};

exports.deleteArticle = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await articleService.deleteArticle(id);
        return res.status(200).send(data);
    } catch (error) {
        console.error("Error deleting article:", error);
        return res.status(500).send("Erreur");
    }
};

exports.getArticleById = async (req, res) => {
    const id = req.params.id;
    try {
        const article = await articleService.fetchSpecificArticle(id);
        if (!article) {
            return res.status(404).send("Article non trouvé");
        }
        return res.status(200).send(article);
    } catch (error) {
        console.error("Error fetching article by ID:", error);
        return res.status(500).send("Erreur");
    }
};

exports.getArticles = async (req, res) => {
    try {
        const articles = await articleService.fetchArticles();
        return res.status(200).send(articles);
    } catch (error) {
        console.error("Error fetching articles:", error);
        return res.status(500).send("Erreur");
    }
};

exports.updateArticle = async (req, res) => {
    const id = req.params.id;
    const { nom, prix, type_article } = req.body;
    const image_path = req.file ? `/images/articles/${req.file.filename}` : null;
    try {
        const data = await articleService.updateArticle(id, nom, prix, type_article, image_path);
        return res.status(200).send(data);
    } catch (error) {
        console.error("Error updating article:", error);
        return res.status(500).send("Erreur");
    }
};