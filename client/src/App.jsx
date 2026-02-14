import Upload from "./src/components/Upload";
import Chat from "./src/components/Chat";

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
