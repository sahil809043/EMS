import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const TaskListNumbers = () => {

    const {currentUser} = useContext(AuthContext)

    const newTask = currentUser?.taskCount?.[0]?.newTask;
    const completed = currentUser?.taskCount?.[0]?.completed;
    const active = currentUser?.taskCount?.[0]?.active;
    const failed = currentUser?.taskCount?.[0]?.failed;
    
    return (
        <div className='flex mt-10 justify-between gap-5 screen'>

            <div className='rounded-xl w-[45%] py-6 px-9 bg-blue-400'>
                <h2 className='text-3xl text-blue-900 font-bold'>{newTask}</h2>
                <h3 className='text-xl text-blue-900 mt-0.5 font-medium'>New Task</h3>
            </div>
            <div className='rounded-xl w-[45%] py-6 px-9 bg-green-400'>
                <h2 className='text-3xl text-green-900 font-bold'>{completed}</h2>
                <h3 className='text-xl text-green-900 mt-0.5 font-medium'>Completed Task</h3>
            </div>
            <div className='rounded-xl w-[45%] py-6 px-9 bg-yellow-400'>
                <h2 className='text-3xl text-amber-900 font-bold'>{active}</h2>
                <h3 className='text-xl mt-0.5 text-amber-900 font-medium'>Accepted Task</h3>
            </div>
            <div className='rounded-xl w-[45%] py-6 px-9 bg-red-400'>
                <h2 className='text-3xl text-red-900 font-bold'>{failed}</h2>
                <h3 className='text-xl text-red-900 mt-0.5 font-medium'>Failed Task</h3>
            </div>
        </div>
    )
}

export default TaskListNumbers