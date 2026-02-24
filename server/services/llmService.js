const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function generateAnswer(context, question) {
  const prompt = `
You are a helpful assistant.
Answer ONLY from the provided context.
If answer is not found in context, say "Not found in document."

Context:
${context}

Question:
${question}
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant", 
    messages: [
      { role: "user", content: prompt }
    ],
    temperature: 0.2
  });

  return completion.choices[0].message.content;
}

module.exports = generateAnswer;