const CourseController = require('../controllers/course.controller');
 

//3) importing authenticate methods
const { authenticate } = require('../config/jwt.config');

//4) importing checkPermissions methods
const { checkPermissions } = require('../config/jwt.config');

//4) importing verifyRole methods
const { verifyRole } = require('../config/jwt.config');

//4) importing verifyInstructor methods
const { verifyInstructor } = require('../config/jwt.config');



module.exports = app => {
   // app.get('/api/courses',authenticate, verifyRole(["user", "admin", "instructor"]), CourseController.findAllCourses);  
   // app.patch('/api/courses/:id',authenticate, verifyInstructor,  CourseController.updateExistingCourse); 
    app.get('/api/courses',authenticate, CourseController.findAllCourses);  
    app.get('/api/courses/:id',authenticate, CourseController.findOneSingleCourse);
    app.get('/api/students/course/:courseId',authenticate, CourseController.findAllStudentsBySpecificCourse);
    app.patch('/api/courses/:id',authenticate,   CourseController.updateExistingCourse); 
 //   app.post('/api/courses',authenticate,   CourseController.createNewCourse);
    app.post('/api/courses',authenticate,   CourseController.createNewCourseWithMatchingStudents);
    app.delete('/api/courses/:id',authenticate,  CourseController.deleteAnExistingCourse);
}

