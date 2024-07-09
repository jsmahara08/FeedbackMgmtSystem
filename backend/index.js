const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const routes = require('./routes/index');
const cors = require('cors'); // Import cors middleware
require('dotenv').config();

// Initialize Express app
const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB
connectDB();

// CORS middleware
app.use(cors());

// Routes
app.use('/api', routes);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port localhost:${PORT}`));
