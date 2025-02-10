import { useState, useEffect} from 'react'
import "../TasksBoard/tasksBoard.scss"
import service from "../../services/taskBoardAxios"
import AddForm from './AddForm/AddForm';

const TasksBoard = () => {
    const [tasks, setTasks] = useState([]);
    const [todoCount, setTodoCount] = useState(0);
    const [inProgressCount, setInProgressCount] = useState(0);
    const [doneCount, setDoneCount] = useState(0);
    
    const getTasksBoard = async () => {
        try {
            const response = await service.get();
            setTasks(response);
            updateCounters(response);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getTasksBoard()
    }, []);

   

    const updateCounters = (tasks) => {
        setTodoCount(tasks.filter((task) => (task.status === 0)).length);
        setInProgressCount(tasks.filter((task) => (task.status === 1)).length);
        setDoneCount(tasks.filter((task) => (task.status === 2)).length);
    };

    const changeStatus = (taskId, newStatus) => {
        const updatedTasks = tasks.map(task => {
            return task.id === taskId ? { ...task, status: newStatus } : task
        });
        setTasks(updatedTasks);
        updateCounters(updatedTasks);
    };

    const archiveTask = (taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
        updateCounters(updatedTasks);
    };

    return (
        <>
            <AddForm getTasksBoard={getTasksBoard} />
            <div className='tasksBoard' >
                <div className='tasksBoard__section'>
                    <h3>To Do ({todoCount})</h3>
                    <ul>
                        {tasks.filter(task => task.status === 0).map(task => (
                            <li key={task.id}>
                                {task.title}
                                <button onClick={() => changeStatus(task.id, 1)}>In Progress</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='tasksBoard__section'>
                    <h3>In Progress ({inProgressCount})</h3>
                    <ul>
                        {tasks.filter(task => task.status === 1).map(task => (
                            <li key={task.id}>
                                {task.title}
                                <button onClick={() => changeStatus(task.id, 0)}>To Do</button>
                                <button onClick={() => changeStatus(task.id, 2)}>Done</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='tasksBoard__section'>
                    <h3>Done ({doneCount})</h3>
                    <ul>
                        {tasks.filter(task => task.status === 2).map(task => (
                            <li key={task.id}>
                                {task.title}
                                <button onClick={() => archiveTask(task.id)}>To Archive</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default TasksBoard;