const express = require('express');
const bodyParser = require('body-parser');
const summaryRoutes = require('./src/routes/summaryRoutes');
const newsRoutes = require('./src/routes/newsRoutes');
const projectRoutes = require('./src/routes/projectRoutes');



const db = require('./src/config/db');

// Connect to db
db.connect();
const app = express();
const PORT = 5555;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});
// Middleware
app.use(bodyParser.json());

// Routes
app.use('/summary', summaryRoutes);
app.use('/news', newsRoutes);
app.use('/project', projectRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
