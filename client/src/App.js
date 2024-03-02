import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import HomePage from "./views/HomePage/HomePage";
import CreatePage from "./views/CreatePage/CreatePage";
import UpdatePage from "./views/UpdatePage/UpdatePage";
import DetailsPage from "./views/DetailsPage/DetailsPage";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Cookies from "universal-cookie";
import RegisterStudent from "./components/RegisterStudent/RegisterStudent";
import CreatePageStudent from "./views/CreatePageStudent/CreatePageStudent";
import DetailsPageStudent from "./views/DetailsPageStudent/DetailsPageStudent";
import UpdatePageStudent from "./views/UpdatePageStudent/UpdatePageStudent";
import CreatePageInstructor from "./views/CreatePageInstructor/CreatePageInstructor";
import DetailsPageInsructor from "./views/DetailsPageInsructor/DetailsPageInsructor";
import UpdatePageInsructor from "./views/UpdatePageInsructor/UpdatePageInsructor";
import StudentsByCourse from "./components/StudentsByCourse/StudentsByCourse";
import InstructorByCourse from "./components/InstructorByCourse/InstructorByCourse";
import InstructorDashboard from "./components/InstructorDashboard/InstructorDashboard";
import WaitVerification from "./components/WaitVerification/WaitVerification";
import StudentDashboard from "./components/StudentDashboard/StudentDashboard";







function App() {
  const cookies = new Cookies();
  const userObjs = cookies.get("USER_OBJ");
  const userObjRole = cookies.get("USER_OBJ")?.role || '';
  const userObjIsInstructor = cookies.get("USER_OBJ")?.isInstructor || '';
  console.log("userObjRole+++++++++", userObjRole);
  console.log("userObjIsInstructor+++++++++", userObjIsInstructor);
  
 // const userObj = JSON.parse(localStorage.getItem("USER_OBJ"));
 // console.log("cookies+++++++++", userObj);
 
 //const userInfo = userObj ? userObj : null;
 // State Hooks
// const [user, setUser] = useState(userInfo);
 // console.log("userDetails+++++++++", user);


 
//  useEffect(() => {
//   setUser(userInfo) }
//  , [])

  return (
    <div className="App">
       <h1>Favorite courses</h1>
       <BrowserRouter>
         <Routes>
           { userObjRole === 'admin' ?
              <>
               <Route path="/register_page" element={<Navigate replace to="/admin-dashboard" />} />
               <Route path="/register_student" element={<Navigate replace to="/admin-dashboard" />} />
               <Route path="/instructor-dashboard" element={<Navigate replace to="/admin-dashboard" />} />
               <Route path="/student-dashboard" element={<Navigate replace to="/admin-dashboard" />} />
               <Route path="/wait-verification" element={<Navigate replace to="/admin-dashboard" />} />
               <Route path="*" element={<Navigate replace to="/admin-dashboard" />} /> 
              </>
              :
              userObjRole === 'student' ?
               <>
               <Route path="/register_page" element={<Navigate replace to="/student-dashboard" />} />
               <Route path="/register_student" element={<Navigate replace to="/student-dashboard" />} />
               <Route path="/admin-dashboard" element={<Navigate replace to="/student-dashboard" />} /> 
               <Route path="/wait-verification" element={<Navigate replace to="/student-dashboard" />} />
               <Route path="/instructor-dashboard" element={<Navigate replace to="/student-dashboard" />} />
               <Route path="/studentsByCourse/:id" element={<Navigate replace to="/student-dashboard" />} />
               <Route path="/courses/new" element={<Navigate replace to="/student-dashboard" />} />
               <Route path="/students/new" element={<Navigate replace to="/student-dashboard" />} />
               <Route path="/instructors/new" element={<Navigate replace to="/student-dashboard" />} />
               <Route path="/courses/edit/:id"element={<Navigate replace to="/student-dashboard" />}/>
               <Route path="/students/edit/:id" element={<Navigate replace to="/student-dashboard" />}/>
               <Route path="/instructors/edit/:id" element={<Navigate replace to="/student-dashboard" />}/>
               <Route path="/students/:id" element={<Navigate replace to="/student-dashboard" />}/>
               <Route path="/instructors/:id" element={<Navigate replace to="/student-dashboard" />}/>
               <Route path="*" element={<Navigate replace to="/student-dashboard" />} />
               </>
              :
              userObjRole === 'instructor' ?
                userObjIsInstructor === 'true' ?
                <>
                 <Route path="/register_page" element={<Navigate replace to="/instructor-dashboard" />} />
                 <Route path="/register_student" element={<Navigate replace to="/instructor-dashboard" />} />
                 <Route path="/admin-dashboard" element={<Navigate replace to="/instructor-dashboard" />} /> 
                 <Route path="/student-dashboard" element={<Navigate replace to="/instructor-dashboard" />} />
                 <Route path="/instructorByCourse/:id" element={<Navigate replace to="/instructor-dashboard" />} />
                 <Route path="/students/new" element={<Navigate replace to="/instructor-dashboard" />} />
                 <Route path="/instructors/new" element={<Navigate replace to="/instructor-dashboard" />} />
                 <Route path="/students/:id" element={<Navigate replace to="/instructor-dashboard" />}/>
                 <Route path="/instructors/:id" element={<Navigate replace to="/instructor-dashboard" />}/>
                 <Route path="/wait-verification" element={<Navigate replace to="/instructor-dashboard" />} />
                 <Route path="*" element={<Navigate replace to="/instructor-dashboard" />} />
                </>
                 : 
                userObjIsInstructor === 'false' ?
                 <>
                 <Route path="/register_page" element={<Navigate replace to="/wait-verification/wait-verification" />} />
                 <Route path="/register_student" element={<Navigate replace to="/wait-verification" />} />
                 <Route path="/admin-dashboard" element={<Navigate replace to="/wait-verification" />} /> 
                 <Route path="/student-dashboard" element={<Navigate replace to="/wait-verification" />} />
                 <Route path="/instructor-dashboard" element={<Navigate replace to="/wait-verification" />} />
                 <Route path="/instructorByCourse/:id" element={<Navigate replace to="/wait-verification" />} />
                 <Route path="/students/new" element={<Navigate replace to="/wait-verification" />} />
                 <Route path="/instructors/new" element={<Navigate replace to="/wait-verification" />} />
                 <Route path="/students/:id" element={<Navigate replace to="/wait-verification" />}/>
                 <Route path="/instructors/:id" element={<Navigate replace to="/wait-verification" />}/>
                 <Route path="*" element={<Navigate replace to="/wait-verification" />} />
                 </>
                 : null
                
               : null
              }
           <Route path="/" element={<Navigate replace to="/register_page"  />} />  {/* redirection */}
           <Route path="/register_page" element={<Register />} />
           <Route path="/register_student" element={<RegisterStudent />} />
           <Route path="/login_page" element={<Login />} />
           <Route path="/admin-dashboard" element={<HomePage />} />
           <Route path="/wait-verification" element={<WaitVerification />} />
           <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
           <Route path="/student-dashboard" element={<StudentDashboard />} />
           <Route path="/studentsByCourse/:id" element={<StudentsByCourse />} />
           <Route path="/instructorByCourse/:id" element={<InstructorByCourse />} />
           <Route path="/courses/new" element={<CreatePage />} />
           <Route path="/students/new" element={<CreatePageStudent />} />
           <Route path="/instructors/new" element={<CreatePageInstructor />} />
           <Route path="/courses/edit/:id" element={<UpdatePage />}/>
           <Route path="/students/edit/:id" element={<UpdatePageStudent />}/>
           <Route path="/instructors/edit/:id" element={<UpdatePageInsructor />}/>
           <Route path="/courses/:id" element={<DetailsPage />}/>
           <Route path="/students/:id" element={<DetailsPageStudent />}/>
           <Route path="/instructors/:id" element={<DetailsPageInsructor />}/>
         </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
