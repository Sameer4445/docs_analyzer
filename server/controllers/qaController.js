const Document = require("../models/Document");
const getEmbedding = require("../services/embeddingService");
const cosineSimilarity = require("../utils/similarity");
const generateAnswer = require("../services/llmService");

const TOP_K = 3;

exports.askQuestion = async (req, res) => {
  try {
    const { question, documentId } = req.body;

    if (!question || !documentId) {
      return res.status(400).json({
        error: "Question and documentId are required",
      });
    }

    const questionEmbedding = await getEmbedding(question);

    const docs = await Document.find(
      { documentId },
      { text: 1, embedding: 1 }
    );

    if (!docs.length) {
      return res.status(404).json({
        error: "No chunks found for this document",
      });
    }

    // 4️⃣ Similarity scoring
    const scoredDocs = docs.map((doc) => ({
      text: doc.text,
      score: cosineSimilarity(questionEmbedding, doc.embedding),
    }));

    // 5️⃣ Pick top K
    const topResults = scoredDocs
      .sort((a, b) => b.score - a.score)
      .slice(0, TOP_K);

    const context = topResults
      .map((item) => item.text)
      .join("\n");

    // 6️⃣ Generate grounded answer
    const answer = await generateAnswer(context, question);
    

    res.json({
      answer,
      sources: topResults.map((item) => ({
        score: item.score,
      })),
    });

  } catch (error) {
    console.error("QA Error:", error);
    res.status(500).json({
      
      error: error.message,
    });
  }
};
