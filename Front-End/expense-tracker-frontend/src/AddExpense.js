import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './App.css';

const AddExpense = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/expenses", {
        amount,
        category,
        date,
      })
      .then(() => navigate("/"));
  };

  return (
    <div className="container">
      <h1>ADD NEW EXPENSE</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="input-small"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="input-small"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="input-small"
        />
        <button type="submit">Add Expense</button>
      </form>

      <div style={{ marginTop: "20px" }}>
        <Link to="/" style={{ textDecoration: "underline", color: "#3498db" }}>
          ← Back to Expenses
        </Link>
      </div>
    </div>
  );
};

export default AddExpense;
