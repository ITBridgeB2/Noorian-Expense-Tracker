const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "noor",
  database: "userExpense",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database.");
});

// Get all expenses
app.get("/api/expenses", (req, res) => {
  db.query("SELECT * FROM expenses ORDER BY date DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Get one expense
app.get("/api/expenses/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM expenses WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ error: "Not found" });
    res.json(results[0]);
  });
});

// Create new expense
app.post("/api/expenses", (req, res) => {
  const { amount, category, date } = req.body;
  const sql = "INSERT INTO expenses (amount, category, date) VALUES (?, ?, ?)";
  db.query(sql, [amount, category, date], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, amount, category, date });
  });
});

// Update expense
app.put("/api/expenses/:id", (req, res) => {
  const { amount, category, date } = req.body;
  const { id } = req.params;
  const sql = "UPDATE expenses SET amount=?, category=?, date=? WHERE id=?";
  db.query(sql, [amount, category, date, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id, amount, category, date });
  });
});

// Delete expense
app.delete("/api/expenses/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM expenses WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Deleted successfully" });
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
