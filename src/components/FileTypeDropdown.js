import { useState } from "react";

const FileTypeDropdown = ({ onChange }) => {
  const [selectedFileType, setSelectedFileType] = useState("");

  const handleFileTypeSelection = (event) => {
    const { value } = event.target;
    setSelectedFileType(value);
    onChange(value); // Call the parent component's onChange function with the selected value
  };

  // In HTML, use <select> to create a dropdown
  return (
    <select value={selectedFileType} onChange={handleFileTypeSelection}>
      <option value="">Select File Type: </option>
      <option value="image/jpeg">Image</option>
      <option value="application/pdf">PDF</option>
      <option value="text/csv">CSV</option>
      <option value="text/html">Markup</option>
      <option value="other">Other</option>
    </select>
  );
};

export default FileTypeDropdown;
