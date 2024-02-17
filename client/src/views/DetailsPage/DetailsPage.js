import React, { useEffect, useState } from 'react';
import './DetailsPage.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/Button/Button';


const DetailsPage = () => {

  const [OneCourse, setOneCourse] = useState({})
  const {id} = useParams(); 
  const navigate = useNavigate();

  
  useEffect(() => {
    axios.get("http://localhost:8000/api/Courses/" + id)
        .then( res => {
          setOneCourse(res.data);
        })
        .catch( err => console.log(err) );
  }, [id]); 


  // delete One specific Course
  const deleteCourse = (CourseId) => {
    axios
      .delete("http://localhost:8000/api/Courses/" + CourseId)
      .then((res) => {
        console.log(res.data);
        navigate("/Courses");
      })
      .catch((err) => console.log(err));
  };



  return(
    <div className="DetailsPage">
      <div className="page-top">
        <h1>Speedy Courses</h1>
         <Link to="/">
           back to Home
          </Link>
      </div>  
      <div className="page-top">
        <h2>{OneCourse.name} recipe</h2>
        <Button CourseId={OneCourse._id} create="" update="" 
        deletes="delete" 
        isActive={true}
        successCallback={() => deleteCourse(OneCourse._id)}/>
      </div>  
      <div className="page-content">
        <div className="fields">
            <p><span className='infos'>Level:</span>{OneCourse.level}</p>
            <p><span className='infos'>description:</span> {OneCourse.description}</p>
            <p><span className='infos'>instructor:</span> {OneCourse.instructor}</p>
            <p><span className='infos'>dayOfWeek:</span> {OneCourse.dayOfWeek}</p>
            <p><span className='infos'>Time:</span> {OneCourse.time} minutes</p>
            <p><span className='infos'>students:</span> 
               <ul>
                  {OneCourse.students.map((elt) => (
                    <li key={elt._id}>
                      {elt.name}
                    </li>
                  ))}
               </ul>
            </p>
        </div>
      </div>
    </div>
  );
};


export default DetailsPage;
