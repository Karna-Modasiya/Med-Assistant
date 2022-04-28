const express = require('express');
const app = express();
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
    console.log("Connected to MongoDB!");
});

// MongoDB store for storing sessions
const store = new MongoDBSession({
    uri: process.env.DB_CONNECTION,
    collection: 'sessions'
});

// Import Routes
const authRoute = require('./routes/auth');
const doctorRoute = require('./routes/doctor');
const patientRoute = require('./routes/patient');

// Middlewares
app.use(session({
    name: 'auth',
    secret: 'this is my secret key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false
    },
    store: store
}));
app.use(cors({
    origin: ["http://localhost:4200"],
    credentials: true
}));
app.use(express.json());
app.use('/api/user', authRoute);
app.use('/api/doctor', doctorRoute);
app.use('/api/patient', patientRoute);

// Home route
app.get('/', (req, res) => {
    res.send('Home Page');
});

// 404: no matching route

// Listen
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on Port: ${port}`);
});
