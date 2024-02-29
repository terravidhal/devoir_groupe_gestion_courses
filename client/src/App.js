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







function App() {
  const cookies = new Cookies();
  const userObjs = cookies.get("USER_OBJ");
  
  const userObj = JSON.parse(localStorage.getItem("USER_OBJ"));
  console.log("cookies+++++++++", userObj);
 
 const userInfo = userObj ? userObj : null;
 // State Hooks
 const [user, setUser] = useState(userInfo);
 // console.log("userDetails+++++++++", user);


 
//  useEffect(() => {
//   setUser(userInfo) }
//  , [])

  return (
    <div className="App">
       <h1>Favorite courses</h1>
       <BrowserRouter>
         <Routes>
           <Route path="/" element={<Navigate replace to="/register_page"  />} />  {/* redirection */}
           <Route path="/register_page" element={<Register />} />
           <Route path="/register_student" element={<RegisterStudent />} />
           <Route path="/login_page" element={<Login />} />
           <Route path="/admin-dashboard" element={<HomePage />} />
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
           {/* {!user ?
             <Route path="/register_page" element={<Register />} /> :
             <Route path="/register_page" element={<Navigate replace to="/courses"  />} />
           }
           {!user ?
             <Route path="/login_page" element={<Login />} /> :
             <Route path="/login_page" element={<Navigate replace to="/courses"  />} />
           }
           {user ?
             <Route path="/courses" element={<HomePage />} /> :
             <Route path="/courses" element={<Navigate replace to="/login_page"  />} />
           }
           {user ?
             <Route path="/courses/new" element={<CreatePage />} /> :
             <Route path="/courses/new" element={<Navigate replace to="/login_page"  />} />
           }
           {user ?
             <Route path="/courses/edit/:id" element={<UpdatePage />}/> :
             <Route path="/courses/edit/:id" element={<Navigate replace to="/login_page"  />} />
           } */}
         </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
