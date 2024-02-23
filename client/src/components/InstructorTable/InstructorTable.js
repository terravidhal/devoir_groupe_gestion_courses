import React, { useEffect, useState } from "react";
import './InstructorTable.css';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'reactstrap';
import axios from "axios";




const InstructorTable = (props) => {
  const { allInstructors } = props;


  return (
    <div className="InstructorTable">
      <Table striped >
         <thead>
          <tr>
            <th>Name of Instructor</th>
            <th>Options</th>
          </tr>
        </thead> 
        <tbody>
        {allInstructors.map((elt, index) => {
            return (
              <tr className="" key={index}>
                <td  className="actions">{elt.name}</td>
                <td className="actions">
                  <Link className=""  to={"/instructors/" + elt._id}>
                    details
                  </Link> |&nbsp;
                  <Link className=""  to={"/instructors/edit/" + elt._id}>
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



export default InstructorTable;







































