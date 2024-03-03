import React, {useState} from 'react';
import './CreatePageCourse.css';
import CourseForm from '../../components/CourseForm/CourseForm';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";




const CreatePageCourse = () => {
  const cookies = new Cookies();
  const userObjs = cookies.get("USER_OBJ") || {};
  const userObjsId = userObjs._id || 'default';
  const userObjsRole = userObjs.role || 'default';
 
  const [errors, setErrors] = useState({}); 
  const [errors2, setErrors2] = useState({}); 
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
        if (userObjsRole === 'admin') {
          navigate("/admin-dashboard");
        } else {
          navigate("/instructor-dashboard");
        }
      })
      .catch(err=>{
        console.log("err//////", err.response.data.error)
        const errorResponse = err.response.data.error; 
        // Set Errors
        setErrors2({errors:errorResponse});
        setErrors({errors:errorResponse});
      }) 
  };

  return (
    <div className="CreatePageCourse">
       <div className="page-top">
        <h1>create courses</h1>
        {
          userObjsRole === 'admin' ?
            <Link to="/admin-dashboard">
              back to Home
             </Link> :
             <Link to="/instructor-dashboard">
             back to Home
            </Link>
        }
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
          initialadminId={userObjsId}
          initialInstructId={userObjsId}
          initialStartTime=""
          initialEndTime=""
          initialDayOfWeek=""
          initialField="Web developement"
          initialDuration={30}
          initialStudents={[]}
          initialAvailableStudents={[]}
        errors={errors}
        errors2={errors2}
        create="create"
        update=""
        deletes=""
        setErrors = {setErrors}
        iscreatePage={true}
        userObjsRole={userObjsRole}
      />
      </div> 
    </div>
  );

};


export default CreatePageCourse;
