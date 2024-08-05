import React from 'react';

const ExpenseList = ({ expenses, editExpense, deleteExpense }) => {
  return (
    <div>
      <h3>Expense List</h3>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            {expense.name} - {expense.amount} {'Rs'}
            <button onClick={() => editExpense(expense._id)}>Edit</button>
            <button onClick={() => deleteExpense(expense._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
