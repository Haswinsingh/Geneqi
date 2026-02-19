const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper function to generate JWT
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'fallback_secret',
        { expiresIn: '1d' }
    );
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            username,
            email,
            password
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const token = generateToken(user);
        res.json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for user
        const user = await User.findOne({ email });
        if (!user) {
            console.log(`Login failed: User not found for email: ${email}`);
            return res.status(400).json({ msg: 'Invalid Credentials (User not found)' });
        }

        // Check password if it's a password-based user
        if (user.password) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                console.log(`Login failed: Password mismatch for user: ${email}`);
                return res.status(400).json({ msg: 'Invalid Credentials (Password mismatch)' });
            }
        } else {
            console.log(`Login failed: User ${email} has no password (social login only)`);
            return res.status(400).json({ msg: 'Please login using your social account' });
        }

        const token = generateToken(user);
        res.json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/auth/google
// @desc    Google Authentication (Mock for development)
// @access  Public
router.post('/google', async (req, res) => {
    try {
        const { email, name, googleId } = req.body; // In production, verify idToken here

        let user = await User.findOne({ email });

        if (user) {
            if (!user.googleId) {
                user.googleId = googleId;
                await user.save();
            }
        } else {
            user = new User({
                username: name,
                email,
                googleId,
                password: '' // No password for social login
            });
            await user.save();
        }

        const token = generateToken(user);
        res.json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/auth/facebook
// @desc    Facebook Authentication (Mock for development)
// @access  Public
router.post('/facebook', async (req, res) => {
    try {
        const { email, name, facebookId } = req.body; // In production, verify accessToken here

        let user = await User.findOne({ email });

        if (user) {
            if (!user.facebookId) {
                user.facebookId = facebookId;
                await user.save();
            }
        } else {
            user = new User({
                username: name,
                email,
                facebookId,
                password: '' // No password for social login
            });
            await user.save();
        }

        const token = generateToken(user);
        res.json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
