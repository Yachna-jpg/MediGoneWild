import express from "express";
import pg from "pg";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const NUMERIC_OID = 1700;
pg.types.setTypeParser(NUMERIC_OID, (value) => {
  return value === null ? null : parseFloat(value);
});

const app = express();

// Middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("trust proxy", 1);

// Main Page Route
app.get("/", async (req, res) => {
  res.render("index");
});

// Other Routes

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/services", (req, res) => {
  res.render("services");
});

app.get("/doctors", (req, res) => {
  res.render("doctors");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

// === Server Start ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
