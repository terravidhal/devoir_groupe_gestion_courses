import React from 'react';
import './Button.css';
import axios from 'axios';







const Button = (props) => {
    const { courseId, successCallback, create, update, deletes, isActive } = props;
  
    const deleteProductfunc = (e) => {
      axios
        .delete("http://localhost:8000/api/courses/" + courseId)
        .then((res) => {
          successCallback(); // => console.log(res.data);
        })
        .catch((err) => console.log(err));
    };
  
    return (
      <>
        { deletes === "delete" ?
           <button
          className="btn btn-danger Button"
          onClick={deleteProductfunc}
        >
          <i class="fa-solid fa-house"></i> &nbsp;Remove
           </button> 
           : null
        }
        
        { create === "create" ?
        <div className="validate_form">
          <button
            disabled={isActive === false ? true : false}
            className={isActive === false ? "submit_btn" : "submit_btn active"}
            value="Create"
            type="submit"
          ><i class="fa-solid fa-upload"></i> &nbsp;Create</button>
        </div>  : null
        }
        { update === "update" ?
        <div className="validate_form">
          <button
  
            disabled={isActive === false ? true : false}
            className={isActive === false ? "submit_btn" : "submit_btn active"}
            value="Update"
            type="submit"
          ><i class="fa-solid fa-pen"></i> &nbsp;Update</button>
        </div>  : null
        }
      </>
    );
  };



export default DeleteButton;
