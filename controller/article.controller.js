const articleService = require('../services/article.services');

exports.saveArticle = async (req,res) => {
    const {nom_produit,description_produit,stocks,prix_produit,id} = req.body;
    await articleService.createArticle(nom_produit,description_produit,stocks,prix_produit,id,(error,data)=>{
        if(error){
            return res.status(500).send("Erreur");
        }
        return res.status(200).send(data);
    });
}

exports.deleteArticle = async (req,res) => {
    const id = req.params.id;
    await articleService.deleteArticle(id, (error, data) => {
        if (error) {
            return res.status(500).send("Erreur");
        }
        return res.status(200).send(data);
    });
}


exports.getArticleById = async (req,res) => {
    const id = req.params.id;
    const article = articleService.fetchSpecificArticle(id);
    if(!article){
        return res.status(404).send("Article non trouvé");
    }
    return res.status(200).send(article);
}

exports.getArticles = async (req,res) => {
    const articles = articleService.fetchArticles();
    return res.status(200).send(articles);
}


exports.updateArticle = async (req,res) => {
    const id_produit = req.params.id;
    const {nom_produit,description_produit,stocks,prix_produit,id} = req.body;
    await articleService.updateArticle(id_produit,nom_produit,description_produit,stocks,prix_produit,id,(error,data)=>{
        if(error){
            return res.status(500).send("Erreur");
        }
        return res.status(200).send(data);
    });
}