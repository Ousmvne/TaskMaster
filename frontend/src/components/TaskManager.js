import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        title: '',
        category: 'Work',
        difficulty: 'E',
        estimated_duration: '00:30:00',
    });

    useEffect(() => {
        axios.get('http://localhost:8000/api/tasks/', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        .then(response => setTasks(response.data))
        .catch(error => console.error('Error fetching tasks:', error.response ? error.response.data : error.message));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/tasks/', newTask, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        .then(response => setTasks([...tasks, response.data]))
        .catch(error => console.error('Error creating task:', error.response ? error.response.data : error.message));
    };

    return (
        <div>
            <h2>Your Tasks</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
                <select
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                >
                    <option value="Work">Travail</option>
                    <option value="Personal">Personnel</option>
                    <option value="Leisure">Loisirs</option>
                </select>
                <select
                    value={newTask.difficulty}
                    onChange={(e) => setNewTask({ ...newTask, difficulty: e.target.value })}
                >
                    <option value="E">Facile</option>
                    <option value="M">Moyen</option>
                    <option value="H">Difficile</option>
                </select>
                <input
                    type="text"
                    placeholder="Estimated Duration"
                    value={newTask.estimated_duration}
                    onChange={(e) => setNewTask({ ...newTask, estimated_duration: e.target.value })}
                />
                <button type="submit">Add Task</button>
            </form>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.title} - {task.category} - 
                        {task.difficulty === 'E' ? 'Facile' : task.difficulty === 'M' ? 'Moyen' : 'Difficile'} - 
                        {task.estimated_duration}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskManager;
