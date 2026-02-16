import { useState } from "react";
import Upload from "./components/Upload";
import Chat from "./components/Chat";
import "./App.css";

function App() {
  const [documentId, setDocumentId] = useState(null);

  return (
    <div className="app-wrapper">
      <div className="app-header">
        Context-Aware Document QA
      </div>

      <div className="app-subtitle">
        Intelligent retrieval grounded on your uploaded content
      </div>

      <div className="panel">
        <Upload setDocumentId={setDocumentId} />
      </div>

      <div className="panel">
        <Chat documentId={documentId} />
      </div>
    </div>
  );
}

export default App;
