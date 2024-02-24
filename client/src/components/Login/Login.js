import React,{ useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";
import "./Login.css";




const Login = (props)=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const cookies = new Cookies();
  
    // const handleChange = (e)=>{
    //   setEmail({
    //     ...email,
    //     [e.target.name]: e.target.value
    //   })
    // }
  
    const login = (event) =>{
      event.preventDefault();
      axios.post('http://localhost:8000/api/login',{
        email: email,
        password: password,
      },
      {
        withCredentials: true,
      })
      .then(async(res)=>{
       // console.log("res***************",res);
        console.log("res.data***************",res.data);
        if ( res.data.student) {
          cookies.set('USER_OBJ', res.data.student);
          await localStorage.setItem("USER_OBJ", JSON.stringify(res.data.student));
           navigate("/student-dashboard");
           
        } else if(res.data.instructor) {
             cookies.set('USER_OBJ', res.data.instructor);
             await localStorage.setItem("USER_OBJ", JSON.stringify(res.data.instructor));
              navigate("/instructor-dashboard");

        } else if(res.data.admin) {
             cookies.set('USER_OBJ', res.data.admin);
             await localStorage.setItem("USER_OBJ", JSON.stringify(res.data.admin));
              navigate("/courses");
        }else{
           console.log('null');
        }
       // navigate("/courses");
      })
      .catch((err)=>{
        console.log(err.response);
        setErrorMessage(err.response.data.message);
      })
  };
  
  return(
    <div>
      <h2>Login All</h2>
      <Link to="/register_page">
             Register instructor
      </Link>
      <Link to="/register_student">
             Register student
      </Link>

      

      <p className="error-text">{errorMessage? errorMessage : ""}</p>
      <form onSubmit={login}>
        <div>
          <label>Email</label>
          <input type="text" name="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
        </div>
        <button type="submit">Sign in</button>
      </form>
      </div>
    );
  };
  
  export default Login;