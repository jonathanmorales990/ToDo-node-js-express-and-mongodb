const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', authentication, (req, res, next) => {
	User.findOne({ _id: req.user._id }, (err, model) => {
		if(err)
			return res.json("Ocorreu um erro, tente novamente!").status(500);
		if(model)
			return res.render('todo', { title: 'ToDo', todos: model.todos });
	});
});

router.delete('/', authentication, (req, res, next) => {
	User.findOneAndUpdate (
		{ _id: req.user._id, 'todos._id': req.body._id  },
		{ $pull: {'todos' : {_id: req.body._id } } }, (err, model) => {
			if(err)
				return res.json(err).status(500);
			if(model)
				return res.json('ok').status(200);
	});
});

router.put('/', authentication, (req, res, next) => {
	User.findOneAndUpdate (
		{ _id: req.user._id, 'todos._id': req.body._id  },
		{ $set: { 'todos.$.done': true } },
		{
			"new": true,
			projection: {
				todos: {
					$elemMatch: { "_id": req.body._id }
				}
			}
		}, (err, model) => {
			if(err)
				return res.json(err).status(500);
			if(model)
				return res.json(model.todos).status(200);
	});
});

router.post('/', authentication, (req, res, next) => {
	User.findOneAndUpdate (
		{ _id: req.user._id },
		{ $push: { todos: { todo: req.body.todo} } },
		{
			"new": true,
			projection: {
				todos: {
					$slice: -1,
				}
			}
		}, (err, model) => {
			if(err){
				return res.json(err).status(500);
			}
			if(model)
				return res.json(model.todos).status(200);
	});
});

function authentication (req, res, next) {
    if(!req.isAuthenticated()){
		return res.redirect(302,"/");
    } else{
		return next();
    }
}

module.exports = router;
