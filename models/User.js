const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Todo = require('./Todo');

const userSchema = mongoose.Schema({
	nome: { type: String, required: true },
	sobrenome: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	todos: [Todo]
},{
    	collection: 'usuarios'
});
// generating a hash
userSchema.methods.generateHash = function(password) {
    	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
// checking if password is valid
userSchema.methods.validPassword = function(password) {
    	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
