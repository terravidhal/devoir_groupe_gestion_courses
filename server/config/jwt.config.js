// ---------------------------------------------------
// CONFIG SETUP - Authentication
// ---------------------------------------------------

// 1) Importing External Libraries
const jwt = require("jsonwebtoken");

// 1) Importing model course
 const Course = require('../models/course.model');

/*
 // Définir les rôles et les permissions
const roles = {
  admin: {
    permissions: ["*"], // Accès complet
  },
  student: {
    permissions: ["read:profile", "update:profile", "read:courses", "join:courses"],
  },
  teacher: {
    permissions: ["read:courses", "create:courses", "update:courses", "manage:enrollments", "grade:assignments"],
  },
};

// Middleware de vérification des permissions
function hasPermission(permission) {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!roles[userRole].permissions.includes(permission)) {
      return res.status(403).json({ message: "Vous n'avez pas les permissions nécessaires" });
    }
    next();
  };
}  */

/*
// Route protégée par la permission "read:profile"
app.get("/api/profile", hasPermission("read:profile"), (req, res) => {
  // Accès autorisé uniquement aux utilisateurs avec la permission "read:profile"
  res.json({ message: "Votre profil" });
});

// Route protégée par la permission "create:courses"
app.post("/api/courses", hasPermission("create:courses"), (req, res) => {
  // Accès autorisé uniquement aux utilisateurs avec la permission "create:courses"
  // ...
}); */

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
  /*
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
      const decoded = jwt.verify(req.cookies.usertoken, process.env.JWT_SECRET); // La variable decoded contient l'objet JSON décodé du jeton JWT. Cet objet contient les informations de l'utilisateur, telles que son ID, son nom, son rôle

      // Trouver le cours
      const course = await Course.findById(_id);
      if (!course) {
        return res.status(404).json({ message: "Cours non trouvé" });
      } */


      // Vérifier si l'utilisateur est l'instructeur du cours ou l'administrateur
     /* if (course.instructor !== decoded._id ) {
        return res.status(403).json({ message: "Vous n'êtes pas autorisé à modifier ce cours." });
      }*/
      /*
      if (decoded.role !== "admin" || course.instructor !== decoded._id ) {
        return res.status(403).json({ message: "Vous n'êtes pas autorisé à modifier ce cours." });
      }

      // Autoriser l'utilisateur à modifier le cours
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur lors de la vérification de l'instructeur" });
    }
  }, */
};



/**
 * expliquer les differnts 'statuts' rs.status(500)
 */