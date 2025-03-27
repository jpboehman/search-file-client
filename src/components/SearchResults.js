import styled from "styled-components";

const ResultItem = styled.div`
  background: white;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const SearchResults = ({ results }) => {
  if (!results.length)
    return (
      // margin: 0 auto -> centers the text horizontally
      <p style={{ margin: "0 auto" }}>
        <strong>No results found</strong>
      </p>
    );

  return results.map((file) => (
    <ResultItem key={file._id}>
      <strong>{file.filename}</strong>
      <br />
      <small>Uploaded by: {file.metadata?.uploadedBy || "N/A"}</small>
      <br />
      <small>Tags: {file.metadata?.tags?.join(", ") || "None"}</small>
      <br />
      <small>Project: {file.metadata?.project || "N/A"}</small>
      <br />
      <small>Type: {file.contentType}</small>
      <br />
      <small>Size: {file.length} bytes</small>
      <br />
      <small>Uploaded on: {new Date(file.uploadDate).toLocaleString()}</small>
    </ResultItem>
  ));
};

export default SearchResults;
