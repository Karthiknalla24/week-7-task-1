// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/student_tasks', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define task schema and model
const taskSchema = new mongoose.Schema({
    courseId: String,
    taskName: String,
    dueDate: Date,
    additionalDetails: String
});
const Task = mongoose.model('Task', taskSchema);

// Define route to add a new task
app.post('/api/tasks', async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Define route to retrieve tasks for a specific course
app.get('/api/courses/:courseId/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({ courseId: req.params.courseId });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
