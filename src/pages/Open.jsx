import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNoteContext } from "@/context/NotesContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Card } from "@mui/material";

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
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 py-8 flex flex-col gap-6">
        <h1 className="text-2xl font-bold mb-4">Note</h1>
        {/* <hr className="mb-4" />
        <div className="mb-4"> */}
        {/* <input
            type="text"
            value={title}
            readOnly
            placeholder="Title"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
          /> */}
        {/* <ReactQuill
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
          /> */}
        <Card className="flex flex-col gap-6">
          <h1 className="text-primary text-center text-4xl font-semibold">
            {title}
          </h1>

          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="text-center "
          />
        </Card>
        <Link to="/">
          <Button variant="contained">Back to Notes</Button>
        </Link>
      </div>
    </div>
    // </div>
  );
};

export default Open;
