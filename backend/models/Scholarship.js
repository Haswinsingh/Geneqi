const mongoose = require('mongoose');

const ScholarshipSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    educationLevel: { type: String, required: true }, // e.g., 10th, 12th, Undergraduate
    incomeLimit: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Transgender', 'All'], default: 'All' },
    ageMin: { type: Number, default: 15 },
    ageMax: { type: Number, default: 24 },
    documents: [{ type: String }],
    deadline: { type: String },
    officialLink: { type: String, required: true },
    clickCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Scholarship', ScholarshipSchema);
