import { useState, useEffect } from "react";
import axios from "axios";
import {
  SearchContainer,
  SearchInput,
  FilterSection,
  FilterLabel,
  FilterInput,
} from "../styles/SearchPageStyles";
import SearchResults from "../components/SearchResults";
import FileTypeDropdown from "@/components/FileTypeDropdown";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // New filter states
  const [uploadedBy, setUploadedBy] = useState("");
  const [tag, setTag] = useState("");
  const [fileType, setFileType] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length > 2 || uploadedBy || tag || fileType) {
        const params = new URLSearchParams({
          q: query,
          uploadedBy,
          tag,
          fileType,
        });
        const response = await axios.get(
          `http://localhost:5001/api/search?${params.toString()}`
        );
        setResults(response.data);
      } else {
        setResults([]);
      }
    };

    const timeout = setTimeout(() => fetchResults(), 300); // debounce
    return () => clearTimeout(timeout);
  }, [query, uploadedBy, tag, fileType]);

  return (
    <SearchContainer>
      <h1>Search Files</h1>
      <SearchInput
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by filename, metadata, etc."
      />

      <FilterSection>
        <FilterLabel>Uploaded By:</FilterLabel>
        <FilterInput
          type="text"
          value={uploadedBy}
          onChange={(e) => setUploadedBy(e.target.value)}
        />

        <FilterLabel>Tag:</FilterLabel>
        <FilterInput
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />

        <FilterLabel>File Type:</FilterLabel>
        <FileTypeDropdown onChange={(value) => setFileType(value)} />
      </FilterSection>

      <SearchResults results={results} />
    </SearchContainer>
  );
};

export default SearchPage;
