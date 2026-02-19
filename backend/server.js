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

    dotenv.config();
    log('Environment variables loaded.');

    log('Loading DB config...');
    const connectDB = require('./config/db');
    log('DB config loaded.');

    log('Connecting to DB...');
    connectDB();
    log('DB connection initiated.');

    const app = express();

    // ✅ Proper CORS setup
    const allowedOrigins = [
        "http://localhost:5173",
        process.env.FRONTEND_URL
    ].filter(Boolean);

    app.use(cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true
    }));

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
