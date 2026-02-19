const mongoose = require('mongoose');
const Scholarship = require('../models/Scholarship');
const Harassment = require('../models/Harassment');
const dotenv = require('dotenv');

dotenv.config();

const scholarships = [
    {
        name: "National Merit Scholarship",
        description: "For economically disadvantaged students with 12th grade marks above 80%.",
        educationLevel: "Undergraduate",
        incomeLimit: 250000,
        gender: "All",
        ageMin: 17,
        ageMax: 22,
        documents: ["Income Certificate", "Mark Sheet"],
        officialLink: "https://scholarships.gov.in"
    },
    {
        name: "Post-Matric Scholarship for Girls",
        description: "Special support for female students pursuing higher education.",
        educationLevel: "Undergraduate",
        incomeLimit: 300000,
        gender: "Female",
        ageMin: 16,
        ageMax: 25,
        documents: ["Caste Certificate", "Admission Receipt"],
        officialLink: "https://scholarships.gov.in"
    }
];

const harassmentGuidelines = [
    {
        category: "Workplace",
        rightsSummary: "Safe working environment is a fundamental right. POSH Act 2013 protects you.",
        applicableLaw: "Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013",
        procedure: [
            "Submit a written complaint to the Internal Committee (IC) within 3 months.",
            "The IC must complete the inquiry within 90 days.",
            "Action must be taken within 60 days of the report."
        ],
        contactLink: "https://shebox.nic.in/"
    },
    {
        category: "Cyber",
        rightsSummary: "Protects against online stalking, bullying, and non-consensual image sharing.",
        applicableLaw: "Information Technology Act, 2000 & IPC sections",
        procedure: [
            "Keep screenshots and URL evidence.",
            "Report on national cybercrime portal.",
            "Inform local cyber cell."
        ],
        contactLink: "https://cybercrime.gov.in/"
    }
];

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Scholarship.deleteMany();
        await Harassment.deleteMany();
        await Scholarship.insertMany(scholarships);
        await Harassment.insertMany(harassmentGuidelines);
        console.log("Data Seeded Successfully");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seed();
