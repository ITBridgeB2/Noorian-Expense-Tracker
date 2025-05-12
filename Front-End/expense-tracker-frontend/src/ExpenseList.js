import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './App.css';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/expenses").then((res) => {
      setExpenses(res.data);
    });
  }, []);

  const total = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);

  return (
    <div className="container">
      <h1>EXPENSE TRACKER</h1>
      <h2><Link to="/add" style={{ textDecoration: "underline", color: "#3498db" }}>Add New Expense</Link></h2>
      <h3>&nbsp;Total Spent: ${total.toFixed(2)}</h3>
      <ul>
        {expenses.map((e) => (
          <li key={e.id}>
            ${e.amount} - {e.category} - {e.date}
            <Link to={`/detail/${e.id}`}>Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
