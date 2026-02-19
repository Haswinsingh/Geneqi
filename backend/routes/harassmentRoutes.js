const express = require('express');
const router = express.Router();
const Harassment = require('../models/Harassment');
const Metric = require('../models/Metric');

router.get('/:category', async (req, res) => {
    try {
        const guideline = await Harassment.findOne({ category: req.params.category });
        if (!guideline) return res.status(404).json({ msg: 'Guideline not found' });
        res.json(guideline);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.post('/referral/:id', async (req, res) => {
    try {
        const { gender, district } = req.body;
        const guideline = await Harassment.findById(req.params.id);
        if (!guideline) return res.status(404).json({ msg: 'Guideline not found' });

        guideline.referralCount += 1;
        await guideline.save();

        const newMetric = new Metric({
            eventType: 'HarassmentReferral',
            gender,
            district,
            itemId: guideline._id
        });
        await newMetric.save();

        res.json({ msg: 'Referral logged' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
