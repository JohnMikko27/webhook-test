const express = require('express')
const app = express()

app.get("/", (req, res) => {
    res.send("hi webhooker")
})

app.post("/notion-webhook", express.json(), async (req, res) => {
    const data = req.body || {};
    const r = await fetch("https://discord.com/api/webhooks/1437892798308159538/80EmXtMP42U9z6OvnC0DpOLYVw7AkvQU12gjqgtcZ7peO9Q7yx6FExFfB4BeHvdYTqS7", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: `NEW ISSUE SUBMITTED\n` +
                `Bug: ${String(data.data.properties["What’s the issue?"].title[0].plain_text).slice(0, 1900)}\n` +
                `Submitted at: ${data.data.properties['Submission time'].created_time}\n` +
                `Link: ${data.data.url}
        ` })
    });
    res.status(r.ok ? 200 : 502).send(await r.text());
});

app.listen('8080', () => console.log("listening at port 8080"))