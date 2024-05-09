import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";

import Spinner from "../components/Spinner";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([
    { _id: 123, title: "dsvd", author: "fvfvfd", publishYear: 1999 },
  ]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        // setBooks(response.data?.data);
        console.log(books);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="text-white">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl my-8"> Book List</h1>
          <Link to="/books/add">
            <MdOutlineAddBox className="text-sky-800 text-4xl"></MdOutlineAddBox>
          </Link>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <table className="w-full bordder-seperate border-spacing-2">
            <thead>
              <tr>
                <th className="border border-slate-600 rounded-md">No</th>
                <th className="border border-slate-600 rounded-md">Title</th>
                <th className="border border-slate-600 rounded-md max-md:hidden">
                  Author
                </th>
                <th className="border border-slate-600 rounded-md max-md:hidden">
                  Publish Year
                </th>
                <th className="border border-slate-600 rounded-md">
                  Operations
                </th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => {
                <tr key={book._id} className="h-8">
                  <td className="border border-slate-700 rounded-md text-center">
                    {index + 1}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {book.title}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                    {book.author}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                    {book.publishYear}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    <div className="flex justify-center gap-x-4">
                      <Link to={`/books/details/${book._id}`}>
                        <BsInfoCircle className="text-2xl text-green-800"></BsInfoCircle>
                      </Link>
                      <Link to={`/books/edit/${book._id}`}>
                        <AiOutlineEdit className="text-2xl text-yellow-600"></AiOutlineEdit>
                      </Link>
                      <Link to={`/books/delete/${book._id}`}>
                        <MdOutlineDelete className="text-2xl text-red-600"></MdOutlineDelete>
                      </Link>
                    </div>
                  </td>
                </tr>;
              })}
            </tbody>
          </table>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default Home;
