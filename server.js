const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAIApi(
    new Configuration({
        apiKey: process.env.OPENAI_API_KEY
    })
);

app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    try {
        const aiResponse = await openai.createCompletion({
            model: "gpt-4",
            prompt: userMessage,
            max_tokens: 50
        });

        res.json({ response: aiResponse.data.choices[0].text.trim() });
    } catch (error) {
        console.error("Error with OpenAI API:", error);
        res.status(500).json({ response: "Sorry dude, something went wrong. Try again!" });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
