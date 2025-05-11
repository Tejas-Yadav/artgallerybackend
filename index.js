require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const auth = require('./services/auth');
const router = require('./routes/api');
const artRouter = require('./routes/arts');
// Middleware
app.use(cors());
app.use(express.json()); // Parses JSON bodies

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get('/auth/login', auth.login);

app.use('/api', router);
app.use('/art', artRouter);


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