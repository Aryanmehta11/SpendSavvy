import { render, screen, fireEvent } from '@testing-library/react';
import ExpenseList from './Expenselist'; // Adjust the import path as necessary

test('calls editExpense when Edit button is clicked', () => {
  const editExpenseMock = jest.fn();
  const deleteExpenseMock = jest.fn();
  const expenses = [{ _id: 1, name: 'Test Expense', amount: 100 }];

  render(
    <ExpenseList
      expenses={expenses}
      editExpense={editExpenseMock}
      deleteExpense={deleteExpenseMock}
    />
  );

  fireEvent.click(screen.getAllByText(/Edit/i)[0]);
  expect(editExpenseMock).toHaveBeenCalledWith(1); // Adjust the expected value as per the ID in your test
});

test('calls deleteExpense when Delete button is clicked', () => {
  const editExpenseMock = jest.fn();
  const deleteExpenseMock = jest.fn();
  const expenses = [{ _id: 1, name: 'Test Expense', amount: 100 }];

  render(
    <ExpenseList
      expenses={expenses}
      editExpense={editExpenseMock}
      deleteExpense={deleteExpenseMock}
    />
  );

  fireEvent.click(screen.getAllByText(/Delete/i)[0]);
  expect(deleteExpenseMock).toHaveBeenCalledWith(1); // Adjust the expected value as per the ID in your test
});
