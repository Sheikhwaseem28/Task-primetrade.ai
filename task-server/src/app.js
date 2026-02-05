const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/users', require('./routes/authRoutes'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
