import axios from "../../utils/axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// const [error, setError] = useState(null);
const AddCategory = () => {
  const [category, setCategory] = useState({});
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/auth/add_Category", { category })
      .then((result) => {
        if (result.data.Status) {
          navigate("/category");
          // alert("Category added successfully")
        } else {
          alert(result.data.Error);
        }
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-75">
      <div className="p-3 rounded w-25 border ">
        {/* <div className='text-danger'>{error && error}</div> */}

        <h1>Add Category</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="category">Category</label>
            <input
              type="Text"
              id="enroll"
              placeholder="Enter Category"
              onChange={(e) => setCategory(e.target.value)}
              className="form-control rounded-0"
            />
          </div>

          <button className="btn btn-success w-100 rounded-0 mb-2">
            <strong>Add Category</strong>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
