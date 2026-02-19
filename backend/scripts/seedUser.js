const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const connectDB = require('../config/db');

dotenv.config();

const seedUser = async () => {
    try {
        await connectDB();

        const email = 'vasanth@gmail.com';
        const password = 'password123'; // Default password for testing

        // Check if user exists
        let user = await User.findOne({ email });

        if (user) {
            console.log('User already exists. Updating password...');
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            console.log('User password updated to: password123');
        } else {
            console.log('Creating new user...');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            user = new User({
                username: 'Vasanth',
                email,
                password: hashedPassword,
                role: 'user'
            });

            await user.save();
            console.log('User created successfully');
            console.log('Email: vasanth@gmail.com');
            console.log('Password: password123');
        }

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedUser();
