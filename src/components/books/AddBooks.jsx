import axios from "../../utils/axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBooks = () => {
  const [book, setBook] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  const handleProfilePicture = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", profilePicture);

    const res = await axios.post("/v1/borrow/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(res.data.data.url);

    await axios
      .post("/v1/book", {
        title: book.title,
        author: book.author,
        description: book.description,
        publisher: book.publisher,
        publishedAt: book.publishedAt,
        image: res.data.data.url,
        isbn: book.isbn,
        year: book.year,
        genre: book.genre,
        fees: book.fees,
        quantity: book.quantity,
      })
      .then((response) => {
        navigate("/books");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "600px" }}>
        <h1 className="mb-4">Add Book</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="profilePicture">Profile Picture</label>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={handleProfilePicture}
              className="form-control"
            />
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                placeholder="Enter title"
                onChange={(e) => setBook({ ...book, title: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                id="author"
                placeholder="Enter author"
                onChange={(e) => setBook({ ...book, author: e.target.value })}
                className="form-control"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="isbn">ISBN</label>
              <input
                type="text"
                id="isbn"
                placeholder="Enter ISBN"
                onChange={(e) => setBook({ ...book, isbn: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="year">Year</label>
              <input
                type="number"
                id="year"
                placeholder="Enter year"
                onChange={(e) => setBook({ ...book, year: e.target.value })}
                className="form-control"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="genre">Genre</label>
              <input
                type="text"
                id="genre"
                placeholder="Enter genre"
                onChange={(e) => setBook({ ...book, genre: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="fees">Fees</label>
              <input
                type="number"
                id="fees"
                placeholder="Enter fees"
                onChange={(e) => setBook({ ...book, fees: e.target.value })}
                className="form-control"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="publisher">Publisher</label>
              <input
                type="text"
                id="publisher"
                placeholder="Enter publisher"
                onChange={(e) =>
                  setBook({ ...book, publisher: e.target.value })
                }
                className="form-control"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                id="quantity"
                placeholder="Enter quantity"
                onChange={(e) => setBook({ ...book, quantity: e.target.value })}
                className="form-control"
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              placeholder="Enter description"
              onChange={(e) =>
                setBook({ ...book, description: e.target.value })
              }
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="publishedAt">Published At</label>
            <input
              type="date"
              id="publishedAt"
              onChange={(e) =>
                setBook({ ...book, publishedAt: e.target.value })
              }
              className="form-control"
            />
          </div>
          <button className="btn btn-success w-100">
            <strong>Add Book</strong>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBooks;
