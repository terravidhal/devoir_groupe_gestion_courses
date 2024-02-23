// ---------------------------------------------------
// CONTROLLER SETUP - Student
// ---------------------------------------------------

// 1) Importing External Libraries
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// 2) Importing Model
const StudentModel = require("../models/student.model");

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


   // II) LOGIN
   login: (req, res) => {
    // Rechercher l’utilisateur qui correspond à l’adresse e-mail saisie par l’utilisateur
    StudentModel.findOne({ email: req.body.email })
      .then((student) => {
        if (student === null) {
          // ERROR 1: email address is not in DB
          res.status(400).json({ message: "Login Error" });
        } else {
          // Si un utilisateur valide avec une adresse e-mail est trouvé, vérifiez le mot de passe
          bcrypt
            .compare(req.body.password, student.password)
            .then((isPasswordValid) => {
              // Si le mot de passe est valide, créez un jeton et envoyez-le au client par un cookie
              if (isPasswordValid) {
                // i) Créer un jeton pour stocker des informations à l’aide de JWT
                const studentInfo = {
                  _id: student._id,
                  name: student.name,
                  email: student.email,
                };
                console.log("studentInfo: ", studentInfo);
                const studentToken = jwt.sign(studentInfo, process.env.JWT_SECRET); // "JWT_SECRET" clé defini dns le fichier .env

                // ii) Créer un cookie dans la réponse HTTP et y attacher un jeton signé
                const cookieOptions = {
                  httpOnly: true, // cela fera en sorte que que les cookies sont essentiellement invisibles pour le JavaScript côté client et ne peuvent être lus que par le serveur
                  expires: new Date(Date.now() + 900000000), // temps jusqu'à ce qu'il doive se connecter à nouveau
                };
                
                // réponse
                res
                  .cookie("studenttoken", studentToken, cookieOptions)
                  .status(200)
                  .json({ message: "Successfully logged in", student: studentInfo });
              } else {
                // ERROR 2: password does not match
                res.status(400).json({ message: "Login Error" });
              }
            })
            .catch((err) => {
              // ERROR 3: bcrypt.compare() failed (problem with promise)
              res.status(400).json({ message: "Login Error" });
            });
        }
      })
      .catch((err) => {
        // ERROR 4: findOne() failed (problem with promise)
        res.status(400).json({ message: "Login Error" });
      });
  },


  // III) LOGOUT
  logout: (req, res) => {
    // clear the cookie from the response
    res.clearCookie("studenttoken");
    res.status(200).json({
      message: "You have successfully logged out of our system",
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
  deleteAllStudents: (req, res) => {
    StudentModel.deleteMany({})
      .then((result) => res.status(200).json({ result }))
      .catch((err) =>
        res.status(500).json({ message: "Something went wrong", error: err })
      );
  },

  /*AJOUT*/ 
  // VII) UPDATE EXISTING STUDENT
updateExistingStudent: (req, res) => {
  const studentId = req.params.id; // Obtenez l'ID de l'utilisateur à mettre à jour
  const updatedData = req.body; // Les nouvelles données à mettre à jour

  StudentModel.findByIdAndUpdate(studentId, updatedData, { new: true })
    .then((updatedStudent) => {
      if (!updatedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.status(200).json(updatedStudent);
    })
    .catch((err) =>
      res.status(500).json({ message: "Something went wrong", error: err })
    );
},


// VIII) CREATE STUDENT
createStudent: (req, res) => {
  const studentData = req.body; // Les données de l'utilisateur à créer

  StudentModel.create(studentData)
    .then((newStudent) => {
      res.status(201).json(newStudent);
    })
    .catch((err) =>
      res.status(500).json({ message: "Something went wrong", error: err })
    );
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














