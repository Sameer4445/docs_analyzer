import { useState } from "react";
import axios from "axios";

function Upload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setStatus("Uploading...");
      await axios.post("http://localhost:8000/api/upload", formData);
      setStatus("Upload successful ✅");
    } catch (err) {
      setStatus("Upload failed ❌");
      console.error(err);
    }
  };
  
  return (
    <>
      <div className="section-title">Upload Document</div>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>Upload</button>

      <div className="status-text">{status}</div>
    </>
  );

}

export default Upload;
