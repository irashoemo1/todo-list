const express = require('express')
const router = express.Router()
const todoController = require("../../controllers/api/todos")


//index /api/todos
router.get('/', todoController.indexNotComplete, todoController.jsonTodos)
//index /api/todos/completed
router.get('/completed', todoController.indexComplete, todoController.jsonTodos)
//delete //api/todos/:id
router.delete('/:id', todoController.destroy, todoController.jsonTodo)
//update /api/todos/:id
router.put('/:id', todoController.update, todoController.jsonTodo)
//create /api/todos
router.post('/', todoController.create, todoController.jsonTodo)
//show /api/todos/:id
router.get('/:id', todoController.show, todoController.jsonTodo)

module.exports = router