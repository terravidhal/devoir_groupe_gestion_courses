// ---------------------------------------------------
// CONTROLLER SETUP - User
// ---------------------------------------------------

// 1) Importing External Libraries
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// 2) Importing Model
const UserModel = require("../models/user.model");

// 3) Exporting Controller functions
module.exports = {


  // I) REGISTER
  register: (req, res) => {
    // i) Créer une instance d’utilisateur avec des informations transmises dans la requête body
    // (cela déclenche la création de notre champ virtuel)
    const newUser = new UserModel(req.body);
    // ii) Enregistrer dans la base de données instance newUser
    newUser
      .save()
      .then((newUser) => {
        res
          .status(201)
          .json({ message: "User successfully created", user: newUser });
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
    UserModel.findOne({ email: req.body.email })
      .then((user) => {
        if (user === null) {
          // ERROR 1: email address is not in DB
          res.status(400).json({ message: "Login Error" });
        } else {
          // Si un utilisateur valide avec une adresse e-mail est trouvé, vérifiez le mot de passe
          bcrypt
            .compare(req.body.password, user.password)
            .then((isPasswordValid) => {
              // Si le mot de passe est valide, créez un jeton et envoyez-le au client par un cookie
              if (isPasswordValid) {
                // i) Créer un jeton pour stocker des informations à l’aide de JWT
                const userInfo = {
                  _id: user._id,
                  name: user.name,
                  email: user.email,
                };
                console.log("userInfo: ", userInfo);
                const userToken = jwt.sign(userInfo, process.env.JWT_SECRET); // "JWT_SECRET" clé defini dns le fichier .env

                // ii) Créer un cookie dans la réponse HTTP et y attacher un jeton signé
                const cookieOptions = {
                  httpOnly: true, // cela fera en sorte que que les cookies sont essentiellement invisibles pour le JavaScript côté client et ne peuvent être lus que par le serveur
                  expires: new Date(Date.now() + 900000000), // temps jusqu'à ce qu'il doive se connecter à nouveau
                };
                
                // réponse
                res
                  .cookie("usertoken", userToken, cookieOptions)
                  .status(200)
                  .json({ message: "Successfully logged in", user: userInfo });
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
    res.clearCookie("usertoken");
    res.status(200).json({
      message: "You have successfully logged out of our system",
    });
  },


  // IV) READ ALL
  findAllUsers: (req, res) => {
    UserModel.find({})
      .then((allUsers) => res.status(200).json(allUsers))
      .catch((err) =>
        res.status(500).json({ message: "Something went wrong", error: err })
      );
  },

  // find user by id
  findOneSingleUser : (req, res) => {
    UserModel.findOne({ _id: req.params.id })
        .then(oneSingleUser => {
          console.log("oneSingleUser",oneSingleUser);
            res.json({ oneSingleUser })
        })
        .catch((err) => {
             res.status(400).json(err) 
        });
  },


  // find users by many ids
findUsersByManyId: (req, res) => {
//  const { ids } = req.body; // Récupère les IDs depuis le corps de la requête
  const { ids } = req.params.id; // Récupère les IDs depuis le corps de la requête

  // Vérifie si la liste d'IDs est vide
  if (!ids || ids.length === 0) {
    return res.status(400).json({ message: "Liste d'IDs vide." });
  }

  // Requête pour trouver les utilisateurs correspondants aux IDs
  UserModel.find({ _id: { $in: ids } })
    .then((users) => {
      // Si aucun utilisateur n'est trouvé
      if (!users || users.length === 0) {
        return res.status(404).json({ message: "Aucun utilisateur trouvé." });
      }

      // Réponse avec les utilisateurs trouvés
      res.json({ users });
    })
    .catch((err) => {
      // Erreur lors de la requête
      res.status(400).json(err);
    });
},




  // V) READ ALL Users By Role Student
  findAllUsersByRoleStudent: (req, res) => {
    UserModel.find({role: 'student'})
      .then((allUsersByRoleStudent) => res.status(200).json(allUsersByRoleStudent))
      .catch((err) =>
       // res.status(500).json({ message: "Something went wrong", error: err })
        res.status(400).json({ message: "Something went wrong" })
      );
  },


  // VI) DELETE ALL
  deleteAllUsers: (req, res) => {
    UserModel.deleteMany({})
      .then((result) => res.status(200).json({ result }))
      .catch((err) =>
        res.status(500).json({ message: "Something went wrong", error: err })
      );
  },

  /*AJOUT*/ 
  // VII) UPDATE EXISTING USER
updateExistingUser: (req, res) => {
  const userId = req.params.id; // Obtenez l'ID de l'utilisateur à mettre à jour
  const updatedData = req.body; // Les nouvelles données à mettre à jour

  UserModel.findByIdAndUpdate(userId, updatedData, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(updatedUser);
    })
    .catch((err) =>
      res.status(500).json({ message: "Something went wrong", error: err })
    );
},


// VIII) CREATE USER
createUser: (req, res) => {
  const userData = req.body; // Les données de l'utilisateur à créer

  UserModel.create(userData)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((err) =>
      res.status(500).json({ message: "Something went wrong", error: err })
    );
},


// IX) DELETE ONE SPECIFIC USER
deleteOneSpecificUser: (req, res) => {
  const userId = req.params.id; // Obtenez l'ID de l'utilisateur à supprimer

  UserModel.findByIdAndDelete(userId)
    .then((deletedUser) => {
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    })
    .catch((err) =>
      res.status(500).json({ message: "Something went wrong", error: err })
    );
},

}  















