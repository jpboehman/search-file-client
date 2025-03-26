import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
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

export default function FileUploader() {
  const [file, setFile] = useState(null);
  const [uploadedBy, setUploadedBy] = useState("");
  const [tags, setTags] = useState("");
  const [project, setProject] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("uploadedBy", uploadedBy);
    formData.append("tags", tags);
    formData.append("project", project);
    formData.append("description", description);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage("File uploaded successfully!");
      setFile(null);
    } catch (error) {
      setMessage("Upload failed. Try again.");
    }
  };

  return (
    <UploadContainer>
      <h2>Upload a File</h2>
      <UploadInput type="file" onChange={(e) => setFile(e.target.files[0])} />

      <UploadInput
        type="text"
        placeholder="Uploaded by"
        onChange={(e) => setUploadedBy(e.target.value)}
      />
      <UploadInput
        type="text"
        placeholder="Tags (comma separated)"
        onChange={(e) => setTags(e.target.value)}
      />
      <UploadInput
        type="text"
        placeholder="Project"
        onChange={(e) => setProject(e.target.value)}
      />
      <UploadInput
        as="textarea"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <UploadButton onClick={handleUpload}>Upload</UploadButton>
      {message && <Message>{message}</Message>}
    </UploadContainer>
  );
}
