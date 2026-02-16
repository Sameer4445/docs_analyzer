const fs = require("fs");
const pdfParse = require("pdf-parse");
const chunkText = require("../utils/chunker");
const getEmbedding = require("../services/embeddingService");
const Document = require("../models/Document");

exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("Processing file:", req.file.originalname);

    // 1️⃣ Read PDF
    const buffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(buffer);

    // 2️⃣ Chunk text
    const chunks = chunkText(pdfData.text).filter(
      (chunk) => chunk.trim().length > 0
    );

    if (!chunks.length) {
      return res.status(400).json({ error: "No valid text found in document" });
    }

    console.log("Total chunks:", chunks.length);

    // 3️⃣ Generate embeddings in parallel
    const documents = await Promise.all(
      chunks.map(async (chunk) => {
        const embedding = await getEmbedding(chunk);
        return {
          text: chunk,
          embedding,
        };
      })
    );

    // 4️⃣ Insert all at once
    await Document.insertMany(documents);

    res.json({
      message: "Document processed successfully",
      totalChunks: documents.length,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: error.message });
  }
};
