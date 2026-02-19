const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'server_DEBUG.txt');
fs.writeFileSync(logFile, 'Server startup initiated...\n');

function log(msg) {
    console.log(msg);
    fs.appendFileSync(logFile, msg + '\n');
}

process.on('uncaughtException', (err) => {
    log(`UNCAUGHT EXCEPTION: ${err.message}\n${err.stack}`);
    process.exit(1);
});

try {
    log('Loading dependencies...');
    const express = require('express');
    const cors = require('cors');
    const dotenv = require('dotenv');
    log('Dependencies loaded.');

    log('Loading DB config...');
    const connectDB = require('./config/db');
    log('DB config loaded.');

    dotenv.config();
    log('Environment variables loaded.');

    log('Connecting to DB...');
    connectDB();
    // connectDB is async but we don't await here in original code, so it might fail later.
    // However, if it fails synchronously inside (e.g. invalid URI format), it might crash.
    log('DB connection initiated.');

    const app = express();
    app.use(cors());
    app.use(express.json());
    log('Middleware configured.');

    log('Loading routes...');
    app.use('/api/scholarships', require('./routes/scholarshipRoutes'));
    app.use('/api/harassment', require('./routes/harassmentRoutes'));
    app.use('/api/ai', require('./routes/aiRoutes'));
    app.use('/api/admin', require('./routes/adminRoutes'));
    app.use('/api/auth', require('./routes/authRoutes'));
    log('Routes loaded.');

    const PORT = process.env.PORT || 5000;
    log(`Starting server on port ${PORT}...`);

    app.listen(PORT, () => {
        log(`Backend server running on port ${PORT}`);
    });

} catch (err) {
    log(`CRITICAL ERROR: ${err.message}\n${err.stack}`);
    process.exit(1);
}
