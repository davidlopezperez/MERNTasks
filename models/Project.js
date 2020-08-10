const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    projectname: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',

    },
    date: {
        type: Date,
        default: Date.now()
    }

});
module.exports = mongoose.model('projects', ProjectSchema);