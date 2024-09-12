export function request(ctx) {
  const { ingredients = [] } = ctx.args;

  // Construct the prompt with the provided ingredients
  // const prompt = `Suggest a recipe idea using these ingredients: ${ingredients.join(", ")}.`;
  const prompt = `You are reading buddy to help people understand books. I will give you some text from a story or a book, and you will need to extract the key points and themes from each section. For the following text, return the main points and themes from the text: ${ctx}.`;

  // Return the request configuration
  return {
    resourcePath: `/model/anthropic.claude-3-sonnet-20240229-v1:0/invoke`,
    method: "POST",
    params: {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `\n\nHuman: ${prompt}\n\nAssistant:`,
              },
            ],
          },
        ],
      }),
    },
  };
}

export function response(ctx) {
  // Parse the response body
  const parsedBody = JSON.parse(ctx.result.body);
  // Extract the text content from the response
  const res = {
    body: parsedBody.content[0].text,
  };
  // Return the response
  return res;
}