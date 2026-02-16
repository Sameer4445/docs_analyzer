import Upload from "./components/Upload";
import Chat from "./components/Chat";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">Context-Aware Document QA</h1>

      <div className="card">
        <Upload />
      </div>

      <div className="card">
        <Chat />
      </div>
    </div>
  );
}

export default App;
