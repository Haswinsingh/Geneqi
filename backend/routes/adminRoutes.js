const express = require('express');
const router = express.Router();
const Metric = require('../models/Metric');
const Scholarship = require('../models/Scholarship');
const Harassment = require('../models/Harassment');

router.get('/metrics', async (req, res) => {
    try {
        const totalScholarshipClicks = await Metric.countDocuments({ eventType: 'ScholarshipCheck' });
        const totalHarassmentReferrals = await Metric.countDocuments({ eventType: 'HarassmentReferral' });

        const genderDist = await Metric.aggregate([
            { $group: { _id: "$gender", count: { $sum: 1 } } }
        ]);

        const districtDist = await Metric.aggregate([
            { $group: { _id: "$district", count: { $sum: 1 } } }
        ]);

        res.json({
            totalScholarshipClicks,
            totalHarassmentReferrals,
            genderDist,
            districtDist
        });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
