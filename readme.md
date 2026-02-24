# 📄 Context-Aware Document QA System

A full-stack **Retrieval-Augmented Generation (RAG)** application that lets users upload PDF documents, embed their content semantically, and ask contextual questions — receiving grounded answers strictly based on the document.

---

## 🚀 Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Backend** | Node.js, Express.js, MongoDB Atlas, Mongoose |
| **PDF Parsing** | pdfjs-dist |
| **Embeddings** | HuggingFace Router API |
| **LLM Inference** | Groq API |
| **Frontend** | React (Vite), Axios |

---

## 🏗️ Project Structure

```
qa/
├── client/                     # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Upload.jsx
│   │   │   └── Chat.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── server/                     # Express Backend
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── uploadController.js
    │   └── qaController.js
    ├── models/
    │   └── Document.js
    ├── routes/
    │   ├── uploadRoutes.js
    │   └── qaRoutes.js
    ├── services/
    │   ├── embeddingService.js
    │   └── llmService.js
    ├── utils/
    │   ├── chunker.js
    │   └── similarity.js
    ├── uploads/
    ├── .env
    ├── index.js
    └── package.json
```

---

## ⚙️ How It Works (RAG Flow)

### 1️⃣ Upload Phase
1. User uploads a PDF document.
2. PDF is parsed using `pdfjs-dist`.
3. Text is split into semantic chunks.
4. Each chunk is converted to a vector embedding via the HuggingFace API.
5. Embeddings are stored in MongoDB Atlas with a unique `documentId`.

### 2️⃣ Question Phase
1. User submits a question.
2. Question is converted into an embedding.
3. System retrieves chunks filtered by `documentId`.
4. Cosine similarity is applied to rank chunks.
5. Top-K relevant chunks are selected as context.
6. Context is passed to the Groq LLM for grounded answer generation.

---

## 🔐 Environment Variables

Create a `.env` file inside `server/`:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
HF_API_KEY=your_huggingface_token
GROQ_API_KEY=your_groq_api_key
```

---

## 🛠️ Installation & Setup

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:8000 |

---

## 📡 API Reference

### Upload Document

```http
POST /api/upload
Content-Type: multipart/form-data
```

**Body:** `file` — PDF file

**Response:**
```json
{
  "message": "...",
  "documentId": "..."
}
```

---

### Ask a Question

```http
POST /api/ask
Content-Type: application/json
```

**Body:**
```json
{
  "question": "...",
  "documentId": "..."
}
```

---

## 🧠 Core Concepts

- **Retrieval-Augmented Generation (RAG)** — grounds LLM answers in document content
- **Vector Embeddings** — semantic representation of text chunks
- **Cosine Similarity Search** — ranks chunks by relevance to the query
- **documentId Filtering** — prevents cross-document context contamination
- **Chunk-Based Semantic Search** — improves accuracy and avoids token overflow
- **API-Based Inference** — no local LLM dependency required

---

## 🎯 Key Engineering Decisions

**Why `documentId`?**
Prevents cross-document contamination so each query only retrieves chunks from the correct document.

**Why chunking?**
Reduces embedding size, improves semantic precision, and avoids LLM token overflow.

**Why HuggingFace Router?**
Production-ready, cloud-hosted API with no local server dependency — deployment friendly.

**Why Groq for LLM?**
Ultra-low latency, fast cloud inference, and free-tier availability for development.

---

## ⚡ Performance Considerations

- Uses **Top-K retrieval** instead of full-context injection
- Filters by `documentId` to **avoid full DB scans**
- **Batch insertion** for embeddings
- **Async embedding generation** throughout the pipeline

---

## 📌 Known Limitations

- No MongoDB vector index (M0 free tier limitation — uses linear scan)
- Large PDFs may increase embedding generation time
- Subject to free-tier API rate limits (HuggingFace, Groq)

---

## 🔮 Future Improvements

- [ ] MongoDB Atlas Vector Search (M10+ cluster)
- [ ] Redis caching layer
- [ ] Background embedding queue (e.g., Bull/BullMQ)
- [ ] Streaming LLM responses
- [ ] Multi-document support
- [ ] User authentication
- [ ] Docker deployment

---

## 🧪 Testing Checklist

- [ ] Upload a small PDF and verify successful parsing
- [ ] Confirm chunks are stored in MongoDB with correct `documentId`
- [ ] Validate `documentId` isolation between documents
- [ ] Test empty question validation
- [ ] Test invalid `documentId` handling
- [ ] Test large PDF behavior
- [ ] Test API error handling and fallback responses

---

## 🚀 Deployment

| Component | Recommended Platforms |
|-----------|----------------------|
| Backend | Render, Railway, Fly.io |
| Frontend | Vercel, Netlify |
| Database | MongoDB Atlas |

---

## 👨‍💻 Author

**Sameer Pathan**  
B.Tech CSE (Data Science)
