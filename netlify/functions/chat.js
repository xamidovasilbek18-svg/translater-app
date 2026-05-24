exports.handler = async (event) => {
  const { messages, system } = JSON.parse(event.body);
  
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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"
    },
    body: JSON.stringify({
      model: "openrouter/free",
      max_tokens: 1000,
      system,
      messages
    })
  });

  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
