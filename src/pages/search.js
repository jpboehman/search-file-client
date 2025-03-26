import { useState } from "react";
import axios from "axios";
import {
  SearchContainer,
  SearchInput,
  SearchResults,
  SearchResultItem,
} from "../styles/SearchPageStyles";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (event) => {
    setQuery(event.target.value);
    if (event.target.value.length > 2) {
      const response = await axios.get(
        `http://localhost:5001/api/search?q=${event.target.value}`
      );

      setResults(response.data);
    } else {
      setResults([]);
    }
  };

  return (
    <SearchContainer>
      <h1>Search Files</h1>
      <SearchInput
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for files..."
      />
      <SearchResults>
        {results &&
          results.map((file) => (
            <SearchResultItem key={file._id}>{file.filename}</SearchResultItem>
          ))}
      </SearchResults>
    </SearchContainer>
  );
}
