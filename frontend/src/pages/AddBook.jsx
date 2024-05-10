import { useEffect, useState } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveBook = () => {
    const data = { title, author, publishYear };
    setLoading(true);
    axios
      .post("http://localhost:5555/books", data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((e) => {
        setLoading(false);
        alert("An error happened, Please check console");
        console.error(e);
      });
  };
  useEffect(() => {}, []);
  return (
    <div className="p-4">
      <BackButton />
      <h1>Add Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-sky-400 rounded-xl w-[600px] p-4 ax-auto">
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Title</label>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddBook;
