const Course = require('../models/course.model');
 


module.exports.findAllCourses = (req, res) => {
    Course.find()
        .sort({ name: 1 }) // Trie les auteurs par ordre alphabétique du nom d'utilisateur/ -1 implique ordre decroissant
        .then((allDaCourses) => {
            res.json({ allDaCourses })
        })
        .catch((err) => {
             res.status(400).json(err) 
        });
}


 
module.exports.findOneSingleCourse = (req, res) => {
    Course.findOne({ _id: req.params.id })
        .then(oneSingleCourse => {
            res.json({ oneSingleCourse })
        })
        .catch((err) => {
             res.status(400).json(err) 
        });}
 

module.exports.createNewCourse = (req, res) => {
    Course.create(req.body)
        .then(newlyCreatedCourse => {
            res.json({ newlyCreatedCourse })
        })
        .catch((err) => {
            res.status(400).json(err) 
        });}
 

module.exports.updateExistingCourse = (req, res) => {
    Course.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedCourse => {
            res.json({ updatedCourse })
        })
        .catch((err) => {
             res.status(400).json(err) 
        });}
 
        
module.exports.deleteAnExistingCourse = (req, res) => {
    Course.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result })
        })
        .catch((err) => {
             res.status(400).json(err) 
        });}


       

 module.exports.findAllStudentsBySpecificCourse = async (req, res) => {
   const { courseId } = req.params; // En supposant que vous obteniez l'ID du cours à partir du paramètre URL
 
   try {
     // Trouver le cours avec des étudiants peuplés
     const course = await Course.findById(courseId).populate('students');
 
     if (!course) {
       //return res.status(404).json({ message: 'Course not found' });
       return res.status(400).json({ message: 'Course not found' });
     }
 
     // Extraire et renvoyer les données des étudiants inscrits
     const students = course.students.map(student => {
       return {
         _id: student._id,
         name: student.name, // Ou d'autres propriétés étudiantes souhaitées
       };
     });
 
     res.json({ students });
   } catch (err) {
     console.error(err);
    // res.status(500).json({ message: 'An error occurred' });
     res.status(400).json({ message: 'An error occurred' });
   }
 };
     