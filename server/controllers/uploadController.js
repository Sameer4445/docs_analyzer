const fs = require("fs");
const pdfParse = require("pdf-parse");
const chunkText = require("../utils/chunker");
const getEmbedding = require("../services/embeddingService");
const Document = require("../models/Document");
const { v4: uuidv4 } = require("uuid");

exports.uploadDocument = async (req, res) => {
  try {
    const documentId = uuidv4();

    const buffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(buffer);
    const chunks = chunkText(pdfData.text);

    const documents = await Promise.all(
      chunks.map(async (chunk) => {
        const embedding = await getEmbedding(chunk);
        return {
          documentId,
          text: chunk,
          embedding
        };
      })
    );

    await Document.insertMany(documents);

    res.json({
      message: "Document processed successfully",
      documentId
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
