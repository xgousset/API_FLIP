const express = require('express');
const articleController = require('../controller/article.controller');
const articleMiddleware = require('../middlewares/article.middleware');
var router = express.Router();

router.post("/",articleMiddleware.validateArticle,articleController.saveArticle)
/**
 * @swagger
 * /api/article:
 *  post:
 *    description: Used to create a new article
 *    tags:
 *      - articles
 *    parameters:
 *      - name: body
 *        in: body
 *        required: true
 *        description: Details of the article to create
 *        schema:
 *          type: object
 *          required:
 *            - nom_produit
 *            - description_produit
 *            - stocks
 *            - prix_produit
 *            - id
 *          properties:
 *            nom_produit:
 *              type: string
 *              description: Name of the product
 *            description_produit:
 *              type: string
 *              description: Description of the product
 *            stocks:
 *              type: integer
 *              description: Stock count of the product
 *            prix_produit:
 *              type: number
 *              format: float
 *              description: Price of the product
 *            id:
 *              type: string
 *              description: Unique identifier for the product
 *    responses:
 *      '200':
 *        description: Article created successfully
 *      '400':
 *        description: Bad request
 *      '500':
 *        description: Internal server error
 */

router.get("/",articleController.getArticles)
/**
 * @swagger
 * /api/article:
 *  get:
 *    description: Retrieve all articles
 *    tags:
 *      - articles
 *    responses:
 *      '200':
 *        description: A list of articles
 *        schema:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *                description: Unique identifier for the article
 *              nom_produit:
 *                type: string
 *                description: Name of the product
 *              description_produit:
 *                type: string
 *                description: Description of the product
 *              stocks:
 *                type: integer
 *                description: Stock count of the product
 *              prix_produit:
 *                type: number
 *                format: float
 *                description: Price of the product
 *      '400':
 *        description: Bad request
 *      '500':
 *        description: Internal server error
 */



router.get("/:id",articleController.getArticleById)


router.put("/:id",articleMiddleware.validateArticle,articleController.updateArticle)
/**
 * @swagger
 * /api/article/{id}:
 *  put:
 *    description: Used to update an article
 *    tags:
 *      - articles
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID of the article to update
 *        type: string
 *      - name: body
 *        in: body
 *        required: true
 *        description: Updated data for the article
 *        schema:
 *          type: object
 *          required:
 *            - titre
 *            - contenu
 *          properties:
 *            titre:
 *              type: string
 *              description: New title of the article
 *            contenu:
 *              type: string
 *              description: New content of the article
 *    responses:
 *      '200':
 *        description: Article updated successfully
 *      '400':
 *        description: Bad request
 *      '500':
 *        description: Internal server error
 */

router.delete("/:id",articleController.deleteArticle)
/**
 * @swagger
 * /api/article/{id}:
 *  delete:
 *    description: Used to delete an article by ID
 *    tags:
 *      - articles
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID of the article to delete
 *        type: string
 *    responses:
 *      '200':
 *        description: Article deleted successfully
 *      '400':
 *        description: Bad request
 *      '500':
 *        description: Internal server error
 */



module.exports = router;