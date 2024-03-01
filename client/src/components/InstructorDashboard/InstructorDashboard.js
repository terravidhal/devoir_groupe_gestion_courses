import React, {useState, useEffect} from 'react';
import CourseTable from '../../components/CourseTable/CourseTable';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";
import './InstructorDashboard.css';



const InstructorDashboard = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [allInstructors, setAllInstructors] = useState([]);
  const navigate = useNavigate();
  const cookies = new Cookies();


/**
 * IMPORTANT : MAINTENANT QUE NOUS UTILISONS DES COOKIES 
 * POUR L'AUTHENTIFICATION ET L'AUTORISATION, NOUS ASSURERONS 
 * QUE CHAQUE DEMANDE EST ENVOYÉE AVEC { withCredentials: true }. 
 * CELA ENVOYERA LES COOKIES À CHAQUE DEMANDE AFIN QUE NOTRE 
 * MIDDLEWARE VÉRIFIE QUI EST CONNECTÉ. 
  */  
 
  // get all courses
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/courses",{withCredentials: true})
      .then((res) => {
        setAllCourses(res.data.allDaCourses);
        console.log('r+++++++', res.data.allDaCourses)
      })
      .catch((err) => console.log(err));
  }, []); 


  // delete One specific course
  const deleteCourse = (courseId) => {
    axios
      .delete("http://localhost:8000/api/courses/" + courseId,{withCredentials: true})
      .then((res) => {
        console.log(res.data.result);
        setAllCourses(allCourses.filter(course=> course._id !== courseId)); // pas necessaire
      })
      .catch((err) => console.log(err));
  };

 

  const logout = (event) =>{
    event.preventDefault();
    axios.post('http://localhost:8000/api/logout',{},{withCredentials: true})
    .then((res)=>{
      //console.log("res", res);
      console.log("deconnexion",res.data.message);
     // console.log("is res data message",res.data.message);
       cookies.remove("USER_OBJ");
     // localStorage.removeItem("USER_OBJ");
      navigate("/login_page");
    })
    .catch((err)=>{
     // console.log("+++++++++++",err.response);
      console.log("Erreur de déconnexion +++++++++++",err);
    })
};


  
  return (
    <div className="InstructorDashboard">
       <div className="page-top">
        <h1>Speedy course</h1>
         <Link to="/courses/new">
         Add an course
          </Link>
      </div>
      <button onClick={logout}>logout</button>
      <h4>we have quotes by : </h4>
      <CourseTable allCourses={allCourses} deleteCourse={deleteCourse} />
    </div>
  );

};


export default InstructorDashboard;
