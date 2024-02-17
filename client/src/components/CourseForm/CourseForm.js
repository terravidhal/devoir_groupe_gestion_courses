import React, { useEffect, useState } from 'react';
import './CourseForm.css';
import { useNavigate } from 'react-router-dom'
import Button from '../Button/Button';
import StudentSelector from '../StudentSelector/StudentSelector';
import axios from 'axios';


const CourseForm = (props) => {
  
    
  const { initialName, 
          initialLevel,
          initialDescription,
          initialInstructorId,
          initialDayOfWeek,
          initialTime,
          initialStudents,
          initialAvailableStudents,
          requestPostorPatch,  // requestPostorPatch (lifting state)
          setErrors, // setErrors
          errors ,
          create,
          update,
          deletes,
        } = props;
  const [name, setName] = useState(initialName);  // initialName = ""
  const [level, setLevel] = useState(initialLevel);  
  const [description, setDescription] = useState(initialDescription);
  const [instructor, setInstructor] = useState(initialInstructorId);
  const [dayOfWeek, setDayOfWeek] = useState(initialDayOfWeek);
  const [time, setTime] = useState(initialTime);
//  
const [students, setStudents] = useState(initialStudents);// initialStudents => []
const [availableStudents, setavailableStudents] = useState(initialAvailableStudents);// initialAvailableStudents => []

  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false); // state button submit
  

  // get all users by role students
useEffect(() => {
  axios
    .get("http://localhost:8000/api/users/students",{withCredentials: true})
    .then((res) => setavailableStudents(res.data))
    .catch((err) => console.log(err));
}, []); // important!  //students
  
// Fonctions de gestion de la sélection des étudiants
  const handleStudentSelection = (student) => {
    setStudents([...students, student]);
  };

  const handleStudentRemoval = (student) => {
    setStudents(students.filter((s) => s._id !== student._id));
  };



  useEffect(() => {
    SubmitButton();
  }, [name,level,description, 
    dayOfWeek, time
    ]);


  const SubmitButton =  () =>{
    if (name.length < 3 || name.length > 20) {
      setIsActive(false);
    } else if (parseInt(level) < 1 || parseInt(level) > 5) {
      setIsActive(false);
    } else if (description.length < 10) {
      setIsActive(false);
    } else if (dayOfWeek.length < 3 || dayOfWeek.length > 8) {
      setIsActive(false);
    } else if (parseInt(time) < 30 || parseInt(time) > 240) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
    };


  const onSubmitHandler =  async(e) => {
      e.preventDefault();

      requestPostorPatch({ 
        name,
        level,
        description,
        instructor,
        dayOfWeek,
          time,
          students,
      }); 

      console.log("errors:::::::", errors);
  }
  
 //VALIDATIONS FRONT-END
  const handleNameErrors = (e) =>{ 
    setName(e.target.value);
   
   if (3 > e.target.value.length || e.target.value.length > 20 ) {
      setErrors({...errors,name:{ message: "Course names must be at least 3 characters long and no more than 20 characters long" }});
   } 
   else  {
      setErrors({...errors,name:{ message: "" }});
   }
 } 

  const handleLevelErrors = (e) =>{ 
    setLevel(e.target.value);
    
    if (1 > parseInt(e.target.value) || parseInt(e.target.value) > 5) {
       setErrors({...errors,level:{ message: "level must be a minimum of 1  and no more than 5 long" }});
    } 
    else  {
       setErrors({...errors,level:{ message: "" }});
    }
  } 


  const handleDescriptionErrors = (e) =>{ 
    setDescription(e.target.value);
   
   if (e.target.value.length < 10) {
      setErrors({...errors,description:{ message: "Descriptions must be at least 10 characters long" }});
   } 
   else  {
      setErrors({...errors,description:{ message: "" }});
   }
 } 


 const handleDayOfWeekErrors = (e) =>{ 
  setDayOfWeek(e.target.value);
 
 if (3 > e.target.value.length || e.target.value.length > 8 ) {
    setErrors({...errors,dayOfWeek:{ message: "Course day Of Week must be at least 3 characters long and no more than 8 characters long" }});
 } 
 else  {
    setErrors({...errors,dayOfWeek:{ message: "" }});
 }
} 



const handleTimeErrors = (e) =>{ 
  setTime(e.target.value);
  
  if (30 > parseInt(e.target.value) || parseInt(e.target.value) > 240) {
     setErrors({...errors,time:{ message: "Time must be a minimum of 30 minutes  and no more than 240 minuted long" }});
  } 
  else  {
     setErrors({...errors,time:{ message: "" }});
  }
}






  return (
      <div className="CourseForm">
        <form onSubmit={onSubmitHandler}>
            <div className="form-left">

              <div className='field'>
               <label>Name of courses :</label><br/>
               <input type="text" value={name} onChange = {(e)=>handleNameErrors(e)}/>
               {/* { errors.name ? 
                      <p style={{color:"red",fontWeight:"bold"}}>{errors.name.message}</p>
                      : null
               } */}
              </div>

              <div className='field'>
               <label>Level :</label><br/>
               <input type="number" value={level} onChange = {(e)=>handleLevelErrors(e)}/>
               {/* { errors.level ? 
                      <p style={{color:"red",fontWeight:"bold"}}>{errors.level.message}</p>
                      : null
               } */}
              </div>


              <div className='field'>
               <label>Description :</label><br/>
               <input type="text" value={description} onChange = {(e)=>handleDescriptionErrors(e)}/>
               {/* { errors.description ? 
                      <p style={{color:"red",fontWeight:"bold"}}>{errors.description.message}</p>
                      : null
               } */}
              </div>


              <div className='field'>
               <label>Instructor :</label><br/>
               <input type="hidden" value={instructor}  onChange = {(e)=>setInstructor(e.target.value)}/>
              </div>





              <Button courseId="" create={create} update={update} 
                deletes={deletes}
                isActive={isActive}
                successCallback={() => console.log('form')}/>

              </div>

            <div className="form-right">
             
              <div className='field'>
               <label>DayOfWeek :</label><br/>
               <input type="text" value={dayOfWeek} onChange = {(e)=>handleDayOfWeekErrors(e)}/>
               {/* <input type="date" value={dayOfWeek} onChange = {(e)=>handleDayOfWeekErrors(e)}/> */}
               {/* { errors.dayOfWeek ? 
                      <p style={{color:"red",fontWeight:"bold"}}>{errors.dayOfWeek.message}</p>
                      : null
               } */}
              </div>


              <div className='field'>
               <label>Time :</label><br/>
               <input type="number" value={time} onChange = {(e)=>handleTimeErrors(e)}/>
               {/* { errors.time ? 
                      <p style={{color:"red",fontWeight:"bold"}}>{errors.time.message}</p>
                      : null
               } */}
              </div>

              <div className='field'>
                 <label>Students:</label><br/>
                <StudentSelector
                  students={students}
                  onSelection={handleStudentSelection}
                  onRemoval={handleStudentRemoval}
                  availableStudents={ availableStudents}
                />
              </div>

            </div>
        </form>
      </div>
   )
};

export default CourseForm;
