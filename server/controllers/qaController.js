const Document = require("../models/Document");
const getEmbedding = require("../services/embeddingService");
const cosineSimilarity = require("../utils/similarity");
const generateAnswer = require("../services/llmService");

const TOP_K = 3;

exports.askQuestion = async (req, res) => {
  try {
    const question = req.body?.question;

    if (!question || question.trim() === "") {
      return res.status(400).json({ error: "Question is required" });
    }

    console.log("Question received:", question);

    // 1️⃣ Generate question embedding
    const questionEmbedding = await getEmbedding(question);

    // 2️⃣ Fetch only required fields
    const docs = await Document.find({}, { text: 1, embedding: 1 });

    if (!docs.length) {
      return res.status(404).json({
        error: "No documents found in database",
      });
    }

    console.log("Total chunks in DB:", docs.length);

    // 3️⃣ Compute similarity
    const scoredDocs = docs.map((doc) => ({
      text: doc.text,
      score: cosineSimilarity(questionEmbedding, doc.embedding),
    }));

    // 4️⃣ Sort and pick top K
    const topResults = scoredDocs
      .sort((a, b) => b.score - a.score)
      .slice(0, TOP_K);

    const context = topResults.map((item) => item.text).join("\n");

    // 5️⃣ Generate grounded answer
    const answer = await generateAnswer(context, question);

    res.json({
      answer,
      sources: topResults.map((item) => ({
        score: item.score,
      })),
    });
  } catch (error) {
    console.error("QA Error:", error);
    res.status(500).json({ error: error.message });
  }
};
