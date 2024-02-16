const mongoose = require('mongoose');

const affectationSchema = new mongoose.Schema({
    students: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cour: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }
});
  
const Affectation = mongoose.model('Affectation', affectationSchema);
  
module.exports = Affectation;