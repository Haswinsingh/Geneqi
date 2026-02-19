try {
    const authRoutes = require('./routes/authRoutes');
    console.log('Auth routes loaded successfully');
} catch (error) {
    console.error('Error loading authRoutes:', error);
}
