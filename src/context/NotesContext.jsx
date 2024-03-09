import { createContext, useContext, useEffect, useState } from "react";
// import ReactHtmlParser from 'react-html-parser';


const NoteContext = createContext();

export const useNoteContext = () => useContext(NoteContext);

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState(() => {
    if (typeof window === "undefined") {
      return [];
    }
    try {
      const notesData = localStorage.getItem("notes");
      if (notesData) {
        return JSON.parse(notesData);
      }
      return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  });
  const [currTitle, setCurrTitle] = useState("");
  const [currContent, setCurrContent] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    // localStorage.setItem("notes", JSON.stringify(updatedNotes));

    // console.error("Error while adding note:", error);
  };

  const deleteNote = (noteId) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
  };

  function editNote(noteId) {
    const currNote = notes.find((note) => note.id === noteId);
    setCurrTitle(currNote.title);
    setCurrContent((currNote.content));
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
        setNotes,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContext;
