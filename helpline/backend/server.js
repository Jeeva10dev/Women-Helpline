const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const PORT = 4000;

// Import routes
const routes = require('./routes/index');

// Use CORS middleware to allow requests from any origin
app.use(cors());

app.use(bodyParser.json());

// Use routes
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});