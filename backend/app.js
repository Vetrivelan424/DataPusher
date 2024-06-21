const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const accountRoutes = require('./routes/account');
const destinationRoutes = require('./routes/destination');
const dataHandlerRoutes = require('./routes/dataHandler');
const swaggerSetup = require('./swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/account', accountRoutes);
app.use('/destination', destinationRoutes);
app.use('/server', dataHandlerRoutes);

// swagger for API documentaion
swaggerSetup(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
