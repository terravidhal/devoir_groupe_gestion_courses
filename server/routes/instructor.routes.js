// ---------------------------------------------------
// ROUTES SETUP - Instructor
// ---------------------------------------------------

// 1) Importing External Libraries
//const express = require("express");

// 2) Importing Controller Methods
const {
    register,
    login,
    logout,
    findAllInstructors,
    findOneSingleInstructor,
    findInstructorsByManyId,
    deleteOneSpecificInstructor,
    updateExistingInstructor,
    createInstructor,
  } = require("../controllers/instructor.controller");
  
  //3) importing authenticate methods
  const { authenticate } = require('../config/jwt.config');
  
  //4) importing verifyRole methods
  const { verifyRole } = require('../config/jwt.config');
  
  module.exports = app => {
      app.post("/api/registerInstructor", register);  
      app.post("/api/login", login);
      app.post("/api/logoutInstructor", logout); 
      /*AJOUT*/ 
      //  app.get("/api/instructors/instructors",authenticate, verifyRole(["admin", "instructor"]), findAllInstructorsByRoleInstructor);
      // app.post("/api/instructors",authenticate, verifyRole(["admin"]), createInstructor); // si je creer une page pr ça

      app.get("/api/instructors",authenticate, findAllInstructors);
      app.get('/api/instructors/:id',authenticate, findOneSingleInstructor);
      //app.get('/api/instructorsMany/:id',authenticate, findInstructorsByManyId);
      app.post("/api/instructors",authenticate, createInstructor); // si je creer une page pr ça
      app.patch("/api/instructors/:id",authenticate, updateExistingInstructor);//
      app.delete("/api/instructors/:id",authenticate,  deleteOneSpecificInstructor);//
  }
  
  
  
  
  
  