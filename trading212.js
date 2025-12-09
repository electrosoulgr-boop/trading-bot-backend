import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const ENV = process.env.T212_ENV || "demo";

const BASE_URL =
  ENV === "live"
    ? "https://live.trading212.com/api/v0"
    : "https://demo.trading212.com/api/v0";

async function t212Get(path) {
  const res = await fetch(BASE_URL + path, {
    headers: { "Authorization": API_KEY }
  });
  if (!res.ok) throw new Error(`GET ${path} failed`);
  return res.json();
}

async function t212Post(path, body = {}) {
  const res = await fetch(BASE_URL + path, {
    method: "POST",
    headers: { "Authorization": API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`POST ${path} failed`);
  return res.json();
}

export { t212Get, t212Post };
