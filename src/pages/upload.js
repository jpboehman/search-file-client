import FileUploader from "../components/FileUploader";

const UploadPage = () => {
  return (
    <div>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        File Upload
      </h1>
      <FileUploader />
    </div>
  );
};

export default UploadPage;
