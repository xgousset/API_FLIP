const express = require('express');
const articleController = require('../controllers/article.controller');
const articleMiddleware = require('../middlewares/article.middleware');
var router = express.Router();

router.post("/",articleMiddleware.validateArticle,articleController.saveArticle)
router.get("/",articleController.getArticles)
router.get("/:id",articleController.getArticleById)
router.put("/:id",articleMiddleware.validateArticle,articleController.updateArticle)
router.delete("/:id",articleController.deleteArticle)
module.exports = router;