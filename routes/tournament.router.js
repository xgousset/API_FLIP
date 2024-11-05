const expresss = require('express');
const tournamentController = require('../controller/tournament.controller');
const tournamentMiddleware = require('../middlewares/tournament.middleware');
var router = expresss.Router();

router.post("/",tournamentMiddleware.validateTournament,tournamentController.saveTournament)
router.get("/",tournamentController.getTournaments)
router.get("/:id",tournamentController.getTournamentById)
router.put("/:id",tournamentMiddleware.validateTournament,tournamentController.updateTournament)
router.delete("/:id",tournamentController.deleteTournament)
module.exports = router;