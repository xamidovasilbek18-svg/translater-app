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
