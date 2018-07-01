const mongoose = require('mongoose');


const todoSchema = mongoose.Schema({
    taskDescriptions: String,
    isDone: Boolean
}, {
    timestamps: true
});


module.exports = mongoose.model('todoModel', todoSchema)