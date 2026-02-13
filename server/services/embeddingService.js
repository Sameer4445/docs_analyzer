const axios = require("axios");

async function getEmbedding(text) {
  const response = await axios.post(
    "http://localhost:11434/api/embeddings",
    {
      model: "nomic-embed-text:latest",
      prompt: text
    }
  );

  return response.data.embedding;
}

module.exports = getEmbedding;
