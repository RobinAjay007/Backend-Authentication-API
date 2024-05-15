const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const authRoutes = require('./src/routes/auth');
const profileRoutes = require('./src/routes/profile');
const adminRoutes = require('./src/routes/admin');
const privacyRoutes = require('./src/routes/privacy');
require('dotenv').config();
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());
// Port Config in env
let configPort=process.env.PORT; 
// URL config in env
let url=process.env.MONGODB_URL;

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Database connection
mongoose.connect(url)
.then(()=>console.log("Connected Sucessfully"))
    .catch(err => console.log(err));

// Routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/admin', adminRoutes);
app.use('/privacy', privacyRoutes);
app.use("/picture", express.static("./upload/images"));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start server

app.listen(configPort, () => console.log(`Server running on port ${configPort}`));
