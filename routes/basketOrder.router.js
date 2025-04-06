const express = require('express');
const basketOrderController = require('../controller/basketOrder.controller');
const router = express.Router();

router.get("/", basketOrderController.getBasket);
/**
 * @swagger
 * /api/basket:
 *   get:
 *     description: Used to get the basket
 *     tags:
 *       - basket
 *     responses:
 *       '200':
 *         description: Successfully retrieved basket
 *       '500':
 *         description: Internal server error
 */

router.get("/:id", basketOrderController.getBasketById);
/**
 * @swagger
 * /api/basket/{id}:
 *   get:
 *     description: Used to get a specific basket
 *     tags:
 *       - basket
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Basket ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successfully retrieved basket
 *       '404':
 *         description: Basket not found
 *       '500':
 *         description: Internal server error
 */

router.post("/", basketOrderController.createBasket);
/**
 * @swagger
 * /api/basket:
 *   post:
 *     description: Used to create a basket
 *     tags:
 *       - basket
 *     parameters:
 *       - in: body
 *         name: basket
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id_utilisateur:
 *               type: integer
 *               example: 1
 *             type:
 *               type: string
 *               example: 'jeux'
 *     responses:
 *       '201':
 *         description: Successfully created basket
 *       '500':
 *         description: Internal server error
 */

router.delete("/:id", basketOrderController.deleteBasket);
/**
 * @swagger
 * /api/basket/{id}:
 *   delete:
 *     description: Used to delete a specific basket
 *     tags:
 *       - basket
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Basket ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successfully deleted basket
 *       '500':
 *         description: Internal server error
 */

router.post("/addProduct", basketOrderController.addProductToBasket);
/**
 * @swagger
 * /api/basket/addProduct:
 *   post:
 *     description: Used to add a product to the basket
 *     tags:
 *       - basket
 *     parameters:
 *       - in: body
 *         name: product
 *         description: Product data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id_produit:
 *               type: integer
 *               example: 1
 *             id_user:
 *               type: integer
 *               example: 1
 *             quantite:
 *               type: integer
 *               example: 3
 *     responses:
 *       '201':
 *         description: Successfully added product to basket
 *       '500':
 *         description: Internal server error
 */

router.put("/removeProduct", basketOrderController.removeProductFromBasket);
/**
 * @swagger
 * /api/basket/removeProduct:
 *   put:
 *     description: Used to remove a product from the basket
 *     tags:
 *       - basket
 *     parameters:
 *       - in: body
 *         name: product
 *         description: Product data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id_produit:
 *               type: integer
 *               example: 1
 *             id_panier:
 *               type: integer
 *               example: 1
 *             quantite:
 *               type: integer
 *               example: 3
 *     responses:
 *       '200':
 *         description: Successfully removed product from basket
 *       '500':
 *         description: Internal server error
 */

router.put("/updateProduct", basketOrderController.updateAmmountOfInBasket);
/**
 * @swagger
 * /api/basket/updateProduct:
 *   put:
 *     description: Used to update a product in the basket
 *     tags:
 *       - basket
 *     parameters:
 *       - in: body
 *         name: product
 *         description: Product data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id_produit:
 *               type: integer
 *               example: 1
 *             id_panier:
 *               type: integer
 *               example: 1
 *             quantite:
 *               type: integer
 *               example: 3
 *     responses:
 *       '200':
 *         description: Successfully updated product in basket
 *       '500':
 *         description: Internal server error
 */

router.get("/userHistory/:id_utilisateur", basketOrderController.fetchUserHistoric);
/**
 * @swagger
 * /api/basket/userHistory/{id_utilisateur}:
 *   get:
 *     description: Used to get the user's historic
 *     tags:
 *       - basket
 *     parameters:
 *       - in: path
 *         name: id_utilisateur
 *         description: User ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successfully retrieved user's historic
 *       '500':
 *         description: Internal server error
 */

router.get("/specificOrder/:id", basketOrderController.fetchSpecificOrderInHistoric);
/**
 * @swagger
 * /api/basket/specificOrder/{id}:
 *   get:
 *     description: Used to get a specific order in the historic
 *     tags:
 *       - basket
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Order ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successfully retrieved specific order
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Internal server error
 */

router.post("/sendBasket/:id", basketOrderController.sendBasketToHistoric);
/**
 * @swagger
 * /api/basket/sendBasket/{id}:
 *   post:
 *     description: Used to send the basket to the historic
 *     tags:
 *       - basket
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Basket ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '201':
 *         description: Successfully sent basket to historic
 *       '500':
 *         description: Internal server error
 */



router.get("/userBasket/:id_utilisateur", basketOrderController.getBasketByUserId);
/**
 * @swagger
 * /api/basket/userBasket/{id_utilisateur}:
 *   get:
 *     description: Used to get the user's basket
 *     tags:
 *       - basket
 *     parameters:
 *       - in: path
 *         name: id_utilisateur
 *         description: User ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successfully retrieved user's basket
 *       '500':
 *         description: Internal server error
 */


router.get("/basketContent/:id_panier", basketOrderController.getBasketContent);
/**
 * @swagger
 * /api/basket/basketContent/{id_panier}:
 *   get:
 *     description: Used to get the basket content
 *     tags:
 *       - basket
 *     parameters:
 *       - in: path
 *         name: id_panier
 *         description: Basket ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successfully retrieved basket content
 *       '500':
 *         description: Internal server error
 */

module.exports = router;