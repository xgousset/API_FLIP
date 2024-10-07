const express = require('express');
const userController = require('./controllers/users.controller');
const userMiddleware = require('./middlewares/users.middleware');
var router = express.Router();

router.post("/",userMiddleware.validateUser,userController.saveUser)
router.get("/",userController.getUsers)
router.get("/:id",userController.getUserById)
module.exports = router;