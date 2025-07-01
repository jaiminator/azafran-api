const OpenAI = require("openai");
const { OPENAI_API_KEY } = require("../config")

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const sendMessage = async (ingredientList) => {
    if (!ingredientList) {
        console.log('Called sendMessage without message');
        return;
    }
    const completion = openai.chat.completions.create({
        model: "gpt-4o-mini",
        store: true,
        messages: [
            {
                role: "system",
                content: `You are a recipe generator. You will receive a list of ingredients and you will return between 1 and 3 possible recipes using only those ingredients. The expected format of the response is:

                [
                    {
                        "title": "string",
                        "description": "string",
                        "ingredients": "string"
                    }
                ]

                Return only the JSON to be parsed directly. Do not include any other text.`,
                    },
                    {
                        role: "user",
                        content: `This is the ingredient list to generate recipes: ${ingredientList}`,
                    },
        ],
    });
    const result = await completion;
    return JSON.parse(result.choices[0].message.content);
};

module.exports = { sendMessage };