import React from "react";
// import { Link } from 'react-router-dom'
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useEffect } from 'react'
// import Dashboard from './Dashboard'
const AddGroup = () => {
  const [group, setGroup] = useState({
    // group:'',
    // academicId:''
  });
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/add_group", { Group: group })
      .then((result) => {
        if (result.data.Status) {
          navigate("/group");
          // alert("Group added successfully")
        } else {
          alert(result.data.Error);
        }
        console.log(result.data);
      });
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-75">
      <div className="p-3 rounded w-25 border ">
        {/* <div className='text-danger'>{error && error}</div> */}

        <h1>Add Group</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="group">Group</label>
            <input
              type="Text"
              id="enrol"
              placeholder="Enter group name"
              onChange={(e) => setGroup({ ...group, group: e.target.value })}
              className="form-control rounded-0"
            />
            <input
              type="number"
              id="enrol"
              placeholder="Enter academic id"
              onChange={(e) =>
                setGroup({ ...group, academicId: e.target.value })
              }
              className="form-control rounded-0"
            />
          </div>

          <button className="btn btn-success w-100 rounded-0 mb-2">
            <strong>Add Group</strong>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGroup;
