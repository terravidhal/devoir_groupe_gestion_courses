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
    app.get("/users", verifyRole(["admin"]), findAllUsers);
    app.post("/users", verifyRole(["admin"]), createUser);
    app.patch("/users/:id", verifyRole(["admin"]), updateExistingUser);
    app.delete("/users/:id", verifyRole(["admin"]), deleteOneSpecificUser);
  //  app.delete("/", deleteAllUsers);
    // cette route necessite une authetification de l'utilisateur
   // app.get("/api/users", authenticate, findAllUsers);
}





