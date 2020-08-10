const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    taskname: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now()
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projects'
    }
});

module.exports = mongoose.model('Task', TaskSchema);