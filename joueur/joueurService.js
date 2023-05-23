const { json } = require("express");
var Joueur = require("./joueurModule");
var Partie = require("../partie/partieModule");

const addJoueur = (req, res, next) => {
  new Joueur({
    pseudo: req.body.pseudo,
    sante: 100,
    score: 0,
  }).save((err, data) => {
    if (err) console.log(err);
    else {
      console.log(data);
      res.json(data);
    }
  });
};

const getAllJoueur = (req, res, next) => {
  Joueur.find((err, data) => {
    if (err) console.log(err);
    else {
      console.log(data);
      res.json(data);
    }
  });
};

const getJoueurById = (req, res, next) => {
  Joueur.findOne({ id: req.params.id }, (err, data) => {
    if (err) console.log(err);
    else {
      console.log(data);
      res.json(data);
    }
  });
};

const deleteJoueur = (req, res, next) => {
  Joueur.deleteOne({ id: req.params.id }, (err, data) => {
    if (err) console.log(err);
    else {
      console.log(data);
      res.json(data);
    }
  });
};

const attaque = (req, res, next) => {
  let attaque = Joueur.findById({ id: req.params.idAttaque });
  Joueur.updateOne(
    { id: req.params.idAttaque },
    { $set: { score: score + 10 } },
    (err, data) => {
      if (err) console.log(err);
      else {
        console.log(data);
        res.json(data);
      }
    }
  );
  let victime = Joueur.findById({ id: req.params.idVictime });
  Joueur.updateOne(
    { id: req.params.idVictime },
    { $set: { health: health - 20 } },
    (err, data) => {
      if (err) console.log(err);
      else {
        console.log(data);
        res.json(data);
      }
    }
  );
};

const addPartie = (req, res, next) => {
  new Partie({
    nom: req.body.nom,
    joueur_1: req.body.idJoueur_1,
    joueur_2: req.body.idJoueur_2,
    etat: "en cours",
  }).save((err, data) => {
    if (err) console.log(err);
    else {
      console.log(data);
      res.json(data);
    }
  });
};

module.exports = {
  addJoueur,
  getAllJoueur,
  getJoueurById,
  deleteJoueur,
  attaque,
  addPartie,
};
