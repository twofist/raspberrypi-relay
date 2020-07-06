import express from "express";
import { exec } from "child_process";
import path from 'path';
const __dirname = path.resolve();

const app = express();
const PORT = 3000;

app.get("/", async (req, res) => {
    await res.redirect("/home")
});

app.post("/on", async (req, res) => {
    const seconds = parseInt(req.query.seconds) || 1;
    console.log(seconds)
    await exec('sudo python gpio/on.py');
    setTimeout(async () => {
        await exec('sudo python gpio/off.py');
    }, seconds * 1000);
})

app.post("/off", async (req, res) => {
    await exec('sudo python gpio/off.py');
})

app.get("/home", async (req, res) => {
    await res.sendFile(__dirname + "/public/home.html");
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));