import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { BASE_URL } from "../../utils/axios";
import { ROUTES } from "../../constants/routes";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [booksPerPage] = useState(2);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/v1/book", {
        params: {
          page: currentPage - 1,
          pageSize: booksPerPage,
          search: searchTerm,
        },
      })
      .then((result) => {
        setBooks(result.data.data.books);
        setTotalPages(Math.ceil(result.data.data.count / booksPerPage));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage, searchTerm]); // Added currentPage to dependencies

  const handleDelete = (id) => {
    axios
      .delete(`/v1/book/${id}`)
      .then(() => {
        setBooks(books.filter((book) => book.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = (id) => {
    navigate(ROUTES.UPDATE_BOOKS.replace(":id", id));
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;

  return (
    <div className="px-5 mt-5">
      <div className="d-flex justify-content-center">
        <h3>Book List</h3>
      </div>
      <Link to={ROUTES.ADD_BOOKS} className="btn btn-success mb-3">
        Add Books
      </Link>
      <input
        type="text"
        placeholder="Search by title..."
        className="form-control mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="mt-4">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Year</th>
              <th>Genre</th>
              <th>Quantity</th>
              <th>Fees</th>
              <th>ISBN</th>
              <th>Description</th>
              <th>Published At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>
                  <img
                    src={`${BASE_URL}/uploads/${book.image}`}
                    alt="image"
                    width="100"
                    height="100"
                  />
                </td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>{book.year}</td>
                <td>{book.genre}</td>
                <td>{book.quantity}</td>
                <td>{book.fees}</td>
                <td>{book.isbn}</td>
                <td>{book.description}</td>
                <td>{book.publishedAt}</td>
                <td>
                  <button
                    onClick={() => handleUpdate(book.id)}
                    className="btn btn-primary me-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() =>
                      confirm("Are you sure?") && handleDelete(book.id)
                    }
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Books;
