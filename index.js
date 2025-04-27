require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses JSON bodies

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the Express REST API!');
});

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack); // For debugging
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.listen(PORT, HOST, () => {
    console.log(`Server is running on port ${HOST}:${PORT}`);
});