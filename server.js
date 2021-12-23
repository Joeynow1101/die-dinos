import express from "express";
import mongoose from "mongoose";
import Dino from "./models/dino.model.js";

const server = express();

const connectionString = "mongodb://localhost:27017/die-dinos";
mongoose.connect(connectionString);

server.get("/dinos", async (req, res) => {
  const dinos = await Dino.find();
  res.json(dinos);
});

server.get("/dinos/:dinoId", async (req, res) => {
  const dinoId = req.params.dinoId;

  const foundDino = await Dino.findById(dinoId);

  res.json(foundDino);
});

//Middleware zum JSON parsen (req.body ausstatten)
server.use(express.json());

server.post("/dinos", async (req, res) => {
  const dinosaur = new Dino({
    name: req.body.name,
    type: req.body.type,
    vegan: req.body.vegan,
  });

  try {
    const result = await dinosaur.save();
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

server.listen(4000, () => {
  console.log("Dino-Server is up and running");
});
