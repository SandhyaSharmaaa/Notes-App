import { useState } from "react";
import { Link } from "react-router-dom";
import { useNoteContext } from "@/context/NotesContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@mui/material";

const Create = () => {
  const { addNote } = useNoteContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeContent = (value) => {
    setContent(value);
  };

  const handleSave = () => {
    addNote({
      id: uniqueId(),
      title: title,
      content: content,
      date: formattedDate,
    });
  };
  // const { id, date } = addNote;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const formattedDate = formatDate(new Date().toISOString().split("T")[0]);

  function uniqueId() {
    let text = Math.random().toString(36);
    let id = text.slice(2, 5);
    return id;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-6 sm:px-8 lg:px-24 py-5">
        <div className="text-2xl font-bold mb-4">Create Note</div>
        <hr className="mb-4" />
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={handleChangeTitle}
            placeholder="Title"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
          />
          <ReactQuill
            value={content}
            onChange={handleChangeContent}
            placeholder="Write something..."
            className="w-full h-full"
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                ["link", "image"],
                ["clean"],
              ],
            }}
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <Link to="/" className="mb-2 sm:mb-0">
            <Button variant="contained" className="w-full !bg-danger">
              Cancel
            </Button>
          </Link>
          <Link to="/">
            <Button variant="contained" onClick={handleSave} className="w-full">
              Save
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Create;
