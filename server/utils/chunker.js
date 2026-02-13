function chunkText(text, chunkSize = 200) {
  const words = text.split(" ");
  let chunks = [];

  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize).join(" "));
  }

  return chunks;
}

module.exports = chunkText;
