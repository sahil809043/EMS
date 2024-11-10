import React from 'react'

const FailedTask = ({ data }) => {
    return (
        <div className='flex-shrink-0 h-full w-[300px] p-5 font-gilroy bg-red-400 rounded-xl'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-600 text-sm font-bold tracking-wider px-3 py-1 rounded'>{`Task failed`}</h3>
                <h4 className='text-lg tracking-tighter'>{data.taskDate}</h4>
            </div>
            <h2 className='mt-7 text-2xl text-black font-bold'>{data.taskTitle}</h2>
            <p className='text-sm mt-2 tracking-wide'>
                {data.taskDescription}
            </p>
            <div className='mt-6 flex'>
                <button className='h-16 w-16 flex items-center justify-center bg-red-700 hover:bg-red-600 transition duration-700 ease-in-out rounded-full  text-base font-semibold py-2 px-6 shadow-md hover:shadow-lg transform hover:scale-105 hover:rotate-[180deg]'>
                    <i className="ri-close-line text-3xl text-black"></i>
                </button>
            </div>
        </div>
    )
}

export default FailedTask