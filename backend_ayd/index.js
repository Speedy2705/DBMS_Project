const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const connectMySQL = require('./config/mysql').connectMySQL;
const router = require('./routes/index');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

// Routes
app.use('/api', router);

const PORT = process.env.PORT || 8080;
const PORTMYSQL = 5000;

// Start the MySQL connection and server
connectMySQL().then(() => {
    console.log("Connected to MySQL");
    app.listen(PORTMYSQL, () => {
        console.log(`MySQL Server is running on port ${PORTMYSQL}`);
    });
}).catch(err => {
    console.error('Failed to connect to MySQL:', err);
});

// Start the main DB connection and server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log("Connected to DB");
    });
}).catch(err => {
    console.error('Failed to connect to main DB:', err);
});
