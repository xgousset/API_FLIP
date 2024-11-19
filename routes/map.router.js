const express = require('express');
const articleController = require('../controller/map.controller');
var router = express.Router();


router.get("/lots",articleController.getLots)
/**
 * @swagger
 * /api/map/lots:
 *  get:
 *    description: Retrieve all lots from the map
 *    tags:
 *      - map
 *    responses:
 *      '200':
 *        description: A list of all lots
 *        schema:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              id_emplacement:
 *                type: integer
 *                description: Unique identifier of the lot
 *              coordonnees_x:
 *                type: string
 *                description: X coordinate of the lot
 *              coordonnees_y:
 *                type: string
 *                description: Y coordinate of the lot
 *              reserve:
 *                type: boolean
 *                description: Whether the lot is reserved (true) or not (false)
 *      '400':
 *        description: Bad request
 *      '500':
 *        description: Internal server error
 */



router.get("/lots/free",articleController.getFreeLot)
/**
 * @swagger
 * /api/map/free-lots:
 *  get:
 *    description: Retrieve all free lots from the map
 *    tags:
 *      - map
 *    responses:
 *      '200':
 *        description: A list of free lots
 *        schema:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              id_emplacement:
 *                type: integer
 *                description: Unique identifier of the lot
 *              coordonnees_x:
 *                type: string
 *                description: X coordinate of the lot
 *              coordonnees_y:
 *                type: string
 *                description: Y coordinate of the lot
 *              reserve:
 *                type: boolean
 *                description: Whether the lot is reserved (true) or not (false)
 *      '400':
 *        description: Bad request
 *      '500':
 *        description: Internal server error
 */

router.get("/lots/occupied",articleController.getOccupiedLot)
/**
 * @swagger
 * /api/map/occupied-lots:
 *  get:
 *    description: Retrieve all occupied lots from the map
 *    tags:
 *      - map
 *    responses:
 *      '200':
 *        description: A list of occupied lots
 *        schema:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              id_emplacement:
 *                type: integer
 *                description: Unique identifier of the lot
 *              coordonnees_x:
 *                type: string
 *                description: X coordinate of the lot
 *              coordonnees_y:
 *                type: string
 *                description: Y coordinate of the lot
 *              reserve:
 *                type: boolean
 *                description: Whether the lot is reserved (true) or not (false)
 *      '400':
 *        description: Bad request
 *      '500':
 *        description: Internal server error
 */


router.put("/lots/:id",articleController.deleteLot)
/**
 * @swagger
 * /api/map/lot/{id}:
 *  delete:
 *    description: Delete or free up a lot by its ID
 *    tags:
 *      - map
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID of the lot to delete or free
 *        type: string
 *    responses:
 *      '200':
 *        description: Lot deleted or freed successfully
 *      '400':
 *        description: Bad request
 *      '500':
 *        description: Internal server error
 */


router.post("/lots/:id",articleController.asignLot)
/**
 * @swagger
 * /api/map/{id}/assign-lot:
 *  put:
 *    description: Assign a lot to a map location
 *    tags:
 *      - map
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID of the map location
 *        type: string
 *      - name: body
 *        in: body
 *        required: true
 *        description: Details of the lot to assign
 *        schema:
 *          type: object
 *          required:
 *            - id_lot
 *          properties:
 *            id_lot:
 *              type: string
 *              description: ID of the lot to assign
 *    responses:
 *      '200':
 *        description: Lot assigned successfully
 *      '400':
 *        description: Bad request
 *      '500':
 *        description: Internal server error
 */

module.exports = router;