import { useState } from "react";
import { Link } from "react-router-dom";
import { useNoteContext } from "@/context/NotesContext";
import ReactHtmlParser from "react-html-parser";

const Home = () => {
  const { notes, handleAction } = useNoteContext();
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [sortOption, setSortOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleDropdownChange = (index) => {
    setDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const sortedAndFilteredNotes = notes
    .filter((note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "name") {
        return a.title.localeCompare(b.title);
      } else if (sortOption === "date") {
        return a.date.localeCompare(b.date);
      }
      return 0;
    });

  return (
    <div
      className={`min-h-screen ${
        theme === "light" ? "bg-white" : "bg-black"
      } text-black`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 py-8">
        <div
          className={`text-5xl font-bold font-mono text-center mb-4 ${
            theme === "light" ? "" : "text-yellow-400"
          }`}
        >
          Notes App
        </div>
        <hr className="mb-4" />
        <div className="flex flex-col sm:flex-row items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-md mb-2 sm:mb-0 sm:mr-2"
          />
          <select
            className="p-1 border border-gray-300 rounded-md mb-2 sm:mb-0 sm:mr-2"
            value={sortOption || ""}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="name">Name</option>
            <option value="date">Date</option>
          </select>
          <Link to="/create">
            <button
              className={`px-4 py-2 ${
                theme === "light"
                  ? "bg-green-500 text-white"
                  : "bg-orange-600 text-black"
              } rounded-md`}
            >
              Create
            </button>
          </Link>
          <button
            onClick={toggleTheme}
            className={`ml-4 px-4 py-2 ${
              theme === "light"
                ? "bg-black text-white"
                : "bg-yellow-400 text-black"
            } rounded-md`}
          >
            {theme === "light" ? "Dark Theme" : "Light Theme"}
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedAndFilteredNotes.map((note, index) => (
            <div key={index} className="relative">
              <div
                className={`p-4 shadow-md rounded-md overflow-hidden ${
                  theme === "light" ? "bg-white" : "bg-yellow-400 text-black"
                }`}
              >
                <h3 className="font-bold text-lg mb-2">{note.title}</h3>
                <div style={{ wordWrap: "break-word" }}>
                  {ReactHtmlParser(note.content)}
                </div>
                <p
                  className={`text-[12px] mt-3 font-bold ${
                    theme === "light" ? "text-green-500" : "text-orange-600"
                  }`}
                >
                  {note.date}
                </p>
              </div>
              <div className="absolute top-0 right-0 mt-2 mr-2">
                <button
                  onClick={() => handleDropdownChange(index)}
                  className="text-xl"
                >
                  ^
                </button>
                {dropdownIndex === index && (
                  <div className="absolute top-full right-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-md z-10">
                    <Link to={`/open/${note.id}`}>
                      <button
                        onClick={() => handleAction("open", note.id)}
                        className="block w-full py-1 text-left px-4 hover:bg-gray-100"
                      >
                        Open
                      </button>
                    </Link>
                    <Link to={`/edit/${note.id}`}>
                      <button
                        onClick={() => handleAction("edit", note.id)}
                        className="block w-full py-1 text-left px-4 hover:bg-gray-100"
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        handleAction("delete", note.id);
                        setDropdownIndex(null);
                      }}
                      className="block w-full py-1 text-left px-4 hover:bg-gray-100 text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
