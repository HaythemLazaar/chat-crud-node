var express = require("express");
var Service = require("./joueurService");
var router = express.Router();

router.post("/newjoueur", Service.addJoueur);
router.get("/getalljoueur", Service.getAllJoueur);
router.get("/getjoueur/:id", Service.getJoueurById);
router.delete("/deletejoueur/:id", Service.deleteJoueur);
router.put("/attaque/:idAttaque/:idVictime", Service.attaque);
router.post("/newpartie", Service.addPartie);

module.exports = router;
