import { useState, useEffect } from "react";
import TodoList from "./components/TodoList/TodoList";

export default function App(){
  const [todos, setTodos] = useState([])
  const [completedTodos, setCompletedTodos] = useState([])
  const [newTodo, setNewTodo] = useState({
    title: '',
    completed: false
  })

  //createTodos
  const createTodo = async () => {
    const body = {...newTodo}
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      const createdTodo = await response.json()
      const todosCopy = [createdTodo, ...todos]
      setTodos(todosCopy)
      setNewTodo({
        title: '',
        completed: false
      })
    }catch(error){
      console.log(error)
    }
  }
  //delete
  const deleteTodo = async (id) => {
    try {
      const index = completedTodos.findIndex((todo) => todo._id === id)
      const completedTodosCopy = [...completedTodos]
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      await response.json()
      completedTodosCopy.splice(index, 1)
      setCompletedTodos(completedTodosCopy)
    }catch(error){
      console.error(error)
    }
  }
  //movetocompleted
  const moveToCompleted = async (id) => {
    try {
      const index = todos.findIndex((todo) => todo._id === id)
      const todosCopy = [...todos]
      const subject = todosCopy[index]
      subject.completed = true
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subject)
      })
      const updatedTodo = await response.json()
      const completedTDsCopy = [updatedTodo, ...completedTodos]
      setCompletedTodos(completedTDsCopy)
      todosCopy.splice(index, 1)
      setTodos(todosCopy)
    }catch(error){
      console.error(error)
    }
  }
  //getTodos
  const getTodos = async () => {
    try{
      const response = await fetch('/api/todos')
      const foundTodos = await response.json()
      setTodos(foundTodos.reverse())
      const response2 = await fetch('/api/todos/completed')
      const foundCompletedTodos = await response2.json()
      setCompletedTodos(foundCompletedTodos.reverse())
    }catch(error){
      console.error(error)
    }
  }

  useEffect(() => {
      getTodos()
  }, [])
  return(
    <>
    <TodoList 
      newTodo={newTodo}
      setNewTodo={setNewTodo}
      createTodo={createTodo}
      todos={todos}
      moveToCompleted={moveToCompleted}
      completedTodos={completedTodos}
      deleteTodo={deleteTodo}
    />
    </>
  )
}