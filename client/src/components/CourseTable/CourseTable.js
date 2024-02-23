import React, { useEffect, useState } from "react";
import "./CourseTable.css";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'reactstrap';
import axios from "axios";




const CourseTable = (props) => {
  const { allCourses } = props;
/*  const [allUser, setAllUser] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [studentId, SetStudentId] = useState([]);  */


  // get all courses

  /*
  useEffect(() => {
    const getOneUser = (userId) => {
      axios.get("http://localhost:8000/api/users/" + userId,{withCredentials: true})
          .then( res => {
            console.log("u++++++++++",res.data.oneSingleUser);
            setAllUser([...allUser, res.data.oneSingleUser]);
            setLoaded(true); // data available => set "true"
            console.log("y++++++++++",allUser);
          })
          .catch( err => console.log(err) );
    };
  /*  studentId.forEach(element => {
      
      getOneUser(element);
    });*/
/*  }, []); */


/*
  // get all users by specific course
  const getAllUserBySpecificCourse = (CourseId) => {
    axios.get("http://localhost:8000/api/students/course/" + CourseId,{withCredentials: true})
        .then( res => {
          console.log("u++++++++++",res.data.students);
          setAllUser([...allUser, res.data.students]);
          setLoaded(true); // data available => set "true"
          //console.log("y++++++++++",allUser.students);
        })
        .catch( err => console.log(err) );
  }

  // get specific user
  const getOneUser2 = (userId) => {
    axios.get("http://localhost:8000/api/users/" + userId,{withCredentials: true})
        .then( res => {
          console.log("u++++++++++",res.data.oneSingleUser);
         // setAllUser([...allUser, res.data.oneSingleUser]);
        //  setLoaded(true); // data available => set "true"
          //console.log("y++++++++++",allUser.students);
        })
        .catch( err => console.log(err) );
  } */

/*  const getOneUser = async (userId) => {
    try {
      const res = await axios.get("http://localhost:8000/api/users/" + userId, { withCredentials: true });
      setAllUser([...allUser, res.data.oneSingleUser]);
     console.log("u++++++++++",res.data.oneSingleUser);
      return res.data.oneSingleUser;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur :", error);
      return ""; // Retourne une valeur par défaut en cas d'erreur
    }
  }; */




 

  // get all user 
 /* const getallUser = () => {

   oneStudent.forEach((elt) => {
     console.log(elt);
      getOneUser(elt);
    });
    
  } */




 



  return (
    <div className="CourseTable">
      <Table striped >
         <thead>
          <tr>
            <th>Name of Course</th>
            <th>Level</th>
            <th>Instructor</th>
            <th>Day Of Week</th>
            <th>Link Meeting</th>
            <th>Time</th>
            <th>Students</th>
            <th>Options</th>
          </tr>
        </thead> 
        <tbody>
        {allCourses.map((elt, index) => {
            return (
              <tr className="" key={index}>
                <td  className="actions">{elt.name}</td>
                <td  className="actions">{elt.level}</td>
                <td  className="actions">{elt.instructor}</td>
                <td  className="actions">{elt.dayOfWeek}</td>
                <td  className="actions">{elt.linkMeeting}</td>
                <td  className="actions">{elt.time}</td>
                <td  className="actions">
                  {/* {elt.students} */}
                 <ul>
                    {/* { loaded === true ?
                     allUser.map(async(elt,index) => {
                       return(
                        <li key={index}>
                          { elt.name}
                        </li>
                       );
                       }) : null
                    }    */}
                    { 
                     elt.students.map((elt,index) => {
                       return(

                        <li key={index}>
                          { elt}
                        </li>
                        
                        // SetStudentId([...studentId, elt])
                        
                       );
                       }) 
                    }   
                  </ul> 
                 
                  </td>
                <td className="actions">
                  <Link className=""  to={"/courses/" + elt._id}>
                    details
                  </Link> |&nbsp;
                  <Link className=""  to={"/courses/edit/" + elt._id}>
                    edit
                  </Link> |&nbsp;
                  <Link className=""  to={"/courses/delete/" + elt._id}>
                    delete
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};



export default CourseTable;













