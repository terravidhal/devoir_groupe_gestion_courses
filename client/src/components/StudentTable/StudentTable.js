import React, { useEffect, useState } from "react";
import './StudentTable.css'
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'reactstrap';
import axios from "axios";




const StudentTable = (props) => {
  const { allStudents } = props;


  return (
    <div className="StudentTable">
      <Table striped >
         <thead>
          <tr>
            <th>Name of Student</th>
            <th>Level</th>
            <th>Options</th>
          </tr>
        </thead> 
        <tbody>
        {allStudents.map((elt, index) => {
            return (
              <tr className="" key={index}>
                <td  className="actions">{elt.name}</td>
                <td  className="actions">{elt.level}</td>
                <td className="actions">
                  <Link className=""  to={"/students/" + elt._id}>
                    details
                  </Link> |&nbsp;
                  <Link className=""  to={"/students/edit/" + elt._id}>
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



export default StudentTable;



























