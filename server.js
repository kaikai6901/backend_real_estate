const express = require('express');
// var cors = require('cors')
const bodyParser = require('body-parser');
const summaryRoutes = require('./src/routes/summaryRoutes');
const newsRoutes = require('./src/routes/newsRoutes');
const projectRoutes = require('./src/routes/projectRoutes');
const modalRouters = require('./src/routes/modalRouters')


const db = require('./src/config/db');
// var cors = require('cors');

// Connect to db
db.connect();
const app = express();
const PORT = 5555;
// var whitelist = ['http://127.0.0.1:3000']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

// app.use(cors(corsOptions));
// app.use(cors());

const addCustomHeader = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow the specific HTTP methods needed
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow the specific headers needed
  next();
};

// Apply the middleware to all requests
app.use(addCustomHeader);
// Middleware
app.use(bodyParser.json());

// Routes
app.use('/summary', summaryRoutes);
app.use('/news', newsRoutes);
app.use('/project', projectRoutes);
app.use('/modal', modalRouters)
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
