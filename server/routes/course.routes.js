const CourseController = require('../controllers/course.controller');
 

//3) importing authenticate methods
const { authenticate } = require('../config/jwt.config');

//4) importing verifyRole methods
const { verifyRole } = require('../config/jwt.config');

//4) importing verifyInstructor methods
const { verifyInstructor } = require('../config/jwt.config');



module.exports = app => {
    app.get('/api/courses',authenticate, verifyRole(["user", "admin", "instructor"]), CourseController.findAllCourses);  
    app.get('/api/courses/:id',authenticate, verifyRole(["user", "admin", "instructor"]), CourseController.findOneSingleCourse);
    app.get('/api/courses/:courseId',authenticate, verifyRole(["user", "admin", "instructor"]), CourseController.findAllStudentsBySpecificCourse);
    app.patch('/api/courses/:id',authenticate, verifyInstructor,  CourseController.updateExistingCourse); 
    app.post('/api/courses',authenticate, verifyRole(["admin", "instructor"]),  CourseController.createNewCourse);
    app.delete('/api/courses/:id',authenticate,verifyRole(["admin"]),  CourseController.deleteAnExistingCourse);
}

