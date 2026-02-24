const fs = require("fs");
const chunkText = require("../utils/chunker");
const getEmbedding = require("../services/embeddingService");
const Document = require("../models/Document");
const { v4: uuidv4 } = require("uuid");

exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Unique ID per uploaded document
    const documentId = uuidv4();

    // Read file and convert to Uint8Array (required by pdfjs)
    const buffer = fs.readFileSync(req.file.path);
    const uint8Array = new Uint8Array(buffer);

    // Dynamic import for ESM module (Node 22+/24 compatible)
    const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");

    const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
    const pdf = await loadingTask.promise;

    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map(item => item.str);
      text += strings.join(" ") + "\n";
    }

    const chunks = chunkText(text);
    console.log("Total chunks:", chunks.length);

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
    console.error("UPLOAD ERROR:");
    console.error(error.response?.data || error.message || error);

    res.status(500).json({
      error: error.message || "Upload failed"
    });
  }
};