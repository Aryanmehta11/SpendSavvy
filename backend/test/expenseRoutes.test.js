const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const expenseRoutes = require('../routes/expenseRoutes');
const Expense = require('../models/Expense');

const app = express();
app.use(express.json());
app.use('/api/expenses', expenseRoutes);

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/spend-savvy-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Expense API', () => {
  let expenseId;

  it('should create a new expense', async () => {
    const res = await request(app)
      .post('/api/expenses')
      .send({ name: 'Test Expense', amount: '100' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expenseId = res.body._id;
  });

  it('should get all expenses', async () => {
    const res = await request(app).get('/api/expenses');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update an expense', async () => {
    const res = await request(app)
      .put(`/api/expenses/${expenseId}`)
      .send({ name: 'Updated Expense', amount: '150' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('Updated Expense');
  });

  it('should delete an expense', async () => {
    const res = await request(app).delete(`/api/expenses/${expenseId}`);
    expect(res.statusCode).toEqual(200);
  });
});
