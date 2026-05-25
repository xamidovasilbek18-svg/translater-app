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
