import React, { useState, useEffect } from 'react';

const AddExpenseForm = ({ addExpense, currentExpense, handleEdit }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  

  useEffect(() => {
    if (currentExpense) {
      setName(currentExpense.name);
      setAmount(currentExpense.amount);
      
    }
  }, [currentExpense]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const expense = {
      name,
      amount: parseFloat(amount),
    
    };

    try {
      if (currentExpense) {
        await handleEdit({ ...currentExpense, ...expense });
      } else {
        await addExpense(expense);
      }
    } catch (error) {
      console.error("Error submitting expense:", error);
    }

    // Reset form fields
    setName('');
    setAmount('');
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      
      <button type="submit">{currentExpense ? 'Update' : 'Add'} Expense</button>
    </form>
  );
};

export default AddExpenseForm;
