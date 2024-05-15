const User = require('../models/User');

const getAllProfiles = async (req, res) => {
    try {
        const profiles = await User.find().select('-password');
        res.json({ profiles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getAllProfiles };
