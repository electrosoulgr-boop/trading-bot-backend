import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { startBot, stopBot } from "./botEngine.js";
import { t212Get, t212Post } from "./trading212.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Trading Bot Backend Operational");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", running: true, timestamp: new Date().toISOString() });
});

app.post("/start-bot", (req, res) => { startBot(); res.json({ status: "started" }); });
app.post("/stop-bot", (req, res) => { stopBot(); res.json({ status: "stopped" }); });

app.get("/portfolio", async (req, res) => {
  try { res.json(await t212Get("/portfolio")); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.get("/orders", async (req, res) => {
  try { res.json(await t212Get("/orders")); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.post("/order", async (req, res) => {
  try { res.json(await t212Post("/orders/market", req.body)); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
