import { render, screen, fireEvent } from '@testing-library/react';
import AddExpenseForm from './AddExpenseForm';

test('renders form elements', () => {
  render(<AddExpenseForm addExpense={() => {}} currentExpense={null} handleEdit={() => {}} />);
  expect(screen.getByLabelText(/Name:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Amount:/i)).toBeInTheDocument();
  expect(screen.getByText(/Add Expense/i)).toBeInTheDocument();
});

test('calls addExpense on submit', () => {
  const addExpenseMock = jest.fn();
  render(<AddExpenseForm addExpense={addExpenseMock} currentExpense={null} handleEdit={() => {}} />);
  
  fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: 'Test Expense' } });
  fireEvent.change(screen.getByLabelText(/Amount:/i), { target: { value: '100' } });
  fireEvent.click(screen.getByText(/Add Expense/i));

  expect(addExpenseMock).toHaveBeenCalled();
});
