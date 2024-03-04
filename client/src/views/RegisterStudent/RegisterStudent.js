import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import "./RegisterStudent.css";


const RegisterStudent = (props)=>{
    const [confirmReg, setConfirmReg] = useState("");
    const [errs, setErrs] = useState({});
    const navigate = useNavigate();
  
    const [user, setUser] = useState({
      name: "",
      email: "",
      fieldOfStudy:"Web developement",
      levelStudent: 1,
      password: "",
      confirmPassword:""
    })
  
    const handleChange = (e)=>{
      setUser({
        ...user,
        [e.target.name]: e.target.value // e.target.name => recupere la valeur du champ "name" de l'input
      })
    }
  
    const register = e =>{
      e.preventDefault();
      axios.post('http://localhost:8000/api/registerStudent',
      user,
      {
        withCredentials: true,
      })
      .then(res =>{
        console.log(res.data);
        setUser({
          name:"",
          email:"",
          fieldOfStudy:"",
          levelStudent:"",
          password:"",
          confirmPassword:""
        })
        setConfirmReg("Thank you for registering, you can now log in");
        setErrs({});
        localStorage.setItem('USER_OBJ', JSON.stringify(res.data.student));
        navigate("/student-dashboard");
      })
      .catch((err)=>{
       // console.log(err);
        setErrs(err.response.data.errors.errors);
        console.log("+++++++++",err.response.data.errors.errors);
      })
  };
  
  return(
    <div>
      <h2>Register Student</h2>
      <Link to="/login_page">
             login 
      </Link>

      
      
      {
        confirmReg?
        <h1 style={{color: "grey"}}>{confirmReg}</h1>
        :null
      }
      <form onSubmit={register}>
        <div>
          <label>name</label>
          {
            errs.name?
            <span className="error-text">{errs.name.message}</span>
            :null
          }
          <input type="text" name="name" value={user.name} onChange={(e)=> handleChange(e)}/>
        </div>
        <div>
          <label>Email</label>
          {
            errs.email?
            <span className="error-text">{errs.email.message}</span>
            :null
          }
          <input type="email" name="email" value={user.email} onChange={(e)=> handleChange(e)}/>
        </div>
        <div>
          <label>field Of Study</label>
          {
            errs.fieldOfStudy?
            <span className="error-text">{errs.fieldOfStudy.message}</span>
            :null
          }
          <select name="fieldOfStudy" id="" value={user.fieldOfStudy} onChange = {(e)=>handleChange(e)}>
               <option value="Web developement">Web developement</option>
               <option value="data analyst">data analyst</option>
               <option value="ux design">ux design</option>
          </select>
        </div>
        <div>
          <label>level Student</label>
          {
            errs.levelStudent?
            <span className="error-text">{errs.levelStudent.message}</span>
            :null
          }
          <input type="number" name="levelStudent" value={user.levelStudent} onChange={(e)=> handleChange(e)}/>
        </div>
        <div>
          <label>Password</label>
          {
            errs.password?
            <span className="error-text">{errs.password.message}</span>
            :null
          }
          <input type="password" name="password" value={user.password} onChange={(e)=> handleChange(e)}/>
        </div>
        <div>
          <label>Confirm Password</label>
          {
            errs.confirmPassword?
            <span className="error-text">{errs.confirmPassword.message}</span>
            :null
          }
          <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={(e)=> handleChange(e)}/>
        </div>
        <button type="submit">Register Me</button>
      </form>
    </div>
  );
  };
  
  export default RegisterStudent;


