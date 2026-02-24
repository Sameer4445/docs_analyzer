📄 Context-Aware Document QA System

A full-stack RAG (Retrieval-Augmented Generation) application that allows users to upload PDF documents and ask context-based questions. Answers are generated strictly from the uploaded document content.

🚀 Tech Stack

Backend

Node.js

Express.js

MongoDB Atlas

Mongoose

pdfjs-dist

HuggingFace (Embeddings)

Groq (LLM)

Frontend

React (Vite)

Axios

🏗️ Project Structure
qa/
├── client/            # React frontend
├── server/            # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── uploads/
└── README.md
⚙️ How It Works
1️⃣ Upload Flow

PDF is parsed using pdfjs.

Text is chunked.

Each chunk is converted into embeddings.

Stored in MongoDB with a unique documentId.

2️⃣ Question Flow

Question converted into embedding.

Relevant chunks retrieved using cosine similarity.

Top-K chunks passed to Groq LLM.

Grounded answer returned.

🔐 Environment Variables

Create .env inside server/:

PORT=8000
MONGO_URI=your_mongodb_uri
HF_API_KEY=your_huggingface_token
GROQ_API_KEY=your_groq_api_key
🛠️ Setup
Backend
cd server
npm install
npm run dev
Frontend
cd client
npm install
npm run dev

Frontend → http://localhost:5173

Backend → http://localhost:8000

📡 API Endpoints
Upload
POST /api/upload

(form-data: file)

Ask
POST /api/ask
{
  "question": "...",
  "documentId": "..."
}
🧠 Key Concepts Implemented

Retrieval-Augmented Generation (RAG)

Semantic search using embeddings

Cosine similarity

Document-scoped retrieval

Grounded answer generation

📌 Limitations

Linear vector scan (MongoDB M0)

No vector index

Free API rate limits

🔮 Future Improvements

MongoDB Vector Search

Streaming responses

Caching layer

Docker deployment