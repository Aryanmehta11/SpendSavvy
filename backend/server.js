const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const expenseRoutes=require('./routes/expenseRoutes')

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/expenses', expenseRoutes);


// MongoDB connection
mongoose.connect('mongodb://localhost:27017/spend-savvy', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to SpendSavvy API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
