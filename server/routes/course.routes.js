const CourseController = require('../controllers/course.controller');
 

//3) importing authenticate methods
const { authenticate } = require('../config/jwt.config');

//4) importing checkPermissions methods
const { checkPermissions } = require('../config/jwt.config');





module.exports = app => {
    app.get('/api/courses',authenticate, checkPermissions('admin'), CourseController.findAllCourses);  
    app.get('/api/courses/:id',authenticate, checkPermissions('admin','instructor','student'), CourseController.findOneSingleCourse);
    app.get('/api/courses/instructor/:id',authenticate, checkPermissions('admin','instructor'), CourseController.findAllCoursesByInstructor);
    app.get('/api/courses/student/:id',authenticate, checkPermissions('admin','student'), CourseController.findAllCoursesByStudent);
    app.get('/api/students/course/:courseId',authenticate,checkPermissions('admin','instructor'), CourseController.findAllStudentsBySpecificCourse);
  //  app.get('/api/instructor/course/:courseId',authenticate, CourseController.findInstructorBySpecificCourse);
    app.patch('/api/courses/:id',authenticate,checkPermissions('admin','instructor'), CourseController.updateExistingCourse); 
 //   app.post('/api/courses',authenticate,   CourseController.createNewCourse);
    app.post('/api/courses',authenticate, checkPermissions('admin','instructor'), CourseController.createNewCourseWithMatchingStudents);
    app.delete('/api/courses/:id',authenticate,checkPermissions('admin','instructor'),  CourseController.deleteAnExistingCourse);
}

