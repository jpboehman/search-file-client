import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

// Layout
const UploadContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  background: #f8f9fa;
  padding: 30px 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  font-family: "Segoe UI", sans-serif;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
  color: #333;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 6px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  min-height: 80px;
`;

const UploadButton = styled.button`
  background-color: #0070f3;
  color: white;
  padding: 12px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0059c1;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  &:active {
    background-color: #004494;
  }
`;

const Message = styled.p`
  margin-top: 15px;
  font-weight: bold;
  color: ${(props) => (props.error ? "red" : "green")};
`;

export default function FileUploader() {
  const [file, setFile] = useState(null);
  const [uploadedBy, setUploadedBy] = useState("");
  const [tags, setTags] = useState("");
  const [project, setProject] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setError(true);
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
      setError(false);
      setFile(null);
    } catch (error) {
      console.error(error);
      setMessage("Upload failed. Try again.");
      setError(true);
    }
  };

  return (
    <UploadContainer>
      <SectionTitle>Upload a File</SectionTitle>

      <FieldGroup>
        <Label>Select File</Label>
        <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
      </FieldGroup>

      <FieldGroup>
        <Label>Uploaded By</Label>
        <Input
          type="text"
          value={uploadedBy}
          onChange={(e) => setUploadedBy(e.target.value)}
        />
      </FieldGroup>

      <FieldGroup>
        <Label>Tags (comma separated)</Label>
        <Input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </FieldGroup>

      <FieldGroup>
        <Label>Project</Label>
        <Input
          type="text"
          value={project}
          onChange={(e) => setProject(e.target.value)}
        />
      </FieldGroup>

      <FieldGroup>
        <Label>Description</Label>
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FieldGroup>

      <UploadButton onClick={handleUpload}>Upload</UploadButton>

      {message && <Message error={error}>{message}</Message>}
    </UploadContainer>
  );
}
