import React, {useState, useEffect} from 'react';
import './UpdatePage.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import CourseForm from '../../components/CourseForm/CourseForm';
import Cookies from "universal-cookie";




const UpdatePage = (props) => {
  const cookies = new Cookies();
  const userObjsId = cookies.get("USER_OBJ")._id;

  const { id } = useParams();
  const [coursObj, setCoursObj] = useState({});
  const [loaded, setLoaded] = useState(false); // check if the data is available
  const navigate = useNavigate();
  const [errors, setErrors] = useState({}); 
  const [errors2, setErrors2] = useState({}); 


  //get  data one specific course
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/courses/" + id,{withCredentials: true})
      .then((res) => {
        console.log("u++++++++++",res.data.oneSingleCourse);
        setCoursObj(res.data.oneSingleCourse);
        setLoaded(true); // data available => set "true"
        console.log("k++++++++++",coursObj.name);
      })
      .catch((err) => console.log(err));
      
    }, [id]); // updating "CoursObj" based on "id"



  // update one specific course
  const updateCourse = (coursObj) => {
    axios
      .patch(
        "http://localhost:8000/api/courses/" + id,

        coursObj,{withCredentials: true} 
      )
      .then((res) => {
       // console.log(res.data.course);
        setErrors({});
        navigate("/admin-dashboard");
      })
      .catch(err=>{
        console.log("err//////", err)
        const errorResponse = err.response.data.errors; 
        // Set Errors
        setErrors2({errors:errorResponse});
        setErrors(errorResponse);
      }) 
  };



  return (
    <div className="UpdatePage">
      <div className="page-top">
        <h1>Speedy courses</h1>
         <Link to={"/courses/" + id}>
         course details
          </Link>
         <Link to="/admin-dashboard">
         home
          </Link>
      </div>
      <h4>Update your {coursObj.name} recipe</h4>
      
      <div className="page-content">
      {loaded === true ? 
        <CourseForm requestPostorPatch={updateCourse} 
        initialName={coursObj.name}
        initialLevel={coursObj.level}
        initialDescription={coursObj.description}
        initialTypeOfCourse={coursObj.typeOfCourse}
        initialLinkMeeting={coursObj.linkMeeting}
        initialDocumentsLink={coursObj.documentsLink}
        initialInstructorId={coursObj.instructor}
        initialadminId={userObjsId}
        initialInstructId={coursObj.instructor}
        initialDayOfWeek={coursObj.dayOfWeek}
        initialField={coursObj.field}
        initialStartTime={coursObj.startTime}
        initialEndTime={coursObj.endTime}
        initialDuration={coursObj.duration}
        initialStudents={coursObj.students}
        initialAvailableStudents={[]}
        errors={errors}
        errors2={errors2}
        create=""
        update="update"
        deletes=""
        setErrors = {setErrors} 
        iscreatePage={false}
        />
       : null}
       </div>
    </div>
  );

};


export default UpdatePage;
