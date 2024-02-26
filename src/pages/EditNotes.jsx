import { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useNoteContext } from "@/context/NotesContext";

const EditNote = () => {
  const { notes, setNotes } = useNoteContext();
  const { id } = useParams();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const noteToEdit = notes.find((note) => note.id === id);
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
    }
  }, [id, notes]);

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeContent = (value) => {
    setContent(value);
  };

  const handleSave = () => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, title, content } : note
    );
    setNotes(updatedNotes);
    history.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-36 py-8">
        <div className="text-2xl font-bold mb-4">Edit Note</div>
        <hr className="mb-4" />
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={handleChangeTitle}
            placeholder="Title"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
          />
          <textarea
            value={content}
            onChange={handleChangeContent}
            placeholder="Write something..."
            className="w-full h-72 border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div className="flex justify-between pb-28">
          <div>
            <Link to="/">
              <button className="px-4 py-2 my-10 bg-red-500 text-white rounded-md">
                Cancel
              </button>
            </Link>
          </div>
          <div>
            <button
              onClick={handleSave}
              className="px-4 py-2 my-10 bg-green-500 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditNote;
