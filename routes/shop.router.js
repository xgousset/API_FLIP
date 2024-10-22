const express = require('express');
const shopController = require('../controller/shop.controller');
const shopMiddleware = require('../middlewares/shop.middleware');
var router = express.Router();

router.post("/",shopMiddleware.validateShop,shopController.saveShop)
router.get("/",shopController.getShops)
router.get("/:id",shopController.getShopById)
router.put("/:id",shopMiddleware.validateShop,shopController.updateShop)
router.delete("/:id",shopController.deleteShop)
module.exports = router;
