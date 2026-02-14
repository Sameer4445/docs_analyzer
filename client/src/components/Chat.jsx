import { useState } from "react";
import axios from "axios";

function Chat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askQuestion = async () => {
    if (!question) return;

    try {
      const res = await axios.post(
        "http://localhost:8000/api/ask",
        { question }
      );

      setAnswer(res.data.answer);
    } catch (err) {
      console.error(err);
      setAnswer("Error getting answer");
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

      <button onClick={askQuestion}>Ask</button>

      <div>
        <h3>Answer:</h3>
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default Chat;
