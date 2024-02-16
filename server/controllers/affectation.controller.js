const Affectation = require('../models/affectation.model');

// Récupérer toutes les affectations (findAllAffectations)
module.exports.findAllAffectations = async (req, res) => {
  try {
    const affectations = await Affectation.find()
      .populate('stud', 'name role email') // Inclure des informations pertinentes sur les étudiants
      .populate('cour', 'name'); // Inclure les informations pertinentes sur le cour
    res.status(200).json({ affectations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving assignments' });
  }
};

// Récupérer une seule affectation (findOneSingleAffectations)
module.exports.findOneSingleAffectation = async (req, res) => {
  try {
    const affectation = await Affectation.findById(req.params.id)
      .populate('stud', 'name role email') //  Inclure des informations pertinentes sur les étudiants
      .populate('cour', 'name level description instructor dayOfWeek time students'); // Inclure les informations pertinentes sur le cour
    if (!affectation) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.status(200).json({ affectation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving assignment' });
  }
};

// Créer une nouvelle affectation (createNewAffectations)
module.exports.createNewAffectation = async (req, res) => {
  try {
    const { stud, cour } = req.body;

    // Valider l'existence de l'étudiant et du cours à l'aide de Mongoose.isValidObjectId (le cas échéant)
    // if (!mongoose.isValidObjectId(stud) || !mongoose.isValidObjectId(cour)) {
    //   return res.status(400).json({ message: 'Invalid student or coure ID' });
    // }

    const existingAffectation = await Affectation.findOne({ stud, cour });
    if (existingAffectation) {
      return res.status(409).json({ message: 'Assignment already exists' });
    }

    const newAffectation = new Affectation({ stud, cour });
    const savedAffectation = await newAffectation.save();
    res.status(201).json({ savedAffectation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating assignment' });
  }
};

// Mettre à jour une affectation existante (updateExistingAffectations)
module.exports.updateExistingAffectation = async (req, res) => {
  try {
    const { stud, cour } = req.body;

    // Valider l'existence de l'étudiant et du cours à l'aide de Mongoose.isValidObjectId (le cas échéant)
    // if (!mongoose.isValidObjectId(stud) || !mongoose.isValidObjectId(cour)) {
    //   return res.status(400).json({ message: 'Invalid student or coure ID' });
    // }

    const updatedAffectation = await Affectation.findByIdAndUpdate(
      req.params.id,
      { stud, cour },
      { new: true, runValidators: true }
    );
    if (!updatedAffectation) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.status(200).json({ updatedAffectation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating assignment' });
  }
};

// Supprimer une affectation existante (deleteAnExistingAffectations)
module.exports.deleteAnExistingAffectation = async (req, res) => {
  try {
    const deletedAffectation = await Affectation.findByIdAndDelete(req.params.id);
    if (!deletedAffectation) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.status(200).json({ message: 'Assignment deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting assignment' });
  }
};
