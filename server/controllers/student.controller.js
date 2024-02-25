// ---------------------------------------------------
// CONTROLLER SETUP - Student
// ---------------------------------------------------

// 1) Importing External Libraries
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// 2) Importing Model
const StudentModel = require("../models/student.model");

const InstructorModel = require("../models/instructor.model");

const UserModel = require("../models/user.model");

// 3) Exporting Controller functions
module.exports = {


  // I) REGISTER
  register: (req, res) => {
    // i) Créer une instance d’utilisateur avec des informations transmises dans la requête body
    // (cela déclenche la création de notre champ virtuel)
    const newStudent = new StudentModel(req.body);
    // ii) Enregistrer dans la base de données instance newStudent
    newStudent
      .save()
      .then((newStudent) => {
        res
          .status(201)
          .json({ message: "Student successfully created", student: newStudent });
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
  findAllStudents: (req, res) => {
    StudentModel.find({})
      .then((allStudents) => res.status(200).json(allStudents))
      .catch((err) =>
        res.status(500).json({ message: "Something went wrong", error: err })
      );
  },

  // find student by id
  findOneSingleStudent : (req, res) => {
    StudentModel.findOne({ _id: req.params.id })
        .then(oneSingleStudent => {
          console.log("oneSingleStudent",oneSingleStudent);
            res.json({ oneSingleStudent })
        })
        .catch((err) => {
             res.status(400).json(err) 
        });
  },


  // find students by many ids
findStudentsByManyId: (req, res) => {
//  const { ids } = req.body; // Récupère les IDs depuis le corps de la requête
  const { ids } = req.params.id; // Récupère les IDs depuis le corps de la requête

  // Vérifie si la liste d'IDs est vide
  if (!ids || ids.length === 0) {
    return res.status(400).json({ message: "Liste d'IDs vide." });
  }

  // Requête pour trouver les utilisateurs correspondants aux IDs
  StudentModel.find({ _id: { $in: ids } })
    .then((students) => {
      // Si aucun utilisateur n'est trouvé
      if (!students || students.length === 0) {
        return res.status(404).json({ message: "Aucun utilisateur trouvé." });
      }

      // Réponse avec les utilisateurs trouvés
      res.json({ students });
    })
    .catch((err) => {
      // Erreur lors de la requête
      res.status(400).json(err);
    });
},




  // VI) DELETE ALL
 /* deleteAllStudents: (req, res) => {
    StudentModel.deleteMany({})
      .then((result) => res.status(200).json({ result }))
      .catch((err) =>
        res.status(500).json({ message: "Something went wrong", error: err })
      );
  },  */

  /*AJOUT*/ 
  // VII) UPDATE EXISTING STUDENT

updateExistingStudent : async (req, res) => {
  const { id, name, email, fieldOfStudy, levelStudent, password } = req.body;

  // Authentification et autorisation (à implémenter)

  // Validation des données (à implémenter)

  const student = await StudentModel.findById(id);
  if (!student) {
    return res.status(404).json({ message: "Étudiant introuvable" });
  }

  student.name = name;
  student.email = email;
  student.fieldOfStudy = fieldOfStudy;
  student.levelStudent = levelStudent;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  student.password = hashedPassword;

  await student.save();

  res.status(200).json({ message: "Étudiant mis à jour avec succès", student });
},

// IX) DELETE ONE SPECIFIC STUDENT
deleteOneSpecificStudent: (req, res) => {
  const studentId = req.params.id; // Obtenez l'ID de l'utilisateur à supprimer

  StudentModel.findByIdAndDelete(studentId)
    .then((deletedStudent) => {
      if (!deletedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.status(200).json({ message: "Student deleted successfully" });
    })
    .catch((err) =>
      res.status(500).json({ message: "Something went wrong", error: err })
    );
},

}  













