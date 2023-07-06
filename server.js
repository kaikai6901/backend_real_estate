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
