// src/components/SearchBar.jsx
import { useState } from "react";
import { Search } from "lucide-react"; // install: npm install lucide-react
import { toast } from "react-toastify";
import Button from "../Button/Buttons";
export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [disable, setdisable] = useState(false);

  const handleSubmit = (e) => {
    setdisable(true);
    e.preventDefault(); // prevent page refresh
    console.log("Searching for:", query);
    if (query.trim() === "") {
      toast.error("Please enter something to search!");
      setTimeout(() => {
        setdisable(false);
      }, 3000);
    } else {
      toast.success(`Searching for "${query}"`);
      setTimeout(() => {
        setdisable(false);
      }, 3000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full max-w-xl bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 shadow-sm transition-colors duration-200"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        // e.target.value ->> Current value in input
        placeholder="Find Notes"
        className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-500"
        //   flex-grow → the input expands to fill available horizontal space (so the icon sits at the right).
        //   outline-none → removes the default browser outline when the input is focused.
        //   bg-transparent → makes the input background transparent to blend with the form's background.
      />
      <Button
        type="submit"
        disabled={disable}
        // className="text-gray-600 hover:text-gray-800"
      variant="secondary"
      >
        <Search size={18} />
      </Button>
    </form>
  );
}
