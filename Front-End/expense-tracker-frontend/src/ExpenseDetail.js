import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import './App.css';

const ExpenseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/expenses/${id}`)
      .then((res) => setExpense(res.data));
  }, [id]);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/expenses/${id}`)
      .then(() => navigate("/"));
  };

  if (!expense) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <h1>EXPENSE DETAILS</h1>
      <h3>Amount: ${expense.amount}</h3>
      <p>Category: {expense.category}</p>
      <p>Date: {expense.date}</p>
      <p>Added: {new Date(expense.created_at).toLocaleString()}</p>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => navigate(`/edit/${id}`)}>Edit Expense</button>
        <button onClick={handleDelete} style={{ marginLeft: "10px" }}>
          Delete Expense
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Link to="/" style={{ textDecoration: "underline", color: "#3498db" }}>
          ← Back to Expenses
        </Link>
      </div>
    </div>
  );
};

export default ExpenseDetail;
