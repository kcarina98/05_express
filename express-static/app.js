import express from "express";

const PORT = 9999;
const app = express();

app.use(express.static("person"));

app.listen(PORT, () => console.log("läuft", PORT));
