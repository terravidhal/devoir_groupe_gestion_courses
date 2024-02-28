import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';
import './UpdatePageInsructor.css';


const UpdatePageInsructor = (props)=>{
    const { id } = useParams();
    const [confirmReg, setConfirmReg] = useState("");
    const [errs, setErrs] = useState({});
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false); // check if the data is available

    const [user, setUser] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword:""
    })
  
    const handleChange = (e)=>{
      setUser({
        ...user,
        [e.target.name]: e.target.value // e.target.name => recupere la valeur du champ "name" de l'input
      })
    }

    //get  data one specific instructor
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/instructors/" + id,{withCredentials: true})
      .then((res) => {
        console.log("u++++++++++",res.data.oneSingleInstructor);
      //  setInstructorObj(res.data.oneSingleInstructor);
        setUser({
          name: res.data.oneSingleInstructor.name,
          email: res.data.oneSingleInstructor.email,
          password: "default",
          confirmPassword: "default"
        });
        setLoaded(true); // data available => set "true"
       // console.log("k++++++++++",user.name);
      })
      .catch((err) => console.log(err));
      
    }, [id]); // updating "user" based on "id"


    const updateInstructor = (e) =>{
      e.preventDefault();
      axios.patch('http://localhost:8000/api/instructors/'+ id,
      user,
      {
        withCredentials: true,
      })
      .then(res =>{
        console.log(res.data);
        setUser({
          name:"",
          email:"",
          password:"",
          confirmPassword:""
        })
        setConfirmReg("Thank you for registering, you can now log in");
        setErrs({});
        navigate("/admin-dashboard");
      })
      .catch((err)=>{
      //  console.log(err);
        setErrs(err.response.data.errors.errors);
        console.log("+++++++++",err.response.data.errors.errors);
      })
  };

  
   
  return(
    <div>
      <h2>update instuctor</h2>
      <Link to="/admin-dashboard">
             admin-dashboard 
      </Link>

     
      
      {
        confirmReg?
        <h1 style={{color: "grey"}}>{confirmReg}</h1>
        :null
      }

      {loaded === true ? 
      <form onSubmit={updateInstructor}>
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
      </form>  : null }
    </div>
  );
  };
  
  export default UpdatePageInsructor;

