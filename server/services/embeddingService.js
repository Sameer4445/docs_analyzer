const axios = require("axios");

const HF_API_KEY = process.env.HF_API_KEY;
const MODEL = "BAAI/bge-small-en-v1.5";

async function getEmbedding(text) {
  const response = await axios.post(
    `https://router.huggingface.co/hf-inference/models/${MODEL}`,
    {
      inputs: text
    },
    {
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  if (response.data.error) {
    throw new Error(response.data.error);
  }

  let embedding = response.data;

  // Handle nested array
  if (Array.isArray(embedding[0])) {
    embedding = embedding[0];
  }

  // Ensure it's array
  if (!Array.isArray(embedding)) {
    throw new Error("Embedding is not an array");
  }

  return embedding;
}

module.exports = getEmbedding;