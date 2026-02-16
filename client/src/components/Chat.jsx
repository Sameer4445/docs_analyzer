import { useState } from "react";
import axios from "axios";

function Chat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) return;

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
          placeholder="Ask something..."
        />

        <button onClick={askQuestion} disabled={loading}>
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>

      {loading && (
        <div className="answer-box">Generating answer...</div>
      )}

      {!loading && answer && (
        <div className="answer-box">{answer}</div>
      )}
    </>
  );
}

export default Chat;
