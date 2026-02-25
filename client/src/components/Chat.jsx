import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

function Chat({ documentId }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question || !documentId) {
      setAnswer("Upload a document first.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API}/api/ask`, {
        question,
        documentId
      });

      setAnswer(res.data.answer);
    } catch (err) {
      setAnswer("Error getting answer");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="section-title">Ask Question</div>

      <div>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) {
              askQuestion();
            }
          }}
          placeholder="Ask something about your document..."
        />

        <button onClick={askQuestion} disabled={loading}>
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>

      {loading && (
        <div className="answer-container">
          Generating response...
        </div>
      )}

      {!loading && answer && (
        <div className="answer-container">
          {answer}
        </div>
      )}
    </>
  );
}

export default Chat;