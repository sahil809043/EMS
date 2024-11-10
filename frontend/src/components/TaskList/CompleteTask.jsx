import React from 'react'

const CompleteTask = ({ data }) => {
    return (
        <div className='flex-shrink-0 h-full w-[300px] p-5 font-gilroy bg-green-400 rounded-xl'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-600 font-bold tracking-wider text-sm px-3 py-1 rounded'>{`Task completed`}</h3>
                <h4 className='text-lg tracking-tighter'>{data.taskDate}</h4>
            </div>
            <h2 className='mt-7 text-2xl text-black font-bold'>{data.taskTitle}</h2>
            <p className='text-sm mt-2 tracking-wide'>
                {data.taskDescription}
            </p>
            <div className='mt-6 flex'>
                <button className='h-16 w-16 flex items-center justify-center bg-green-700 hover:bg-green-600 transition duration-700 ease-in-out rounded-full  text-base font-semibold py-2 px-6 shadow-md hover:shadow-lg transform hover:scale-105 hover:rotate-[360deg]'>
                    <i className="ri-check-fill text-3xl text-black"></i>
                </button>
            </div>
        </div>
    )
}

export default CompleteTask