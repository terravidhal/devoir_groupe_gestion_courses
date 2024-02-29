import React, { useEffect, useState } from "react";
import "./CourseTable.css";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'reactstrap';
import axios from "axios";
import Button from '../../components/Button/Button';
import Cookies from "universal-cookie";


const CourseTable = (props) => {
  const cookies = new Cookies();
  const userObjsId = cookies.get("USER_OBJ")._id;

  const { allCourses, deleteCourse } = props;
 
 /* const [allStudents, setAllStudents] = useState([]);
  const [loaded, setLoaded] = useState(false);  
  const [studentId, SetStudentId] = useState([]);  */


  // get all students by many Ids

  /*
  useEffect(() => {
    const getManyUser = () => {
      axios.get("http://localhost:8000/api/studentsMany/" + studentId,{withCredentials: true})
          .then( res => {
            console.log("u++++++++++",res.data.students);
            setAllStudents([...allStudents, res.data.students]);
            setLoaded(true); // data available => set "true"
            console.log("y++++++++++",allStudents);
          })
          .catch( err => console.log(err) );
    };
    getManyUser();
  }, []); */


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
            <th>field</th>
            <th>Instructor</th>
            <th>Day Of Week</th>
            <th>type Of Course</th>
            <th>Link Meeting</th>
            <th>documents Link</th>
            <th>start Time</th>
            <th>end Time</th>
            <th>duration</th>
            <th>Status</th>
            <th>Students</th>
            <th>Options</th>
          </tr>
        </thead> 
        <tbody>
        {  allCourses.map((elt, index) => {
            return (
              <tr className="" key={index}>
                <td  className="actions">{elt.name}</td>
                <td  className="actions">{elt.level}</td>
                <td  className="actions">{elt.field}</td>
                <td  className="actions">
                  { userObjsId === elt.instructor ? "Me" :
                     <Link className=""  to={"/instructorByCourse/" + elt.instructor}>
                       view instructor create courses
                     </Link>
                  }
                  {/* {elt.instructor}
                  <Link className=""  to={"/instructorByCourse/" + elt.instructor}>
                       view instructor create courses
                  </Link>&nbsp; */}
                  </td>
                <td  className="actions">{elt.dayOfWeek}</td>
                <td  className="actions">{elt.typeOfCourse}</td>
                <td  className="actions">{elt.linkMeeting}</td>
                <td  className="actions">{elt.documentsLink}</td>
                <td  className="actions">{elt.startTime}</td>
                <td  className="actions">{elt.endTime}</td>
                <td  className="actions">{elt.duration}</td>
                <td  className="actions">
                  <button
                      className={`${
                        elt.status === "pending"
                          ? "red-not-playing-btn"
                          : ""
                      }`}
                    > {elt.status}</button>
                </td>
                <td  className="actions">
                 <ul>
                    <Link className=""  to={"/studentsByCourse/" + elt._id}>
                       view students register
                     </Link>&nbsp;
                  </ul> 
                 
                  </td>
                <td className="actions">
                  <Link className=""  to={"/courses/" + elt._id}>
                    details
                  </Link> |&nbsp;
                  <Link className=""  to={"/courses/edit/" + elt._id}>
                    edit
                  </Link> |&nbsp;
                  <Button  create="" update="" 
                   deletes="delete" 
                   isActive={true}
                   successCallback={() => deleteCourse(elt._id)}/>
                  <button onClick={() => deleteCourse(elt._id)}>remove</button>
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













