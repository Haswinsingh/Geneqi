const mongoose = require('mongoose');

const HarassmentSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ['Workplace', 'Cyber', 'Domestic Violence', 'Child Protection'],
        required: true
    },
    rightsSummary: { type: String, required: true },
    applicableLaw: { type: String, required: true },
    procedure: [{ type: String }],
    contactLink: { type: String, required: true },
    referralCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Harassment', HarassmentSchema);
