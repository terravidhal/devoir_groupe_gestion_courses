import React, {useState} from 'react';
import './CreatePageStudent.css';
import StudentForm from '../../components/StudentForm/StudentForm';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";




const CreatePageStudent = () => {
  const cookies = new Cookies();
  const userObjsId = cookies.get("USER_OBJ")._id;
 
  const [errors, setErrors] = useState({}); 
  const navigate = useNavigate();


  // create one student
  const createStudent = (studentObj) => {
    axios
      .post(
        "http://localhost:8000/api/students", studentObj,{withCredentials: true} 
      )
      .then((res) => {
        console.log(res.data);
        setErrors({});
        navigate("/students");
      })
      .catch(err=>{
        console.log("err//////", err.response.data.message)
        const errorResponse = err.response.data.errors; 
        // Set Errors
        setErrors(errorResponse);
      }) 
  };

  return (
    <div className="CreatePageStudent">
       <div className="page-top">
        <h1>Speedy students</h1>
         <Link to="/courses">
           back to Home
          </Link>
      </div>
        <h4>Add the students!</h4>
      <div className="page-content"> 
      <StudentForm
        requestPostorPatch={createStudent}
        initialName=""
        initialLevel={1}
          initialDescription=""
          initialTypeOfStudent="presential"
          initialLinkMeeting=""
          initialDocumentsLink=""
          initialInstructorId={userObjsId}
          initialStartTime=""
          initialEndTime=""
          initialDayOfWeek=""
          initialField="Web developement"
          initialDuration={30}
          initialStudents={[]}
          initialAvailableStudents={[]}
        errors={errors}
        create="create"
        update=""
        deletes=""
        setErrors = {setErrors}
        iscreatePage={true}
      />
      </div> 
    </div>
  );

};



export default CreatePageStudent;
