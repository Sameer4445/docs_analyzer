const axios = require("axios");

async function generateAnswer(context, question) {
  const response = await axios.post(
    "http://localhost:11434/api/generate",
    {
      model: "llama3:latest",
      prompt: `
Answer ONLY using the context below.
If answer not found, say "Not in document."

Context:
${context}

Question:
${question}
`,
      stream: false
    }
  );

  return response.data.response;
}

module.exports = generateAnswer;
