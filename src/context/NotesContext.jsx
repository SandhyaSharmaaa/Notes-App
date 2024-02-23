import { createContext, useContext, useEffect, useState } from "react";

const NoteContext = createContext();

export const useNoteContext = () => useContext(NoteContext);

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [currTitle, setCurrTitle] = useState("");
  const [currContent, setCurrContent] = useState("");

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  const updateNotes = (updatedNotes) => {
    try {
      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    } catch (error) {
      console.error("Error while updating notes:", error);
    }
  };

  const addNote = (note) => {
    try {
      const updatedNotes = [...notes, note];
      updateNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    } catch (error) {
      console.error("Error while adding note:", error);
    }
  };

  const deleteNote = (noteId) => {
    try {
      const updatedNotes = notes.filter((note) => note.id !== noteId);
      updateNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    } catch (error) {
      console.error("Error while deleting note:", error);
    }
  };

  function editNote(noteId) {
    const currNote = notes.find((note) => note.id === noteId);
    setCurrTitle(currNote.title + noteId);
    setCurrContent(currNote.content.slice(3, -4));
  }

  const handleAction = (action, noteId) => {
    switch (action) {
      case "open":
        break;
      case "edit":
        editNote(noteId);
        break;
      case "delete":
        deleteNote(noteId);
        break;
      default:
        break;
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        currContent,
        currTitle,
        deleteNote,
        handleAction,
        updateNotes,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContext;
