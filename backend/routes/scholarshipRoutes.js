const express = require('express');
const router = express.Router();
const Scholarship = require('../models/Scholarship');
const Metric = require('../models/Metric');
const axios = require('axios');

// Filter scholarships via Python microservice
router.post('/filter', async (req, res) => {
    try {
        const { age, education, income, gender, district } = req.body;

        // Fetch all scholarships from DB
        const scholarships = await Scholarship.find();

        // Call Python service for logic
        const response = await axios.post(`${process.env.PYTHON_SERVICE_URL}/filter-scholarships`, {
            user_data: { age, education, income, gender },
            scholarships
        });

        res.json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Log click (anonymized)
router.post('/click/:id', async (req, res) => {
    try {
        const { gender, district } = req.body;
        const scholarship = await Scholarship.findById(req.params.id);
        if (!scholarship) return res.status(404).json({ msg: 'Scholarship not found' });

        scholarship.clickCount += 1;
        await scholarship.save();

        const newMetric = new Metric({
            eventType: 'ScholarshipCheck',
            gender,
            district,
            itemId: scholarship._id
        });
        await newMetric.save();

        res.json({ msg: 'Metric logged' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
