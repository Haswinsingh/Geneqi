const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const response = await axios.post(`${process.env.PYTHON_SERVICE_URL}/detect-intent`, {
            text: message
        });
        res.json(response.data);
    } catch (err) {
        res.status(500).send('AI Service Error');
    }
});

module.exports = router;
