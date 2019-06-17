const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
	todo: String,
	date: { type: Date, default: Date.now },
	done: { type: Boolean, default: false },
});

module.exports = todoSchema;
