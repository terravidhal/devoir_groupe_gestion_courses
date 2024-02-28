// ---------------------------------------------------
// CONTROLLER SETUP - Instructor
// ---------------------------------------------------

// 1) Importing External Libraries
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// 2) Importing Model
const InstructorModel = require("../models/instructor.model");

//const StudentModel = require("../models/student.model");

// 3) Exporting Controller functions
module.exports = {


  // I) REGISTER
  register: (req, res) => {
    // i) Créer une instance d’utilisateur avec des informations transmises dans la requête body
    // (cela déclenche la création de notre champ virtuel)
    const newInstructor = new InstructorModel(req.body);
    // ii) Enregistrer dans la base de données instance newInstructor
    newInstructor
      .save()
      .then((newInstructor) => {
        res
          .status(201)
          .json({ message: "Instructor successfully created", instructor: newInstructor });
      })
      .catch((err) => {
        if (err.name === "ValidationError") {
          return res
            .status(400)
            .json({ message: "Validation Errors", errors: err });
        }
        res.status(500).json({ message: "Something went wrong", errors: err });
      });
  },


  // VIII) CREATE INSTRUCTOR
createInstructor: (req, res) => {
   // i) Créer une instance d’utilisateur avec des informations transmises dans la requête body
    // (cela déclenche la création de notre champ virtuel)
    const newInstructor = new InstructorModel(req.body);
    // ii) Enregistrer dans la base de données instance newInstructor
    newInstructor
      .save()
      .then((newInstructor) => {
        res
          .status(201)
          .json({ message: "Instructor successfully created", instructor: newInstructor });
      })
      .catch((err) => {
        if (err.name === "ValidationError") {
          return res
            .status(400)
            .json({ message: "Validation Errors", errors: err });
        }
        res.status(500).json({ message: "Something went wrong", errors: err });
      });
},




  // IV) READ ALL
  findAllInstructors: (req, res) => {
    InstructorModel.find({})
      .then((allInstructors) => res.status(200).json(allInstructors))
      .catch((err) =>
        res.status(500).json({ message: "Something went wrong", error: err })
      );
  },

  // find instructor by id
  findOneSingleInstructor : (req, res) => {
    InstructorModel.findOne({ _id: req.params.id })
        .then(oneSingleInstructor => {
          console.log("oneSingleInstructor",oneSingleInstructor);
            res.json({ oneSingleInstructor })
        })
        .catch((err) => {
             res.status(400).json(err) 
        });
  },


  // find instructors by many ids
findInstructorsByManyId: (req, res) => {
//  const { ids } = req.body; // Récupère les IDs depuis le corps de la requête
  const { ids } = req.params.id; // Récupère les IDs depuis le corps de la requête

  // Vérifie si la liste d'IDs est vide
  if (!ids || ids.length === 0) {
    return res.status(400).json({ message: "Liste d'IDs vide." });
  }

  // Requête pour trouver les utilisateurs correspondants aux IDs
  InstructorModel.find({ _id: { $in: ids } })
    .then((instructors) => {
      // Si aucun utilisateur n'est trouvé
      if (!instructors || instructors.length === 0) {
        return res.status(404).json({ message: "Aucun utilisateur trouvé." });
      }

      // Réponse avec les utilisateurs trouvés
      res.json({ instructors });
    })
    .catch((err) => {
      // Erreur lors de la requête
      res.status(400).json(err);
    });
},



  // VI) DELETE ALL
  deleteAllInstructors: (req, res) => {
    InstructorModel.deleteMany({})
      .then((result) => res.status(200).json({ result }))
      .catch((err) =>
        res.status(500).json({ message: "Something went wrong", error: err })
      );
  },

  /*AJOUT*/ 
  // VII) UPDATE EXISTING INSTRUCTOR
updateExistingInstructor: (req, res) => {
  const instructorId = req.params.id; // Obtenez l'ID de l'utilisateur à mettre à jour
  const updatedData = req.body; // Les nouvelles données à mettre à jour

  InstructorModel.findByIdAndUpdate(instructorId, updatedData, { new: true })
    .then((updatedInstructor) => {
      if (!updatedInstructor) {
        return res.status(404).json({ message: "Instructor not found" });
      }
      res.status(200).json(updatedInstructor);
    })
    .catch((err) =>
      res.status(500).json({ message: "Something went wrong", error: err })
    );
},





// IX) DELETE ONE SPECIFIC INSTRUCTOR
deleteOneSpecificInstructor: (req, res) => {
  const instructorId = req.params.id; // Obtenez l'ID de l'utilisateur à supprimer

  InstructorModel.findByIdAndDelete(instructorId)
    .then((deletedInstructor) => {
      if (!deletedInstructor) {
        return res.status(404).json({ message: "Instructor not found" });
      }
      res.status(200).json({ message: "Instructor deleted successfully" });
    })
    .catch((err) =>
      res.status(500).json({ message: "Something went wrong", error: err })
    );
},

}  













