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
import AdminDashboard from "./views/AdminDashboard/AdminDashboard";
import CreatePageCourse from "./views/CreatePageCourse/CreatePageCourse";
import DetailsPageCourse from "./views/DetailsPageCourse/DetailsPageCourse";
import Login from "./views/Login/Login";
import Cookies from "universal-cookie";
import RegisterStudent from "./views/RegisterStudent/RegisterStudent";
import CreatePageStudent from "./views/CreatePageStudent/CreatePageStudent";
import DetailsPageStudent from "./views/DetailsPageStudent/DetailsPageStudent";
import UpdatePageStudent from "./views/UpdatePageStudent/UpdatePageStudent";
import CreatePageInstructor from "./views/CreatePageInstructor/CreatePageInstructor";
import DetailsPageInsructor from "./views/DetailsPageInsructor/DetailsPageInsructor";
import UpdatePageInsructor from "./views/UpdatePageInsructor/UpdatePageInsructor";
import StudentsByCourse from "./views/StudentsByCourse/StudentsByCourse";
import InstructorByCourse from "./views/InstructorByCourse/InstructorByCourse";
import InstructorDashboard from "./views/InstructorDashboard/InstructorDashboard";
import WaitVerification from "./views/WaitVerification/WaitVerification";
import StudentDashboard from "./views/StudentDashboard/StudentDashboard";
import LoginAdmin from "./views/LoginAdmin/LoginAdmin";
import RegisterAdmin from "./views/RegisterAdmin/RegisterAdmin";
import RegisterInstructor from "./views/RegisterInstructor/RegisterInstructor";
import UpdatePageCourse from "./views/UpdatePageCourse/UpdatePageCourse";







function App() {
  const cookies = new Cookies();
  const userObjs = cookies.get("USER_OBJ");
  const userObjRole = cookies.get("USER_OBJ")?.role || '';
  const userObjIsInstructor = cookies.get("USER_OBJ")?.isInstructor || '';
  console.log("userObjRole+++++++++", userObjRole);
  console.log("userObjIsInstructor+++++++++", userObjIsInstructor);
  


  return (
    <div className="App">
       <h1>Favorite courses</h1>
       <BrowserRouter>
         <Routes>
           { userObjRole === 'admin' ?
              <>
               <Route path="/register_instructor" element={<Navigate replace to="/admin-dashboard" />} />
               <Route path="/route/regist/loaded25" element={<Navigate replace to="/admin-dashboard" />} />
               <Route path="/register_student" element={<Navigate replace to="/admin-dashboard" />} />
               <Route path="/instructor-dashboard" element={<Navigate replace to="/admin-dashboard" />} />
               <Route path="/student-dashboard" element={<Navigate replace to="/admin-dashboard" />} />
               <Route path="/wait-verification" element={<Navigate replace to="/admin-dashboard" />} />
               <Route path="*" element={<Navigate replace to="/admin-dashboard" />} /> 
              </>
              :
              userObjRole === 'student' ?
               <>
               <Route path="/register_instructor" element={<Navigate replace to="/student-dashboard" />} />
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
               <Route path="/route/regist/loaded25"element={<Navigate replace to="/student-dashboard" />}/>
               <Route path="/route/log/loaded25" element={<Navigate replace to="/student-dashboard" />}/>
               <Route path="*" element={<Navigate replace to="/student-dashboard" />} />
               </>
              :
              userObjRole === 'instructor' ?
                userObjIsInstructor === 'true' ?
                <>
                 <Route path="/register_instructor" element={<Navigate replace to="/instructor-dashboard" />} />
                 <Route path="/register_student" element={<Navigate replace to="/instructor-dashboard" />} />
                 <Route path="/admin-dashboard" element={<Navigate replace to="/instructor-dashboard" />} /> 
                 <Route path="/student-dashboard" element={<Navigate replace to="/instructor-dashboard" />} />
                 <Route path="/instructorByCourse/:id" element={<Navigate replace to="/instructor-dashboard" />} />
                 <Route path="/students/new" element={<Navigate replace to="/instructor-dashboard" />} />
                 <Route path="/instructors/new" element={<Navigate replace to="/instructor-dashboard" />} />
                 <Route path="/students/:id" element={<Navigate replace to="/instructor-dashboard" />}/>
                 <Route path="/instructors/:id" element={<Navigate replace to="/instructor-dashboard" />}/>
                 <Route path="/wait-verification" element={<Navigate replace to="/instructor-dashboard" />} />
                 <Route path="/route/regist/loaded25"element={<Navigate replace to="/instructor-dashboard" />}/>
                 <Route path="/route/log/loaded25" element={<Navigate replace to="/instructor-dashboard" />}/>
                 <Route path="*" element={<Navigate replace to="/instructor-dashboard" />} />
                </>
                 : 
                userObjIsInstructor === 'false' ?
                 <>
                 <Route path="/register_instructor" element={<Navigate replace to="/wait-verification" />} />
                 <Route path="/register_student" element={<Navigate replace to="/wait-verification" />} />
                 <Route path="/admin-dashboard" element={<Navigate replace to="/wait-verification" />} /> 
                 <Route path="/student-dashboard" element={<Navigate replace to="/wait-verification" />} />
                 <Route path="/instructor-dashboard" element={<Navigate replace to="/wait-verification" />} />
                 <Route path="/instructorByCourse/:id" element={<Navigate replace to="/wait-verification" />} />
                 <Route path="/students/new" element={<Navigate replace to="/wait-verification" />} />
                 <Route path="/instructors/new" element={<Navigate replace to="/wait-verification" />} />
                 <Route path="/students/:id" element={<Navigate replace to="/wait-verification" />}/>
                 <Route path="/instructors/:id" element={<Navigate replace to="/wait-verification" />}/>
                 <Route path="/route/regist/loaded25"element={<Navigate replace to="/wait-verification" />}/>
                 <Route path="/route/log/loaded25" element={<Navigate replace to="/wait-verification" />}/>
                 <Route path="*" element={<Navigate replace to="/wait-verification" />} />
                 </>
                 : null
                
               : null
              }
           <Route path="/" element={<Navigate replace to="/register_instructor"  />} />  {/* redirection */}
           <Route path="/register_instructor" element={<RegisterInstructor />} />
           <Route path="/register_student" element={<RegisterStudent />} />
           <Route path="/login_page" element={<Login />} />
           <Route path="/admin-dashboard" element={<AdminDashboard />} />
           <Route path="/wait-verification" element={<WaitVerification />} />
           <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
           <Route path="/student-dashboard" element={<StudentDashboard />} />
           <Route path="/studentsByCourse/:id" element={<StudentsByCourse />} />
           <Route path="/instructorByCourse/:id" element={<InstructorByCourse />} />
           <Route path="/courses/new" element={<CreatePageCourse />} />
           <Route path="/students/new" element={<CreatePageStudent />} />
           <Route path="/instructors/new" element={<CreatePageInstructor />} />
           <Route path="/courses/edit/:id" element={<UpdatePageCourse />}/>
           <Route path="/students/edit/:id" element={<UpdatePageStudent />}/>
           <Route path="/instructors/edit/:id" element={<UpdatePageInsructor />}/>
           <Route path="/courses/:id" element={<DetailsPageCourse />}/>
           <Route path="/students/:id" element={<DetailsPageStudent />}/>
           <Route path="/instructors/:id" element={<DetailsPageInsructor />}/>
           <Route path="/route/regist/loaded25" element={<RegisterAdmin />}/>
           <Route path="/route/log/loaded25" element={<LoginAdmin />}/>
         </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
