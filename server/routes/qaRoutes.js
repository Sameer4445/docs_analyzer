const express = require("express");
const router = express.Router();
const { askQuestion } = require("../controllers/qaController");
const Document = require("../models/Document");

router.delete("/reset", async (req, res) => {
  try {
    await Document.deleteMany({});
    res.json({ message: "All documents deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/ask", askQuestion);

module.exports = router;
