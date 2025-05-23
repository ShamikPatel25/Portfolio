const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch"); // If using Node 18+, use native fetch instead
const app = express();
const PORT = 3000;

const BOT_TOKEN = "7733752822:AAHcjAmyqzGg9jYUD8RhlNRwkQkMjzgQ0Nc";
const CHAT_ID = "5387803337";

app.use(bodyParser.json());

app.post("/send-message", async (req, res) => {
    const { name, email, message } = req.body;

    const telegramMessage = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: telegramMessage,
            }),
        });

        const data = await response.json();
        if (data.ok) {
            res.status(200).send({ success: true });
        } else {
            res.status(500).send({ success: false, error: data });
        }
    } catch (error) {
        console.error("Error sending Telegram message:", error);
        res.status(500).send({ success: false, error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
