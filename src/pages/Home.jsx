import { useState } from "react";
import { Link } from "react-router-dom";
import { useNoteContext } from "@/context/NotesContext";
// import ReactHtmlParser from "react-html-parser";
import noteshopper from "@/assets/images/NotesHopper.svg";
import { MdDelete, MdMenuBook } from "react-icons/md";
import { Button } from "@mui/material";
import { FaEdit, FaFolderOpen, FaRegHeart } from "react-icons/fa";
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
  {
    console.log(notes);
  }
  const truncateContent = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(" ") + "...";
  };
  return (
    <div
      className={`min-h-screen ${themes[theme].background} ${themes[theme].text}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 py-8 space-y-4">
        {/* Notes App */}
        <img src={noteshopper} className="w-32 md:w-60 mb-10" />

        {/* <hr className="mb-4" /> */}
        <div className="flex flex-col gap-4 sm:flex-row items-center">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-2 border border-black rounded-md "
          />
          <div className="flex items-center gap-4 ">
            <select
              className="px-4 py-2 text-center border border-primary text-primary rounded-md "
              value={sortOption || ""}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="">Sort</option>
              <option value="name">Name</option>
              <option value="date">Date</option>
            </select>
            <Link to="/create">
              <Button
                variant="contained"
                className={`px-6 py-4 ${themes[theme].buttonBg} ${themes[theme].buttonText} rounded-md`}
              >
                Create
              </Button>
            </Link>
          </div>
          <div className="relative">
            <Button
              variant="contained"
              onClick={() => setThemeDropdownOpen((prev) => !prev)}
              className={`px-6 py-4 ${themes[theme].buttonBg} ${themes[theme].buttonText} rounded-md`}
            >
              {themeDropdownOpen ? "Close Themes" : "Choose Theme"}
            </Button>
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
                  <h3 className="font-bold text-lg text-primary mb-2">
                    {note.title}
                  </h3>
                  {/* <div className="break">
                    {ReactHtmlParser(note.content)}
                  </div> */}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: truncateContent(note?.content, 15),
                    }}
                  />
                  <div className="flex items-center justify-between">
                    <p
                      className={`text-[12px] text-primary-light mt-3 font-bold ${themes[theme].cardDate}`}
                    >
                      {note.date}
                    </p>
                    <FaRegHeart />
                  </div>
                </div>
              </Link>

              <div className="absolute top-0 right-0 mt-2 mr-2">
                <Button
                  onClick={() => handleDropdownChange(index)}
                  variant="text"
                >
                  <MdMenuBook size={20} />
                </Button>
                {dropdownIndex === index && (
                  <div className="absolute top-full right-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-md z-10">
                    <Link to={`/open/${note.id}`}>
                      <button
                        onClick={() => handleAction("open", note.id)}
                        className=" flex items-center gap-4 w-full py-1 text-left px-4 hover:bg-gray-100 text-primary"
                      >
                        <FaFolderOpen className="text-primary" size={14} />
                        Open
                      </button>
                    </Link>
                    <Link to={`/edit/${note.id}`}>
                      <button
                        onClick={() => handleAction("edit", note.id)}
                        className="flex items-center gap-4 w-full py-1 text-left px-4 hover:bg-gray-100 text-primary"
                      >
                        <FaEdit className="text-primary" size={14} />
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        handleAction("delete", note.id);
                        setDropdownIndex(null);
                      }}
                      className="flex items-center gap-4 w-full py-1 text-left px-4 hover:bg-gray-100 text-red-600"
                    >
                      <MdDelete className="text-danger" size={16} />
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
