const express = require('express')
const app = express()

app.get("/", (req, res) => {
    res.send("hi webhooker")
})

app.post("/notion-webhook", express.json(), async (req, res) => {
    const data = req.body || {};
    console.log("==========req.body=============")
    console.log(req.body)
    console.log("==========req.body=============")
    let s = data && data.data && data.data.properties && data.data.properties["What's the issue?"]
    console.log("================s==================")
    console.log(s)
    console.log("================s==================")
    const issue = data.data.properties["What’s the issue?"] || data.content || "New bug submitted";
    console.log("=========issue=========")
    console.log(issue)
    console.log("=========issue=========")

    const r = await fetch("https://discord.com/api/webhooks/1437892798308159538/80EmXtMP42U9z6OvnC0DpOLYVw7AkvQU12gjqgtcZ7peO9Q7yx6FExFfB4BeHvdYTqS7", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: String(issue).slice(0, 1900) })
    });
    console.log("===========r==========")
    console.log(r)
    console.log("===========r==========")
    console.log("=======r.json=======")
    console.log(await r.json())
    console.log("=======r.json=======")
    res.status(r.ok ? 200 : 502).send(await r.text());
});

app.listen('8080', () => console.log("listening at port 8080"))