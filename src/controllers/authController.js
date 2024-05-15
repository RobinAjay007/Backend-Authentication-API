const Bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const admin = require('../models/admin');
const keys = require('../config/keys');

const register = async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;
        // Check if username already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        // Hash password
        let salt = await Bcrypt.genSaltSync(10);
        let hash = await Bcrypt.hashSync(password, salt);
        let create = await User.create({ ...req.body, ...{ password: hash }});
       create.save()
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const adminregister = async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;
        // Check if username already exists
        const existingUser = await admin.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        // Hash password
        let salt = await Bcrypt.genSaltSync(10);
        let hash = await Bcrypt.hashSync(password, salt);
        let create = await admin.create({ ...req.body, ...{ password: hash }});
       create.save()
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Find user in database
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        // Check password
        const passwordMatch = await Bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        // Generate access token
        const accessToken = jwt.sign({ username: user.username, role: user.role }, keys.secretKey);
        res.json({ accessToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const adminlogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Find user in database
        const user = await admin.findOne({ username });
        console.log(user)
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        // Check password
        const passwordMatch = await Bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        // Generate access token
        const accessToken = jwt.sign({ username: user.username, role: user.role }, keys.secretKey);
        res.json({ accessToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const socialLogin = async (req, res) => {
    try {
        const { username, role } = req.user;
        const accessToken = jwt.sign({ username, role }, keys.secretKey);
        res.json({ accessToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const logout = (req, res) => {
    // For client-side handling, no server action needed
    res.json({ message: 'Logged out successfully' });
};

module.exports = { register, login, socialLogin, logout ,adminlogin,adminregister};
