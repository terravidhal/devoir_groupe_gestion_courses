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


    