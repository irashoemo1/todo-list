//controllers/api/todos

const Todo = require('../../models/Todo')

module.exports = {
    create,
    indexComplete,
    indexNotComplete,
    show,
    update,
    destroy,
    jsonTodos,
    jsonTodo
}

//jsonTodos, jsonTodo
function jsonTodo(req, res){
    res.json(res.locals.data.todo)
}

function jsonTodos(req, res){
    res.json(res.locals.data.todos)
}


//create
async function create(req, res, next){
    try {
        const todo = await Todo.create(req.body)
        res.locals.data.todo = todo
        next()
    }catch(error){
        res.status(400).json({msg: error.message})
    }
}

//indexComplete and notComplete
async function indexComplete(req, res, next){
    try{
        const todos = await Todo.find({completed: true})
        res.locals.data.todos = todos
        next()
    }catch(error){
        res.status(400).json({msg: error.message})
    }
}

async function indexNotComplete(req, res, next){
    try{
        const todos = await Todo.find({completed: false})
        res.locals.data.todos = todos
        next()
    }catch(error){
        res.status(400).json({msg: error.message})
    }
}

//show -read
async function show(req, res, next){
    try{
        const todo = await Todo.findById(req.params.id)
        res.locals.data.todo = todo
        next()
    }catch(error){
        res.status(400).json({msg: error.message})
    }
}



//update
async function update(req, res, next){
    try{
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.locals.data.todo = todo
        next()
    }catch(error){
        res.status(400).json({msg: error.message})
    }
}

//destroy
async function destroy(req, res, next){
    try{
        const todo = await Todo.findByIdAndDelete(req.params.id)
        res.locals.data.todo = todo
        next()
    }catch(error){
        res.status(400).json({msg: error.message})
    }
}