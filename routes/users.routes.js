const express = require('express');
const userController = require('../controller/users.controllers');
const userMiddleware = require('../middlewares/users.middleware');
var router = express.Router();

router.post("/",userMiddleware.validateUser,userController.saveUser)
router.get("/",userController.getUsers)
router.get("/:id",userController.getUserById)
router.get("/:id",userController.checkPassword)
router.get("/:id",userController.getUsersAttributes)
module.exports = router;