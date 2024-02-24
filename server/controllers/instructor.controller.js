// ---------------------------------------------------
// CONTROLLER SETUP - Instructor
// ---------------------------------------------------

// 1) Importing External Libraries
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// 2) Importing Model
const InstructorModel = require("../models/instructor.model");

const StudentModel = require("../models/student.model");

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


   // II) LOGIN
   /*
   login: (req, res) => {
    // Rechercher l’utilisateur qui correspond à l’adresse e-mail saisie par l’utilisateur
    InstructorModel.findOne({ email: req.body.email })
      .then((instructor) => {
        if (instructor === null) {
          // ERROR 1: email address is not in DB
          res.status(400).json({ message: "Login Error" });
        } else {
          // Si un utilisateur valide avec une adresse e-mail est trouvé, vérifiez le mot de passe
          bcrypt
            .compare(req.body.password, instructor.password)
            .then((isPasswordValid) => {
              // Si le mot de passe est valide, créez un jeton et envoyez-le au client par un cookie
              if (isPasswordValid) {
                // i) Créer un jeton pour stocker des informations à l’aide de JWT
                const instructorInfo = {
                  _id: instructor._id,
                  name: instructor.name,
                  email: instructor.email,
                };
                console.log("instructorInfo: ", instructorInfo);
                const instructorToken = jwt.sign(instructorInfo, process.env.JWT_SECRET); // "JWT_SECRET" clé defini dns le fichier .env

                // ii) Créer un cookie dans la réponse HTTP et y attacher un jeton signé
                const cookieOptions = {
                  httpOnly: true, // cela fera en sorte que que les cookies sont essentiellement invisibles pour le JavaScript côté client et ne peuvent être lus que par le serveur
                  expires: new Date(Date.now() + 900000000), // temps jusqu'à ce qu'il doive se connecter à nouveau
                };
                
                // réponse
                res
                  .cookie("instructortoken", instructorToken, cookieOptions)
                  .status(200)
                  .json({ message: "Successfully logged in", instructor: instructorInfo });
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
  }, */


  // II) LOGIN
  
  login: async (req, res) => {
    const { email, password, userType } = req.body;
  
    let user;
    switch (userType) {
      case "student":
        user = await StudentModel.findOne({ email });
        break;
      case "instructor":
        user = await InstructorModel.findOne({ email });
        break;
      default:
        return res.status(400).json({ message: "Invalid user type" });
    }
  
    if (!user) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }
  
    // Générer un jeton JWT et définir un cookie
    const userInfo = {
      _id: user._id,
      name: user.name,
      email: user.email,
      userType,
    };
    const token = jwt.sign(userInfo, process.env.JWT_SECRET);
  
    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 900000000),
    };
  
    res.cookie(`usertoken`, token, cookieOptions).json({
      message: "Successfully logged in",
      user: userInfo,
    });
  },
  


  // III) LOGOUT
  logout: (req, res) => {
    // clear the cookie from the response
    res.clearCookie("instructortoken");
    res.status(200).json({
      message: "You have successfully logged out of our system",
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


// VIII) CREATE INSTRUCTOR
createInstructor: (req, res) => {
  const instructorData = req.body; // Les données de l'utilisateur à créer

  InstructorModel.create(instructorData)
    .then((newInstructor) => {
      res.status(201).json(newInstructor);
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













