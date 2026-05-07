const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const Student = require('./models/Student');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/institute_system')
    .then(() => console.log('MongoDB Connected: 127.0.0.1'))
    .catch(err => console.error('Database connection error:', err));

app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password, rollNo, semester } = req.body;

        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ message: 'Email already exists!' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newStudent = new Student({
            name,
            email,
            password: hashedPassword,
            rollNo,
            semester
        });

        await newStudent.save();
        res.status(201).json({ message: 'Student registered successfully!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));