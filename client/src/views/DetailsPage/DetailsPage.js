import React, { useEffect, useState } from 'react';
import './DetailsPage.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const DetailsPage = () => {

  const [OneCourse, setOneCourse] = useState({})
  const {id} = useParams(); 
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false); // check if the data is available

  
  useEffect(() => {
    axios.get("http://localhost:8000/api/Courses/" + id,{withCredentials: true})
        .then( res => {
          console.log("u++++++++++",res.data.oneSingleCourse);
          setOneCourse(res.data.oneSingleCourse);
          setLoaded(true); // data available => set "true"
          console.log("y++++++++++",OneCourse.students);
        })
        .catch( err => console.log(err) );
  }, [id]); 





 
  return(
    <div className="DetailsPage">
      <div className="page-top">
        <h1>Speedy Courses</h1>
         <Link to="/courses">
           back to Home
          </Link>
      </div>  
        
      <div className="page-top">
        <h2>{OneCourse.name} courses</h2>
      </div>  
      <div className="page-content">
        <div className="fields">
            <p><span className='infos'>Level:</span>{OneCourse.level}</p>
            <p><span className='infos'>field:</span>{OneCourse.field}</p>
            <p><span className='infos'>description:</span> {OneCourse.description}</p>
            <p><span className='infos'>instructor:</span> {OneCourse.instructor}</p>
            <p><span className='infos'>dayOfWeek:</span> {OneCourse.dayOfWeek}</p>
            <p><span className='infos'>type Of Course:</span> {OneCourse.typeOfCourse}</p>
            <p><span className='infos'>link Meeting:</span> {OneCourse.linkMeeting}</p>
            <p><span className='infos'>documents Link:</span> {OneCourse.documentsLink}</p>
            <p><span className='infos'>start Time:</span> {OneCourse.startTime}</p>
            <p><span className='infos'>end Time:</span> {OneCourse.endTime}</p>
            <p><span className='infos'>duration:</span> {OneCourse.duration} minutes</p>
            <p><span className='infos'>status:</span> {OneCourse.status} minutes</p>
            <p><span className='infos'>students:</span> 
               <ul>
                  { loaded === true ? 
                  OneCourse.students.map((id) => (
                    <li key={id}>
                      {id}
                    </li>
                  )) : null
                } 
               </ul>
            </p>
        </div>
      </div>
    </div>
  );
};


export default DetailsPage;
