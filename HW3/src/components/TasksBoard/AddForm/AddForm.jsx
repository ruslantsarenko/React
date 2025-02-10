import React,{useRef} from 'react'
import service from '../../../services/taskBoardAxios';
import './addForm.scss'

const AddForm = ({ getTasksBoard}) => {

    const inputTitle = useRef();
    const inputStatus = useRef();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const newTask = {
            title: inputTitle.current.value,
            status: +inputStatus.current.value
        }
        try {
            await service.post(newTask)
            getTasksBoard()
        } catch (err) {
            console.error(err)
        }
    }
    
    return (
        <div className='add-form__wrap'>
            <p className='add-form__caption'>Create task</p>
            <form className='add-form' onSubmit={handleFormSubmit}>
                <label className='add-form__item-caption' htmlFor="">Title: <input type="text" ref={inputTitle} /></label>
                <label className='add-form__item-caption' htmlFor="add-form__status">Status:
                    <select name="add-form__status" id="add-form__status" form="add-form" ref={inputStatus}>
                        <option value={0}>To Do</option>
                        <option value={1}>In Progress</option>
                        <option value={2}>Done</option>
                    </select>
                </label>
                <button>Create Task</button>
            </form>
        </div>
    )
}

export default AddForm