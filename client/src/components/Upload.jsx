import { useState } from "react";
import axios from "axios";

function Upload({ setDocumentId }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setStatus("Uploading...");

      const API = import.meta.env.VITE_API_URL;

      const res = await axios.post(
        `${API}/api/upload`,
        formData
      );

      // Save documentId returned from backend
      setDocumentId(res.data.documentId);

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

      <button onClick={handleUpload}>
        Upload
      </button>

      <div className="status-text">
        {status}
      </div>
    </>
  );
}

export default Upload;