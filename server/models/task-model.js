const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
