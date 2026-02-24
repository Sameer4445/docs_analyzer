const axios = require("axios");

const HF_API_KEY = process.env.HF_API_KEY;

// Good embedding model
const MODEL = "sentence-transformers/all-MiniLM-L6-v2";

async function getEmbedding(text) {
  const response = await axios.post(
    `https://api-inference.huggingface.co/models/${MODEL}`,
    { inputs: text },
    {
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data[0]; 
}

module.exports = getEmbedding;