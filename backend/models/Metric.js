const mongoose = require('mongoose');

const MetricSchema = new mongoose.Schema({
    eventType: { type: String, enum: ['ScholarshipCheck', 'HarassmentReferral'], required: true },
    timestamp: { type: Date, default: Date.now },
    gender: { type: String, enum: ['Male', 'Female', 'Transgender', 'Prefer not to say'] },
    district: { type: String },
    itemId: { type: mongoose.Schema.Types.ObjectId } // Reference to Scholarship or Harassment Guideline
});

module.exports = mongoose.model('Metric', MetricSchema);
