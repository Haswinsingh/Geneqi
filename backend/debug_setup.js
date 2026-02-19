const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// 1. Check if .env exists
const envPath = path.join(__dirname, '.env');
console.log(`Checking for .env file at: ${envPath}`);
if (fs.existsSync(envPath)) {
    console.log('.env file found.');
    // Read content manually to be sure
    const envContent = fs.readFileSync(envPath, 'utf8');
    console.log('Content of .env:', envContent);
} else {
    console.error('.env file NOT found!');
}

// 2. Load .env
const result = dotenv.config();
if (result.error) {
    console.error('Error loading .env via dotenv:', result.error);
} else {
    console.log('.env loaded successfully.');
}

console.log('MONGO_URI from process.env:', process.env.MONGO_URI);

// 3. Try connecting to MongoDB
const connectDB = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected Successfully!');
        process.exit(0);
    } catch (err) {
        console.error('MongoDB Connection Error:', err.name, err.message);
        console.error('Stack Trace:', err.stack);
        process.exit(1);
    }
};

connectDB();
