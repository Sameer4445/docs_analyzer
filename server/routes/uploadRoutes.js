const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const { uploadDocument } = require("../controllers/uploadController");

router.post("/upload", upload.single("file"), uploadDocument);

module.exports = router;
