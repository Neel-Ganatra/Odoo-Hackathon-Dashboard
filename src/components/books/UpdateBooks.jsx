import axios from "../../utils/axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBooks = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    isbn: "",
    year: "",
    genre: "",
    fees: "",
    publisher: "",
    quantity: "",
    description: "",
    publishedAt: "",
    image: "",
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`/v1/book/${id}`);
        setBook({
          title: response.data.data.title,
          author: response.data.data.author,
          isbn: response.data.data.isbn,
          year: response.data.data.year,
          genre: response.data.data.genre,
          fees: response.data.data.fees,
          publisher: response.data.data.publisher,
          quantity: response.data.data.quantity,
          description: response.data.data.description,
          publishedAt: response.data.data.publishedAt,
        });
      } catch (error) {
        console.error(error);
        alert("An error occurred while fetching book details.");
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleProfilePicture = (e) => {
    setProfilePicture(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedBook = { ...book };

    try {
      if (profilePicture) {
        const formData = new FormData();
        formData.append("file", profilePicture);

        const uploadResponse = await axios.post("/v1/borrow/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (uploadResponse.data.Status) {
          updatedBook.image = uploadResponse.data.data.url;
        } else {
          alert(uploadResponse.data.Error);
          return;
        }
      }

      const updateResponse = await axios.put(`/v1/book/${id}`, updatedBook);
      navigate("/books");
    } catch (error) {
      console.error("Error updating book:", error);
      alert("An error occurred while updating the book.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "600px" }}>
        <h1 className="mb-4">Update Book</h1>
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
                value={book.title}
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
                value={book.author}
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
                value={book.isbn}
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
                value={book.year}
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
                value={book.genre}
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
                value={book.fees}
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
                value={book.publisher}
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
                value={book.quantity}
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
              value={book.description}
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
              value={book.publishedAt}
              onChange={(e) => {
                console.log(e.target.value);
                setBook({ ...book, publishedAt: e.target.value });
              }}
              className="form-control"
            />
          </div>
          <button className="btn btn-success w-100">
            <strong>Update Book</strong>
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBooks;
