import React from 'react';
import { useLocation } from 'react-router-dom';

const EmployeeInfo = () => {
    const location = useLocation();
    const { data: employeeData } = location.state || {};

    if (!employeeData) {
        return <p>No employee data available.</p>;
    }

    return (
        <>
            <div className='p-7 w-full font-gilroy'>
                <div className='bg-[#1e1e2f] p-7 h-[900px] w-full'>
                    <h1 className='flex items-center justify-center text-3xl tracking-widest underline font-extrabold text-blue-400'>Employee Information</h1>
                    <div className="information w-full h-full flex gap-3 mt-3">
                        <div className="left-portion relative h-full w-2/3">
                            <h3 className="text-sm text-gray-300 mb-0.5">Fullname</h3>
                            <input
                                value={employeeData.username}
                                className="text-sm py-2 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
                                type="text"
                                readOnly
                            />
                            <h3 className="text-sm text-gray-300 mb-0.5">E-mail Id</h3>
                            <input
                                value={employeeData.email}
                                className="text-sm py-2 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
                                type="text"
                                readOnly
                            />
                            <h3 className="text-sm text-gray-300 mb-0.5">Address</h3>
                            <input
                                value={`130 E 39th St, New York 10016`}
                                className="text-sm py-2 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
                                type="text"
                                readOnly
                            />
                            <h3 className="text-sm text-gray-300 mb-0.5">Date Of birth</h3>
                            <input
                                value={`2000-11-04`}
                                className="text-sm py-2 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
                                type="text"
                                readOnly
                            />
                            <h3 className="text-sm text-gray-300 mb-0.5">Contact</h3>
                            <input
                                value={`1-490-485-8139`}
                                className="text-sm py-2 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
                                type="text"
                                readOnly
                            />
                            <h3 className="text-sm text-gray-300 mb-0.5">Job title</h3>
                            <input
                                value={`Junior Developer`}
                                className="text-sm py-2 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
                                type="text"
                                readOnly
                            />
                            <h3 className="text-sm text-gray-300 mb-0.5">Department</h3>
                            <input
                                value={`developement`}
                                className="text-sm py-2 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
                                type="text"
                                readOnly
                            />
                            <h3 className="text-sm text-gray-300 mb-0.5">Supervisor</h3>
                            <input
                                value={`Indu Jain`}
                                className="text-sm py-2 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
                                type="text"
                                readOnly
                            />
                            <h3 className="text-sm text-gray-300 mb-0.5">Salary</h3>
                            <input
                                value={`-----`}
                                className="text-sm py-2 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
                                type="text"
                                readOnly
                            />
                            <h3 className="text-sm text-gray-300 mb-0.5">Joined On</h3>
                            <input
                                value={employeeData.createdAt.substring(0, 10)}
                                className="text-sm py-2 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
                                type="text"
                                readOnly
                            />
                        </div>
                        <div className="right-portion relative h-full w-1/3">
                            <div className='border border-gray-200 w-56 h-56'>
                                <img className='w-56 h-56' src='data:image/jpeg;base64,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' alt='Employee Avatar' />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className='flex-1 p-7 justify-between gap-5 screen'>

                <div className='w-full flex justify-around'>
                    <div className='rounded-xl w-[45%] h-72 py-6 px-9 bg-blue-400'>
                        <div className='flex justify-between '>
                            <h3 className='text-2xl font-bold text-blue-900 mt-0.5'>Total Task Assigned</h3>
                            <h2 className='text-5xl w-12 h-12 flex items-center justify-center p-10 bg-blue-400 shadow-xl duration-300 ease-in-out hover:scale-110 rounded-full text-blue-900 font-bold'>{employeeData.tasks.length}</h2>
                        </div>
                        <div>
                            {employeeData.tasks.map((task, index) => (
                                <div key={index} className='font-ultra capitalize font-extrabold tracking-tighter'>
                                    <h3 className='text-gray-900 italic mt-0.5 font-medium'>{`${index + 1}. ${task.taskTitle}`}</h3>
                                </div>
                            ))
                            }
                        </div>
                    </div>
                    <div className='rounded-xl w-[45%] h-72 py-6 px-9 bg-green-400'>
                        <div className='flex justify-between '>
                            <h3 className='text-2xl font-bold text-green-900 mt-0.5'>Completed Tasks</h3>
                            <h2 className='text-5xl w-12 h-12 flex items-center justify-center p-10 bg-green-400 shadow-xl duration-300 ease-in-out hover:scale-110 rounded-full text-green-900 font-bold'>{employeeData.taskCount[0]?.completed || 0}</h2>
                        </div>
                        <div>
                            {employeeData.tasks
                                .filter(task => task.completed === true)
                                .map((task, index) => (
                                    <div key={index} className='font-ultra capitalize font-extrabold tracking-tighter'>
                                        <h3 className='text-gray-900 italic mt-0.5 font-medium'>{`${index + 1}. ${task.taskTitle}`}</h3>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className='w-full flex justify-around mt-5'>
                    <div className='rounded-xl w-[45%] h-72 py-6 px-9 bg-yellow-400'>
                        <div className='flex justify-between '>
                            <h3 className='text-2xl font-bold text-yellow-900 mt-0.5'>Accepted Tasks</h3>
                            <h2 className='text-5xl w-12 h-12 flex items-center justify-center p-10 bg-yellow-400 shadow-xl duration-300 ease-in-out hover:scale-110 rounded-full text-yellow-900 font-bold'>{employeeData.taskCount[0]?.active || 0}</h2>
                        </div>
                        <div>
                            {employeeData.tasks
                                .filter(task => task.active === true)
                                .map((task, index) => (
                                    <div key={index} className='font-ultra capitalize font-extrabold tracking-tighter'>
                                        <h3 className='text-gray-900 italic mt-0.5 font-medium'>{`${index + 1}. ${task.taskTitle}`}</h3>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='rounded-xl w-[45%] h-72 py-6 px-9 bg-red-400'>
                        <div className='flex justify-between '>
                            <h3 className='text-2xl font-bold text-red-900 mt-0.5'>Failed Tasks</h3>
                            <h2 className='text-5xl w-12 h-12 flex items-center justify-center p-10 bg-red-400 shadow-xl duration-300 ease-in-out hover:scale-110 rounded-full text-red-900 font-bold'>{employeeData.taskCount[0]?.failed || 0}</h2>
                        </div>
                        <div>
                            {employeeData.tasks
                                .filter(task => task.failed === true)
                                .map((task, index) => (
                                    <div key={index} className='font-ultra capitalize font-extrabold tracking-tighter'>
                                        <h3 className='text-gray-900 italic mt-0.5 font-medium'>{`${index + 1}. ${task.taskTitle}`}</h3>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmployeeInfo;
