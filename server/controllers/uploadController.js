const fs = require("fs");
const pdfParse = require("pdf-parse");
const chunkText = require("../utils/chunker");
const getEmbedding = require("../services/embeddingService");
const Document = require("../models/Document");


exports.uploadDocument = async (req, res) => {
    console.log("FILE RECEIVED:", req.file);

  try {
    const buffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(buffer);

    const chunks = chunkText(pdfData.text);

    for (let chunk of chunks) {
      const embedding = await getEmbedding(chunk);

      await Document.create({
        text: chunk,
        embedding
      });
    }

    res.json({ message: "Document processed successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
