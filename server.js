import { opine } from "https://deno.land/x/opine@main/mod.ts";
import { exec } from "https://deno.land/x/exec/mod.ts";


const app = opine();
const PORT = 3000;

app.get("/", async (req, res) => {
    await res.redirect("/home")
});

app.post("/on", async (req, res) => {
    const seconds = parseInt(req.query.seconds) || 1;
    console.log(seconds)
    await exec('sudo python gpio/on.py');
    setTimeout(() => {
        await exec('sudo python gpio/off.py');
    }, seconds * 1000);
    res.send(200);
})

app.post("/off", async (req, res) => {
    await exec('sudo python gpio/off.py');
    res.send(200);
})

app.get("/home", async (req, res) => {
    await res.sendFile("./public/home.html");
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));