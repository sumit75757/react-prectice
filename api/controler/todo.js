const mongoos = require('mongoose');
const todo = require('../models/todo')
exports.gettodo = (req, res) => {
    todo.find()
      .exec()
      .then(result => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json({
            code: "404",
            massage: "Not Found"
          });
        }
      })
      .catch(err => {
        console.log('0@@ ERROR', err);
      });
  
  };
  exports.postTodo = (req, res) => {
    const todos = new todo({
      _id: new mongoos.Types.ObjectId(),
      title: req.body.title,
      todo: req.body.todo,
      userId:req.body.userId
    });
  
    todos.save().then(result => {
      if (result) {
        res.status(201).json(result)
        console.log(result)
      } else {
        res.status(404).json({
          code: "404",
          massage: "Not Found"
        })
        console.log(result,"errror")
      }
  
  
    }).catch(err => {
      console.log('0@@ ERROR', err);
    });
  
  };
  