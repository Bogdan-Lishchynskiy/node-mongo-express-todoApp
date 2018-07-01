var express = require('express');
var router = express.Router();

const tasks = require('../controllers/task.controller.js');


router.get('/', function (req, res, next) {
  res.send('this is api call');
});

router.get('/todo', tasks.getTodos);
router.get('/todo/:id', tasks.getTodo);

router.post('/todo', tasks.addTodo);

router.delete('/todo/:id', tasks.removeTodo);

router.put('/todo/:id', tasks.markTodo);

module.exports = router;
exports.tasks = tasks;