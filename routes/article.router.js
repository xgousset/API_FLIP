const express = require('express');
const articleController = require('../controller/article.controller');
const articleMiddleware = require('../middlewares/article.middleware');
var router = express.Router();

router.post("/", articleMiddleware.validateArticle, articleController.saveArticle);
/**
 * @swagger
 * /api/articles:
 *   post:
 *     description: Used to create a new article
 *     tags:
 *       - articles
 *     parameters:
 *       - in: body
 *         name: article
 *         description: Article data to create a new article
 *         schema:
 *           type: object
 *           required:
 *             - nom
 *             - description
 *             - stocks
 *             - prix
 *     responses:
 *       '200':
 *         description: Article created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

router.get("/", articleController.getArticles);
/**
 * @swagger
 * /api/articles:
 *   get:
 *     description: Used to get all articles
 *     tags:
 *       - articles
 *     responses:
 *       '200':
 *         description: Successfully retrieved articles
 *       '500':
 *         description: Internal server error
 */

router.get("/:id", articleController.getArticleById);
/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     description: Used to get an article by ID
 *     tags:
 *       - articles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the article to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved article
 *       '404':
 *         description: Article not found
 *       '500':
 *         description: Internal server error
 */

router.put("/:id", articleMiddleware.validateArticle, articleController.updateArticle);
/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     description: Used to update an article by ID
 *     tags:
 *       - articles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the article to update
 *         schema:
 *           type: string
 *       - in: body
 *         name: article
 *         description: Article data to update
 *         schema:
 *           type: object
 *           required:
 *             - nom
 *             - description
 *             - stocks
 *             - prix
 *     responses:
 *       '200':
 *         description: Article updated successfully
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Article not found
 *       '500':
 *         description: Internal server error
 */

router.delete("/:id", articleController.deleteArticle);
/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     description: Used to delete an article by ID
 *     tags:
 *       - articles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the article to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Article deleted successfully
 *       '404':
 *         description: Article not found
 *       '500':
 *         description: Internal server error
 */
module.exports = router;