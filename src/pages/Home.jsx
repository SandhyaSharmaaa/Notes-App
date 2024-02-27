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
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const themes = {
    dark: {
      background: "bg-slate-700",
      text: "text-amber-400",
      buttonBg: "bg-amber-400",
      buttonText: "text-black",
      cardBg: "bg-gray-800",
      cardText: "text-white",
      cardDate: "text-amber-400",
      dropdownText: "text-black",
    },
    light: {
      background: "bg-white",
      text: "text-green-500",
      buttonBg: "bg-green-500",
      buttonText: "text-white",
      cardBg: "bg-white",
      cardText: "text-black",
      cardDate: "text-green-500",
      dropdownText: "text-black",
    },
    mysticDusk: {
      background: "bg-blue-200",
      text: "text-blue-800",
      buttonBg: "bg-blue-500",
      buttonText: "text-white",
      cardBg: "bg-white",
      cardText: "text-black",
      cardDate: "text-blue-500",
      dropdownText: "text-black",
    },
    roseHorizon: {
      background: "bg-pink-200",
      text: "text-pink-800",
      buttonBg: "bg-red-500",
      buttonText: "text-white",
      cardBg: "bg-white",
      cardText: "text-black",
      cardDate: "text-red-600",
      dropdownText: "text-black",
    },
  };

  const toggleTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    setThemeDropdownOpen(false);
  };

  const handleDropdownChange = (index) => {
    setDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (sortOption === "name") {
      return a.title.localeCompare(b.title);
    } else if (sortOption === "date") {
      return a.date.localeCompare(b.date);
    }
    return 0;
  });

  return (
    <div
      className={`min-h-screen ${themes[theme].background} ${themes[theme].text}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 py-8">
        <div
          className={`text-5xl font-bold font-mono text-center mb-4 ${themes[theme].text}`}
        >
          Notes App
        </div>
        <hr className="mb-4" />
        <div className="flex flex-col sm:flex-row items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-2 border border-black rounded-md mb-2 sm:mb-0 sm:mr-2"
          />
          <div className="flex items-center mb-2 sm:mb-0">
            <select
              className="p-2 border border-black rounded-md mr-2"
              value={sortOption || ""}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="">Sort</option>
              <option value="name">Name</option>
              <option value="date">Date</option>
            </select>
            <Link to="/create">
              <button
                className={`px-4 py-2 ${themes[theme].buttonBg} ${themes[theme].buttonText} rounded-md`}
              >
                Create
              </button>
            </Link>
          </div>
          <div className="relative ml-4">
            <button
              onClick={() => setThemeDropdownOpen((prev) => !prev)}
              className={`px-4 py-2 ${themes[theme].buttonBg} ${themes[theme].buttonText} rounded-md`}
            >
              {themeDropdownOpen ? "Close Themes" : "Choose Theme"}
            </button>
            {themeDropdownOpen && (
              <div className="absolute mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-md z-10">
                {Object.keys(themes).map((key) => (
                  <button
                    key={key}
                    onClick={() => toggleTheme(key)}
                    className={`block w-full py-1 px-4 hover:bg-gray-100 ${themes[key].dropdownText}`}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedNotes.map((note, index) => (
            <div key={index} className="relative">
              <Link to={`/open/${note.id}`}>
                <div
                  className={`p-4 shadow-md rounded-md overflow-hidden hover: ${themes[theme].cardBg} ${themes[theme].cardText}`}
                >
                  <h3 className="font-bold text-lg mb-2">{note.title}</h3>
                  <div style={{ wordWrap: "break-word" }}>
                    {ReactHtmlParser(note.content)}
                  </div>
                  <p
                    className={`text-[12px] mt-3 font-bold ${themes[theme].cardDate}`}
                  >
                    {note.date}
                  </p>
                </div>
              </Link>

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
                        className="block w-full py-1 text-left px-4 hover:bg-gray-100 text-black"
                      >
                        Open
                      </button>
                    </Link>
                    <Link to={`/edit/${note.id}`}>
                      <button
                        onClick={() => handleAction("edit", note.id)}
                        className="block w-full py-1 text-left px-4 hover:bg-gray-100 text-black"
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
