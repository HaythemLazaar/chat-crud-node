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
  Joueur.findById({ _id: req.params.id }, (err, data) => {
    if (err) console.log(err);
    else {
      console.log(data);
      if (res) res.json(data);
      else return data;
    }
  });
};

const deleteJoueur = (req, res, next) => {
  Joueur.deleteOne({ _id: req.params.id }, (err, data) => {
    if (err) console.log(err);
    else {
      console.log(data);
      res.json(data);
    }
  });
};

const attaque = async (req, res, next) => {
  console.log(req.params);
  Joueur.findByIdAndUpdate(
    { _id: req.params.idAttaque },
    { $inc: { score: 10 } },
    (err, data) => {
      if (err) console.log(err);
      else {
        console.log(data);
      }
    }
  );

  Joueur.findByIdAndUpdate(
    { _id: req.params.idVictime },
    { $inc: { sante: -20 } },
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
    joueur_1: req.body.joueur_1,
    joueur_2: req.body.joueur_2,
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
