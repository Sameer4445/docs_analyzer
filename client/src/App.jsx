import Upload from "./components/upload.jsx";
import Chat from "./components/chat.jsx";


function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Context-Aware Document QA</h1>
      <Upload />
      <hr />
      <Chat />
    </div>
  );
}

export default App;
