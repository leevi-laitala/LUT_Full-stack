import React from "react";
import { useState, useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";



function App() {
    const [showAddTask, setShowAddTask] = useState(false);
    const [tasks, setTasks] = useState([
    ]);

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks();
            setTasks(tasksFromServer)
        };

        getTasks();
    }, []);

    // Fetch tasks
    const fetchTasks = async () => {
        const res = await fetch("http://localhost:5050/tasks");
        const data = await res.json();

        return data;
    };

    // Fetch a task
    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5050/tasks/${id}`);
        const data = await res.json();

        return data;
    };

    // Add task
    const addTask = async (task) => {
        const res = await fetch("http://localhost:5050/tasks", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(task)
        });
        
        const data = await res.json();

        setTasks([...tasks, data]);

        //const id = Math.floor(Math.random() * 10000) + 1;
        //const newTask = { id, ...task };

        //setTasks([...tasks, newTask]);
    }

    // Delete a task
    const deleteTask = async (id) => {
        await fetch(`http://localhost:5050/tasks/${id}`, {
            method: "DELETE"
        });

        setTasks(tasks.filter((task) => task.id !== id));
    };

    // Toggle reminder
    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id);
        const updateTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

        const res = await fetch(`http://localhost:5050/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(updateTask)
        });

        const data = await res.json();

        setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
    };


    return (
        <Router>
            <div className="container">
                <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} title="Task Tracker" />
                { showAddTask && <AddTask onAdd={addTask}/> }
                <Routes>
                    <Route path="/" element={tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : "No tasks"} />
                    <Route path="/about" element={<About />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

// class App extends React.Component {
//     render() {
//         return (
//             <h1>Hello from a class</h1>
//         );
//     }
// };

export default App;
