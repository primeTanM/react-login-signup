import React, { useState } from 'react'
import {v4 as uuid} from 'uuid';

const TodoForm = ({ addTodo }) => {

    const [todo, setTodo] = useState({
        id: "",
        task: "",
        completed: false
    });

    const inputChange = (e) => {
        setTodo({ ...todo, task: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(todo.task.trim()){
            addTodo({ ...todo, id: uuid() });  
            //reset task 
            setTodo({ ...todo, task: ""});
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input 
                name="task"
                type="text"
                onChange={inputChange}
                value={todo.task}
            />
            <button type="submit"> Add </button>
            <div>
                <select>
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                </select>
            </div> 
        </form>
    )
}

export default TodoForm;

