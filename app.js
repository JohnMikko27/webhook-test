const express = require('express')
const app = express()
require('dotenv').config();


app.get("/", (req, res) => {
    res.send("hi webhooker")
})

app.post("/notion-webhook", express.json(), async (req, res) => {
    const data = req.body || {};
    const r = await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: `NEW ISSUE SUBMITTED\n` +
                `Bug: ${String(data.data.properties["What’s the issue?"].title[0].plain_text).slice(0, 1900)}\n` +
                `Link: ${data.data.url}
        ` })
    });
    res.status(r.ok ? 200 : 502).send(await r.text());
});

app.listen('8080', () => console.log("listening at port 8080"))