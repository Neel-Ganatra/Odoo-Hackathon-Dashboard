import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Group = () => {
  const [group, setGroup] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/group")
      .then((result) => {
        if (result.data.Status) {
          setGroup(result.data.Result);
        }
        // console.log(result.data)
        else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="px-5 mt-5">
      <div className="d-flex justify-content-center">
        <h3>Groups List</h3>
      </div>
      <Link to="add_group" className="btn btn-success">
        Add Groups
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Academic Id</th>
            </tr>
          </thead>
          <tbody>
            {group.map((c) => (
              <tr>
                <td>{c.name}</td>
                <td>{c.academic_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Group;
