const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
 	return res.render('todo', { title: 'ToDo' });
});

module.exports = router;