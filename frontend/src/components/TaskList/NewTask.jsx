import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const NewTask = ({ data }) => {

    const { acceptTask } = useContext(AuthContext);

    return (
        <div className='flex-shrink-0 h-full font-gilroy w-[300px] p-5 bg-blue-400 rounded-xl'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-600 text-sm font-bold px-3 py-1 rounded tracking-wider'>{data.category}</h3>
                <h4 className='text-lg tracking-tighter'>{data.taskDate}</h4>
            </div>
            <h2 className='mt-7 text-2xl text-black font-bold'>{data.taskTitle}</h2>
            <p className='text-sm mt-2 tracking-wide'>
                {data.taskDescription}
            </p>
            <div className='mt-6'>
                <button onClick={() => acceptTask(data._id)} className="bg-blue-600 hover:bg-blue-500 transition duration-500 ease-in-out text-base font-semibold text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105">Accept Task</button>
            </div>
        </div>
    )
}

export default NewTask