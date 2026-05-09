const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true,minlength: [6, 'Password must be at least 6 characters long']},
    rollNo: { type: String, required: true, match: [/^[0-9]+$/, 'Roll number must contain only numbers'] },
    academicYear: {type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);