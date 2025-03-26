import { useState, useEffect } from "react";
import axios from "axios";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query.length > 2) {
      axios.get(`http://localhost:5000/api/products/search?query=${query}`)
        .then(res => setSuggestions(res.data))
        .catch(err => console.error(err));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  return (
    <div className="relative w-full">
      <input type="text" placeholder="Search for products..."
        className="w-full border p-2"
        value={query}
        onChange={(e) => setQuery(e.target.value)} />
      {suggestions.length > 0 && (
        <div className="absolute bg-white border w-full mt-1">
          {suggestions.map((item) => (
            <div key={item.id} className="p-2 hover:bg-gray-200">
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
