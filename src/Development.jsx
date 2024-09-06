import React, { useState, useEffect } from "react";
import Header from './Header';
import Footer from './Footer';

function Development() {
    const [tasks, setTasks] = useState([]);
    const [creator, setCreator] = useState('');
    const [desc, setDesc] = useState('');
    const [isComplete, setComplete] = useState(false);

    // Load tasks from localStorage on component mount
    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    // Save tasks to localStorage whenever tasks state changes
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    function handleCreatorChange(event) {
        setCreator(event.target.value);
    }

    function handleDescChange(event) {
        setDesc(event.target.value);
    }

    function handleCompletion() {
        setComplete(prevComplete => !prevComplete);
    }

    function invertComplete(index) {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, isComplete: !task.isComplete } : task
        );
        setTasks(updatedTasks);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const currentDate = new Date();
        const currentDateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
        const currentTimeString = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
        const newTask = { date: currentDateString, time: currentTimeString, creator, desc, isComplete };
        setTasks([...tasks, newTask]);
        setCreator('');
        setDesc('');
        setComplete(false);
    }

    return (
        <>
            <Header />
            <div className='focuss'>
                <div className="development-region">
                    <h1>Development</h1>
                    <div className="form-holder-1">
                        <div className="form-holder-2">
                            <form onSubmit={handleSubmit}>
                                <input type="text" placeholder="Creator name" className="development-text-box" value={creator} onChange={handleCreatorChange} />
                                <input type="text" placeholder="Problem description" className="development-text-box" value={desc} onChange={handleDescChange} />
                                <button className="development-text-box" type="submit">Add Task</button>
                            </form>
                        </div>
                    </div>
                    <ul>
                        {tasks.map((task, index) =>
                            <li className="task-elements" key={index} onClick={() => invertComplete(index)}>
                                {task.date}@{task.time} - {task.creator}: {task.desc}, Status: {task.isComplete ? "done" : "pending"}
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Development;
