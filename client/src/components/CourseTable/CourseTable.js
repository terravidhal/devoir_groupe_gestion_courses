import React from "react";
import "./CourseTable.css";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'reactstrap';




const CourseTable = (props) => {
  const { allCourses } = props;

  return (
    <div className="CourseTable">
      <Table striped >
         <thead>
          <tr>
            <th>Name of Course</th>
            <th>Level</th>
            <th>Instructor</th>
            <th>Day Of Week</th>
            <th>Time</th>
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
                <td  className="actions">{elt.time}</td>
                <td className="actions">
                  <Link className=""  to={"/courses/" + elt._id}>
                    details
                  </Link> |&nbsp;
                  <Link className=""  to={"/courses/edit/" + elt._id}>
                    edit
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
