import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNoteContext } from "@/context/NotesContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  const { updateNotes, notes } = useNoteContext();
  const params = useParams();
  const navigateTo = useNavigate();
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

  const editChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const editChangeContent = (value) => {
    setContent(value);
  };

  const handleSave = () => {
    try {
      const updatedNotes = notes.map((note) =>
        note.id === currId ? { ...note, title, content } : note
      );
      updateNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      navigateTo("/");
    } catch (error) {
      console.error("Error while saving note:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 py-8 flex-grow">
        <div className="text-2xl font-bold mb-4">Edit Note</div>
        <hr className="mb-4" />
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={editChangeTitle}
            placeholder="Title"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
          />
          <ReactQuill
            value={content}
            onChange={editChangeContent}
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
        <div className="w-full flex justify-between">
          <Link to="/">
            <button className="px-4 py-2 bg-red-500 text-white rounded-md mr-2">
              Cancel
            </button>
          </Link>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
