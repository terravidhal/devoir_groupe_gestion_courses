import React, {useState} from 'react';
import './CreatePage.css';
import CourseForm from '../../components/CourseForm/CourseForm';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";




const CreatePage = () => {
  const cookies = new Cookies();
  const userObjsId = cookies.get("USER_OBJ")._id;
 
  const [errors, setErrors] = useState({}); 
  const navigate = useNavigate();


  // create one course
  const createCourse = (coursObj) => {
    axios
      .post(
        "http://localhost:8000/api/courses", coursObj,{withCredentials: true} 
      )
      .then((res) => {
        console.log(res.data);
        setErrors({});
        navigate("/admin-dashboard");
      })
      .catch(err=>{
        console.log("err//////", err.response.data.message)
        const errorResponse = err.response.data.errors; 
        // Set Errors
        setErrors(errorResponse);
      }) 
  };

  return (
    <div className="CreatePage">
       <div className="page-top">
        <h1>Speedy Meals</h1>
         <Link to="/admin-dashboard">
         admin-dashboard
          </Link>
      </div>
        <h4>Add the courses!</h4>
      <div className="page-content"> 
      <CourseForm
        requestPostorPatch={createCourse}
        initialName=""
        initialLevel={1}
          initialDescription=""
          initialTypeOfCourse="presential"
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


export default CreatePage;
