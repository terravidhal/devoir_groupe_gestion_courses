import React from "react";
import PropTypes from "prop-types";
import "./AuthorTable.css";
import DeleteButton from "../DeleteButton/DeleteButton";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'reactstrap';




const AuthorTable = (props) => {
  const { allAuthors, deleteAuthor } = props;

  return (
    <div className="AuthorTable">
      <Table striped>
        <thead>
          <tr>
            <th>Author</th>
            <th>Actions available</th>
          </tr>
        </thead>
        <tbody>
        {allAuthors.map((elt, index) => {
            return (
              <tr className="" key={index}>
                <td  className="actions">{elt.name}</td>
                <td className="actions">
                  <Link className="btn btn-primary"  to={"/authors/edit/" + elt._id}>
                    Edit
                  </Link>
                  <DeleteButton authorId={elt._id} successCallback={() => deleteAuthor(elt._id)}/>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

AuthorTable.propTypes = {};

AuthorTable.defaultProps = {};

export default AuthorTable;
