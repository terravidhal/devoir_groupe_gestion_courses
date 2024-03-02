import React, {useState, useEffect} from 'react';
import './HomePage.css';
import CourseTable from '../../components/CourseTable/CourseTable';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";
import StudentTable from '../../components/StudentTable/StudentTable';
import InstructorTable from '../../components/InstructorTable/InstructorTable';







const HomePage = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [allInstructors, setAllInstructors] = useState([]);
  const navigate = useNavigate();
  const cookies = new Cookies();
  const userObjRole = cookies.get("USER_OBJ").role;


/**
 * IMPORTANT : MAINTENANT QUE NOUS UTILISONS DES COOKIES 
 * POUR L'AUTHENTIFICATION ET L'AUTORISATION, NOUS ASSURERONS 
 * QUE CHAQUE DEMANDE EST ENVOYÉE AVEC { withCredentials: true }. 
 * CELA ENVOYERA LES COOKIES À CHAQUE DEMANDE AFIN QUE NOTRE 
 * MIDDLEWARE VÉRIFIE QUI EST CONNECTÉ. 
  */  
 
  // get all courses
/*  useEffect(() => {
    axios
      .get("http://localhost:8000/api/courses",{withCredentials: true})
      .then((res) => {
        setAllCourses(res.data.allDaCourses);
        console.log('r+++++++', res.data.allDaCourses)
      })
      .catch((err) => console.log(err));
  }, []); */


  // check and update courses status
  useEffect(() => {
    const GetAllCourses = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/courses", { withCredentials: true });
        const courses = response.data.allDaCourses;
       // console.log('response', response);
        
        // Call the new function to update statuses
        const updatedCourses = updateCourseStatuses(courses); 

        setAllCourses(updatedCourses);
      } catch (err) {
        console.error(err);
      }
    };

    GetAllCourses();
  }, []); 



  //update courses
  const updateCourseStatuses = (courses) => {
    return courses.map((course) => {
      const currentDate = new Date().getDay(); // Get current day of the week
      const courseDate = new Date(course.dayOfWeek).getDay(); // Get day of the week from course
  
      // Update status if current date is past the course's day
      if (currentDate > courseDate) {
        course.status = 'resolved';
      }
  
      return course;
    });
  }


  // get all students
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/students",{withCredentials: true})
      .then((res) => {
        setAllStudents(res.data);
        console.log('r+++++++', res.data)
      })
      .catch((err) => console.log(err));
  }, []); 

  // get all instructors
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/instructors",{withCredentials: true})
      .then((res) => {
        setAllInstructors(res.data);
        console.log('r+++++++', res.data)
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

  // delete One specific student
  const deleteStudent = (studentId) => {
    axios
      .delete("http://localhost:8000/api/students/" + studentId,{withCredentials: true})
      .then((res) => {
        console.log(res.data.result);
        setAllStudents(allStudents.filter(student=> student._id !== studentId)); // 
      })
      .catch((err) => console.log(err));
  };

  // delete One specific instructor
  const deleteInstructor = (instructorId) => {
    axios
      .delete("http://localhost:8000/api/instructors/" + instructorId,{withCredentials: true})
      .then((res) => {
        console.log(res.data.result);
        setAllInstructors(allInstructors.filter(instructor=> instructor._id !== instructorId)); // 
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
    <div className="HomePage">
       <div className="page-top">
        <h1>Speedy course</h1>
         <Link to="/courses/new">
         Add an course
          </Link>
         <Link to="/instructors/new">
         Add an instructor
          </Link>
         <Link to="/students/new">
         Add an students
          </Link>
      </div>
      <button onClick={logout}>logout</button>
      <h4>we have quotes by : </h4>
      <CourseTable allCourses={allCourses} deleteCourse={deleteCourse} />
      <StudentTable allStudents={allStudents} deleteStudent={deleteStudent} />
      <InstructorTable allInstructors={allInstructors} deleteInstructor={deleteInstructor} />
    </div>
  );

};


export default HomePage;
