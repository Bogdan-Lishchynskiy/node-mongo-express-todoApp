const todoModel = require('../models/todoModel');

const addTodo = (req, res) => {
  const task = new todoModel({
    taskDescriptions: req.body.taskDescriptions || "Untitled Task",
    isDone: false
  });

  task.save()
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Task."
      });
    });
};

const getTodos = (req, res, next) => {
  todoModel.find()
    .then(tasks => {
      res.send(tasks);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tasks."
      });
    });
};

const getTodo = (req, res) => {
  const id = req.params.id;
  todoModel.findById({
      _id: id
    })
    .then(task => res.json(task))
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `Todo task not found with id ${id}`
        });
      }
      return res.status(500).send({
        message: `Error retrieving task with id ${id}`
      });
    })
}

const removeTodo = (req, res, next) => {
  const id = req.params.id;
  todoModel.findByIdAndRemove({
      _id: id
    })
    .then(task => res.json({
      msg: `Todo task '${id}' was deleted`
    }))
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `Todo task not found with id ${id}`
        });
      }
      return res.status(500).send({
        message: `Error retrieving task with id ${id}`
      });
    })
}

const markTodo = (req, res, next) => {
  const id = req.params.id;
  const markAction = req.body.action || "done";
  console.log(`markTodo call to id ${id}, markAction: ${markAction}`);
  if (markAction == 'done') {
    markDone(req, res);
  } else {
    markUndone(req, res);
  }

}


const markDone = (req, res, next) => {
  const id = req.params.id;
  console.log(`markDone call to id ${id}`);
  todoModel.findByIdAndUpdate({
      _id: id
    }, {
      $set: {
        isDone: true
      }
    }, {
      new: true
    })
    .then(task => res.json(task))
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `Todo task not found with id ${id}`
        });
      }
      return res.status(500).send({
        message: `Error retrieving task with id ${id}`
      });
    })
}

const markUndone = (req, res, next) => {
  const id = req.params.id;
  console.log(`markUndsone call to id ${id}`);
  todoModel.findByIdAndUpdate({
      _id: id
    }, {
      $set: {
        isDone: false
      }
    }, {
      new: true
    })
    .then(task => res.json(task))
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `Todo task not found with id  ${id}`
        });
      }
      return res.status(500).send({
        message: `Error retrieving task with id ${id}`
      });
    })
}

module.exports = {
  getTodos,
  getTodo,
  addTodo,
  removeTodo,
  markTodo
}