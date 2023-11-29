import express from "express";
import {
  allPlanes,
  deletePlane,
  change,
  savePlane,
  setup,
} from "./utils/fileStorage.js";

const PORT = 8080;
const app = express();

setup();
app.use(express.json());

app.get("/api/planes", (req, res) => {
  allPlanes().then((planes) => res.json(planes));
});
app.post("/api/planes", (req, res) => {
  //- neues Flugzeug speichern
  const plane = req.body;
  savePlane(plane);
  res.end();
});

// app.delete("/api/planes", (req, res) => {
//   //- das letzte Flugzeug löschen
//   const plane = req.body;
//   deleteLastPlane(plane);
//   res.end();
// });

app.delete("/api/planes", (req, res) => {
  //- das letzte Flugzeug löschen
  const idFromPlane = req.body;
  deletePlane(idFromPlane.id, res);
  res.end();
});

app.put("/api/planes", (req, res) => {
  const idChange = req.body;
  change(idChange.id, idChange);
  res.end();
});

app.listen(PORT, () => console.log("Läuft", PORT));
