import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AcceptTask = ({ data }) => {

    const { completeTask, failTask } = useContext(AuthContext);

    return (
        <div className='flex-shrink-0 h-full font-gilroy w-[300px] p-5 bg-amber-400 rounded-xl'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-600 text-sm font-bold tracking-wider px-3 py-1 rounded'>{data.category}</h3>
                <h4 className='text-lg tracking-tighter'>{data.taskDate}</h4>
            </div>
            <h2 className='mt-7 text-2xl text-black font-bold'>{data.taskTitle}</h2>
            <p className='text-sm mt-2 tracking-wide'>
                {data.taskDescription}
            </p>
            <div className='flex gap-5 justify-around mt-6'>
                <button onClick={() => completeTask(data._id)} className='bg-amber-600 hover:bg-amber-500 transition duration-500 ease-in-out text-sm  font-semibold text-white px-2 py-2 tracking-tight rounded-lg shadow-md hover:shadow-lg transform hover:scale-105'>Mark as Completed</button>
                <button onClick={() => failTask(data._id)} className='bg-amber-600 hover:bg-amber-500 transition duration-500 ease-in-out text-sm  font-semibold text-white px-2 py-2 tracking-tight rounded-lg shadow-md hover:shadow-lg transform hover:scale-105'>Mark as Failed</button>
            </div>
        </div>
    )
}

export default AcceptTask