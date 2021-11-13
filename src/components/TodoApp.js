import React, { useState, useEffect } from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'

const TodoApp = () => {

    const [todos, setTodos] = useState([])
    
    const addTodo = (todo) => {
        setTodos([todo, ...todos]);
    }

    const deleteTodo = () => {
        console.log("deefef");
        // setTodos(todos.filter((t) => t.id !== todo.id))
    }
    return (
        <div>
            <TodoForm addTodo={addTodo}/>
            <TodoList todos={todos} deleteTodo={deleteTodo} />
        </div>
    )
}

export default TodoApp
