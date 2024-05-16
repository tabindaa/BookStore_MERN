import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";

import Spinner from "../components/Spinner";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data?.data);
        console.log(books);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="">
      <div className="p-4">
        <div className="flex justify-between items-center gap-x-4">
          <button
            className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
            onClick={() => setShowType("table")}
          >
            Table
          </button>
          <button
            className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
            onClick={() => setShowType("card")}
          >
            Card
          </button>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl my-8"> Book List</h1>
          <Link to="/books/add">
            <MdOutlineAddBox className="text-sky-800 text-4xl"></MdOutlineAddBox>
          </Link>
        </div>
        {loading ? (
          <Spinner />
        ) : showType == "table" ? (
          <BooksTable books={books} />
        ) : (
          <BooksCard books={books} />
        )}
      </div>
      <div></div>
    </div>
  );
};

export default Home;
