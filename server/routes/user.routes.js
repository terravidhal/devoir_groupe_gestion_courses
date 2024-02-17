// ---------------------------------------------------
// ROUTES SETUP - User
// ---------------------------------------------------

// 1) Importing External Libraries
//const express = require("express");

// 2) Importing Controller Methods
const {
  register,
  login,
  logout,
  findAllUsers,
  deleteOneSpecificUser,
  updateExistingUser,
  createUser,
  findAllUsersByRoleStudent,
} = require("../controllers/user.controller");

//3) importing authenticate methods
const { authenticate } = require('../config/jwt.config');

//4) importing verifyRole methods
const { verifyRole } = require('../config/jwt.config');

module.exports = app => {
    app.post("/api/register", register);  
    app.post("/api/login", login);
    app.post("/api/logout", logout); 
    /*AJOUT*/ 
    app.get("/api/users",authenticate, verifyRole(["admin"]), findAllUsers);
    app.get("/api/users/students",authenticate, verifyRole(["admin", "instructor"]), findAllUsersByRoleStudent);
    app.post("/api/users",authenticate, verifyRole(["admin"]), createUser); // si je creer une page pr ça
    app.patch("/api/users/:id",authenticate, verifyRole(["admin"]), updateExistingUser);//
    app.delete("/api/users/:id",authenticate, verifyRole(["admin"]), deleteOneSpecificUser);//
  //  app.delete("/", deleteAllUsers);
    // cette route necessite une authetification de l'utilisateur
   // app.get("/api/users", authenticate, findAllUsers);
}





