const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
	todo: { type: String, required: true },
	date: { type: Date, default: Date.now },
	done: { type: Boolean, default: false },
});

module.exports = todoSchema;
