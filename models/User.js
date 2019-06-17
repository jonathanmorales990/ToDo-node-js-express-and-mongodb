const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');
const Todo = require('./Todo');

const userSchema = mongoose.Schema({
	nome: String,
    sobrenome: String,
    email: String,
    password: String,
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
