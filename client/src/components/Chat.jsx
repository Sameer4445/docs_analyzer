import { useState } from "react";
import axios from "axios";

function Chat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question) return;

    try {
      setLoading(true);
      setAnswer("");

      const res = await axios.post(
        "http://localhost:8000/api/ask",
        { question }
      );

      setAnswer(res.data.answer);
    } catch (err) {
      setAnswer("Error getting answer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Ask Question</h2>

      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask something..."
      />

      <button onClick={askQuestion} disabled={loading}>
        {loading ? "Thinking..." : "Ask"}
      </button>

      <div>
        <h3>Answer:</h3>
        {loading ? <p>Generating answer...</p> : <p>{answer}</p>}
      </div>
    </div>
  );
}

export default Chat;
