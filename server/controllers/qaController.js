const Document = require("../models/Document");
const getEmbedding = require("../services/embeddingService");
const cosineSimilarity = require("../utils/similarity");
const generateAnswer = require("../services/llmService");

const TOP_K = 3;


exports.askQuestion = async (req, res) => {
  try {

    const question = req.body?.question;

    if (!question) {
    return res.status(400).json({ error: "Question is required" });
    }

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    // 1️⃣ Generate embedding for question
    const questionEmbedding = await getEmbedding(question);

    // 2️⃣ Fetch all stored chunks
    const docs = await Document.find();
    console.log("Total chunks:", docs.length);


    if (!docs.length) {
      return res.status(404).json({ error: "No documents found in database" });
    }

    // 3️⃣ Compute similarity scores
    const scoredDocs = docs.map(doc => ({
      text: doc.text,
      score: cosineSimilarity(questionEmbedding, doc.embedding)
    }));

    // 4️⃣ Sort and pick top K
    const topResults = scoredDocs
      .sort((a, b) => b.score - a.score)
      .slice(0, TOP_K);

    const context = topResults
      .map(item => item.text)
      .join("\n");

    // 5️⃣ Generate grounded answer
    const answer = await generateAnswer(context, question);

    // 6️⃣ Return answer + sources
    res.json({
      answer,
      sources: topResults.map(item => ({
        score: item.score
      }))
    });


  } catch (error) {
    console.error("QA Error:", error);
    res.status(500).json({ error: error.message });
  }
};
