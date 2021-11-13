import React from 'react'

const Todo = ({ todo, deleteTodo }) => {
    return (
        <div style={{ display: "flex" }}>
            <div style={{color: "black", textDecoration: todo.completed ? "line-through" : null}}>
                { todo.task }
            </div>
            <input type="checkbox" />
            <button onClick={deleteTodo}>Delete</button>
            <button>Edit</button>
        </div>
    )
}

export default Todo
