// ---------------------------------------------------
// CONFIG SETUP - Authentication
// ---------------------------------------------------

// 1) Importing External Libraries
const jwt = require("jsonwebtoken");

// 1) Importing model course
 const Course = require('../models/course.model');

// 2) Exporting a function for checking authentication
module.exports = {
  authenticate: (req, res, next) => {
    jwt.verify(
      req.cookies.usertoken,
      process.env.JWT_SECRET,
      (err, payload) => {
        if (err) {
          res.status(401).json({ verified: false });
        } else {
          console.log("You are authenticated!");
          next();
        }
      }
    );
  },
  verifyRole: (roles) => {
    return (req, res, next) => {
      // Décoder le jeton JWT
      const token = req.cookies.usertoken;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Vérifier si l'utilisateur a le rôle requis
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Vous n'avez pas les autorisations nécessaires pour effectuer cette action." });
      }

      // Autoriser l'accès au prochain middleware
      next();
    };
  },
  // Nouveau middleware pour vérifier l'instructeur du cours
  verifyInstructor: async (req, res, next) => {
    try {
      const _id = req.params.id; // Récupérer l'ID du cours à partir des paramètres de la requête
      const decoded = jwt.verify(req.cookies.usertoken, process.env.JWT_SECRET);

      // Trouver le cours
      const course = await Course.findById(_id);
      if (!course) {
        return res.status(404).json({ message: "Cours non trouvé" });
      }

      // Vérifier si l'utilisateur est l'instructeur du cours
      if (course.instructor !== decoded._id) {
        return res.status(403).json({ message: "Vous n'êtes pas autorisé à modifier ce cours." });
      }

      // Autoriser l'utilisateur à modifier le cours
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur lors de la vérification de l'instructeur" });
    }
  },
};
