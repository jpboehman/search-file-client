import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 600px;
  margin: auto;
`;

const UploadInput = styled.input`
  margin: 10px 0;
`;

const UploadButton = styled.button`
  padding: 10px 15px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Message = styled.p`
  color: green;
  font-weight: bold;
`;

// RETURN HERE IN MORNING
export default function FileUploader() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5001/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("File uploaded successfully!");
      setFile(null);
    } catch (error) {
      setMessage("Upload failed. Try again.");
    }
  };

  return (
    <UploadContainer>
      <h2>Upload a File</h2>
      <UploadInput type="file" onChange={handleFileChange} />
      <UploadButton onClick={handleUpload}>Upload</UploadButton>
      {message && <Message>{message}</Message>}
    </UploadContainer>
  );
}
