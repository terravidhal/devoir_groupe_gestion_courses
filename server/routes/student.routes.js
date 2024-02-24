// ---------------------------------------------------
// ROUTES SETUP - Student
// ---------------------------------------------------

// 1) Importing External Libraries
//const express = require("express");

// 2) Importing Controller Methods
const {
    register,
    login,
    logout,
    findAllStudents,
    findOneSingleStudent,
    findStudentsByManyId,
    deleteOneSpecificStudent,
    updateExistingStudent,
    findAllStudentsByRoleStudent,
  } = require("../controllers/student.controller");


  
  //3) importing authenticate methods
  const { authenticate } = require('../config/jwt.config');
  
  //4) importing verifyRole methods
  const { verifyRole } = require('../config/jwt.config');
  
  module.exports = app => {
      app.post("/api/registerStudent", register);  
      app.post("/api/login", login);
      app.post("/api/logoutStudent", logout); 
      /*AJOUT*/ 
      //  app.get("/api/students/students",authenticate, verifyRole(["admin", "instructor"]), findAllStudentsByRoleStudent);
      // app.post("/api/students",authenticate, verifyRole(["admin"]), createStudent); // si je creer une page pr ça

      app.get("/api/students",authenticate, findAllStudents);
      app.get('/api/students/:id',authenticate, findOneSingleStudent);
      //app.get('/api/studentsMany/:id',authenticate, findStudentsByManyId);
    //  app.post("/api/students",authenticate, createStudent); // n'existe pas son create c7 son register
      app.patch("/api/students/:id",authenticate, updateExistingStudent);//  // si je creer une page pr ça
      app.delete("/api/students/:id",authenticate,  deleteOneSpecificStudent);//
  }
  
  
  
  
  
  