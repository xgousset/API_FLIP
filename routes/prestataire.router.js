const express = require('express');
const prestataireController = require('../controller/prestataire.controller');
const prestataireMiddleware = require('../middlewares/prestataire.middleware');
var router = express.Router();

router.post("/",prestataireMiddleware.validatePrestataire,prestataireController.savePrestataire)
router.get("/",prestataireController.getPrestataires)
router.get("/:id",prestataireController.getPrestataireById)
router.put("/:id",prestataireMiddleware.validatePrestataire,prestataireController.updatePrestataire)
router.delete("/:id",prestataireController.deletePrestataire)
module.exports = router;