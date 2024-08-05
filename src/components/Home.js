import React, { useState, useEffect } from 'react';
import Expenselist from './Expenselist'; // Ensure the file name matches
import AddExpenseForm from './AddExpenseForm';

// Use environment variable for API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [currentExpense, setCurrentExpense] = useState(null);

  // Fetch expenses from backend
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(`${API_URL}/api/expenses`);
        if (!response.ok) {
          throw new Error('Failed to fetch expenses');
        }
        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExpenses();
  }, []);

  // Handle editing expense
  const handleEdit = async (expense) => {
    try {
      const response = await fetch(`${API_URL}/api/expenses/${expense._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expense),
      });
      if (!response.ok) {
        throw new Error('Failed to update the expense');
      }
      const updatedExpense = await response.json();
      setExpenses((prevExpenses) =>
        prevExpenses.map((exp) => (exp._id === updatedExpense._id ? updatedExpense : exp))
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Add new expense
  const addExpense = async (expense) => {
    try {
      const response = await fetch(`${API_URL}/api/expenses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expense),
      });
      if (!response.ok) {
        throw new Error('Failed to add the expense');
      }
      const newExpense = await response.json();
      setExpenses([...expenses, newExpense]);
    } catch (error) {
      console.error(error);
    }
  };

  // Set current expense for editing
  const editExpense = (index) => {
    setCurrentExpense(expenses[index]);
  };

  // Delete expense
  const deleteExpense = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/expenses/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete the expense');
      }
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Home</h2>
      <AddExpenseForm addExpense={addExpense} currentExpense={currentExpense} handleEdit={handleEdit} />
      <Expenselist
        expenses={expenses}
        editExpense={editExpense}
        deleteExpense={deleteExpense}
      />
    </div>
  );
};

export default Home;
