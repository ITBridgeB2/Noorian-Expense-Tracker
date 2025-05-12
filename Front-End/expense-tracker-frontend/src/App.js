// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ExpenseList from "./components/ExpenseList";
// import AddExpense from "./components/AddExpense";
// import EditExpense from "./components/EditExpense";
// import ExpenseDetail from "./components/ExpenseDetail";

// function App() {
//   return (
//     <Router> 
//       <Routes>
//         <Route path="/" element={<ExpenseList />} />
//         <Route path="/add" element={<AddExpense />} />
//         <Route path="/edit/:id" element={<EditExpense />} />
//         <Route path="/detail/:id" element={<ExpenseDetail />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;






import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExpenseList from "./ExpenseList";
import AddExpense from "./AddExpense";
import EditExpense from "./EditExpense";
import ExpenseDetail from "./ExpenseDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ExpenseList />} />
        <Route path="/add" element={<AddExpense />} />
        <Route path="/edit/:id" element={<EditExpense />} />
        <Route path="/detail/:id" element={<ExpenseDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
