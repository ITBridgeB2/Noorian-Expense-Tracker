import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import './App.css'

const EditExpense = () => {
  const { id } = useParams();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/expenses/${id}`).then((res) => {
      const { amount, category, date } = res.data;
      setAmount(amount);
      setCategory(category);
      setDate(date.slice(0, 10)); // format date for input
    });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/expenses/${id}`, {
        amount,
        category,
        date,
      })
      .then(() => navigate("/"));
  };

  return (
    <div className="container">
      <h1>EDIT EXPENSE</h1>
      <form onSubmit={handleUpdate}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Update Expense</button>
      </form>

      <div style={{ marginTop: "20px" }}>
        <Link to="/" style={{ textDecoration: "underline", color: "#3498db" }}>
          ← Back to Expenses
        </Link>
      </div>
    </div>
  );
};

export default EditExpense;
