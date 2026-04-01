const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/niyaz_opticals')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Schema
const LeadSchema = new mongoose.Schema({
    name: String,
    phone: String,
    service: String,
    message: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Lead = mongoose.model('Lead', LeadSchema);

// API Route
app.post('/api/contact', async (req, res) => {
    try {
        const newLead = new Lead(req.body);
        await newLead.save();
        res.json({ message: "Lead saved successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error saving data" });
    }
});

// Start server
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});