import express from "express";
import { exec } from "child_process";
import path from 'path';

const app = express();
const PORT = 3000;

app.get("/", async (req, res) => {
    await res.redirect("/home")
});

app.post("/on", async (req, res) => {
    const seconds = (parseInt(req.query.seconds) || 0) * 1000;
    await exec(`sudo python ${path.resolve("/home/pi/projects/relay/gpio/on.py")}`);
    if (seconds) {
        setTimeout(async () => {
            await exec(`sudo python ${path.resolve("/home/pi/projects/relay/gpio/off.py")}`);
        }, seconds);
    }
    res.sendStatus(200);
})

app.post("/off", async (req, res) => {
    await exec(`sudo python ${path.resolve("/home/pi/projects/relay/gpio/off.py")}`);
    res.sendStatus(200);
})

app.get("/home", async (req, res) => {
    await res.sendFile(path.resolve("/home/pi/projects/relay/public/home.html"));
});

app.get("/*", async (req, res) => {
    await res.redirect("/home")
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));