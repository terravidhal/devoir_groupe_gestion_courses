import React, { useEffect, useState } from "react";
import "./CourseTableStudent.css";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'reactstrap';
import axios from "axios";
import Button from '../../components/Button/Button';
import Cookies from "universal-cookie";


const CourseTableStudent = (props) => {
  const cookies = new Cookies();
  const userObjsId = cookies.get("USER_OBJ")._id;

  const { allCourses} = props;
 
/*
  const [stat, setStat] = useState("Pending");
    // check status day of week
    const CheckDayOfWeekErrors = (date) =>{ 
      const currentDate = new Date();
      const selectedDate = new Date(date); 
     
     if (selectedDate.getDay() < currentDate.getDay()) {
           setStat("Obsolete");
           console.log("selectedDate.getDay()",selectedDate.getDay());
           console.log("currentDate.getDay()",currentDate.getDay());
           console.log(stat);
          } 
          else{
            console.log("selectedDate.getDay()",selectedDate);
            console.log("currentDate.getDay()",currentDate);
            console.log(stat);
     }
   } */





  return (
    <div className="CourseTableStudent">
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
                        <Link className=""  to={"/instructorByCourse/" + elt.instructor}>
                         view instructor create courses
                       </Link>
                     
                      {/* {elt.instructor}
                      <Link className=""  to={"/instructorByCourse/" + elt.instructor}>
                           view instructor create courses
                      </Link>&nbsp; */}
                      </td>
                    <td  className="actions">
                      {elt.dayOfWeek}
                      {/* {CheckDayOfWeekErrors(elt.dayOfWeek)} */}
                    </td>
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
                    {/* <td  className="actions">
                      <button
                          className={`${
                            stat === "pending"
                              ? "red-not-playing-btn"
                              : ""
                          }`}
                        > {stat}</button>
                    </td> */}
                      <td className="actions">
                            <Link className=""  to={"/courses/" + elt._id}>
                              details
                            </Link> |&nbsp;
                      </td>
              </tr>
            );
          })} 
        </tbody>
      </Table>
    </div>
  );
};





export default CourseTableStudent;














