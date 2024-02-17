import React from 'react';
import './StudentSelector.css';

const StudentSelector = (props) => {
  const { students, onSelection, onRemoval,availableStudents
  } = props;

  // Fonction pour gérer l'ajout d'un étudiant
  const handleStudentSelection = (student) => {
    onSelection(student);
  };

  // Fonction pour gérer la suppression d'un étudiant
  const handleStudentRemoval = (student) => {
    onRemoval(student);
  };

  return(
  <div className="StudentSelector">
    <ul>
        {availableStudents.map((elt) => (
          <li key={elt._id} onClick={() => handleStudentSelection(elt)}>
            {elt.name}
           {students.some((elt2) => elt2._id === elt._id) ? (
              <button onClick={() => handleStudentRemoval(elt)}>Remove</button>
            ) : (
              <button onClick={() => handleStudentSelection(elt)}>Add</button>
            )} 
            {/* Cette partie vérifie si un étudiant ( s) dans le selectedStudentsle tableau 
            a un _idqui correspond à celui de l'étudiant actuel _id.
            Le somela méthode renvoie truesi au moins un élément du tableau remplit 
            la condition, et falsesinon */}
          </li>
        ))}
      </ul>
  </div>

  );
};



export default StudentSelector;
