import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNoteContext } from "@/context/NotesContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Open = () => {
  const { notes } = useNoteContext();
  const params = useParams();

  const currId = params.noteId;
  const currNote = notes.find((note) => note.id === currId);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (currNote) {
      setTitle(currNote.title);
      setContent(currNote.content);
    }
  }, [currNote]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 py-8 flex-grow">
        <div className="text-2xl font-bold mb-4">Note</div>
        <hr className="mb-4" />
        <div className="mb-4">
          <input
            type="text"
            value={title}
            readOnly
            placeholder="Title"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
          />
          <ReactQuill
            value={content}
            readOnly
            placeholder="Write something..."
            className="w-full h-full mb-4"
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
          <Link to="/">
            <button className="px-4 py-2 bg-green-500 text-white rounded-md">
              Back to Notes
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Open;
