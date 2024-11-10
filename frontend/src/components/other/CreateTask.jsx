import React, { useContext, useState } from 'react';
import Select from 'react-select'; // Importing react-select
import { AuthContext } from '../../context/AuthProvider';
import { postRequest, baseUrl } from '../../utils/Services';

const CreateTask = () => {
    const { currentUser, userData } = useContext(AuthContext);

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [assignTo, setAssignTo] = useState(null); // Change to null for react-select
    const [category, setCategory] = useState('');
    const [modalStatus, setModalStatus] = useState(false);

    const employeeOptions = userData?.map((employee) => ({
        value: employee._id,
        label: employee.username,
    }));

    const submitHandler = async (e) => {
        e.preventDefault();

        const formattedDate = new Date(taskDate).toISOString().split("T")[0];

        const taskData = {
            taskTitle,
            taskDescription,
            taskDate: formattedDate,
            assignTo: assignTo?.value, // Use assignTo.value to get selected employee ID
            category,
            active: false,
            newTask: true,
            failed: false,
            completed: false,
        };

        try {
            const response = await postRequest(
                `${baseUrl}/admin/create-task`,
                JSON.stringify(taskData)
            );

            if (response.error) {
                console.log(response.error);
            } else {
                console.log(response);
                setModalStatus(true); // Open modal on successful submission
            }
        } catch (error) {
            console.log(error.message);
        }

        // Reset form fields
        setTaskTitle('');
        setCategory('');
        setAssignTo(null); // Reset to null for react-select
        setTaskDate('');
        setTaskDescription('');
    };

    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: '#1e1e2f',
            borderColor: 'gray',
            color: '#d3d3d3',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#2e2e3f' : '#1e1e2f',
            color: '#d3d3d3',
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#d3d3d3',
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#1e1e2f',
        }),
    };


    return (
        <div className="p-5 bg-[#1e1e2f] mt-5 rounded">
            <form onSubmit={submitHandler} className="flex-1">
                <h1 className='flex items-center justify-center mb-10 text-3xl font-extrabold text-blue-400 font-gilroy'>Assign Task to Employees</h1>
                <div className='flex flex-wrap w-full items-start justify-between'>
                    <div className="w-1/2 font-gilroy">
                        <div>
                            <h3 className="text-sm text-gray-300 mb-0.5">Task Title</h3>
                            <input
                                value={taskTitle}
                                onChange={(e) => setTaskTitle(e.target.value)}
                                className="text-sm py-2 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
                                type="text"
                                placeholder="Make a UI design"
                            />
                        </div>
                        <div>
                            <h3 className="text-sm text-gray-300 mb-0.5">Date</h3>
                            <input
                                value={taskDate}
                                onChange={(e) => setTaskDate(e.target.value)}
                                className="text-sm py-2 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
                                type="date"
                            />
                        </div>
                        <div>
                            <h3 className="text-sm text-gray-300 mb-0.5">Assign to</h3>
                            <Select
                                options={employeeOptions}
                                value={assignTo}
                                onChange={setAssignTo}
                                className="text-sm w-4/5 mb-4"
                                placeholder="Search and select employee"
                                styles={customStyles}
                                isSearchable
                            />
                        </div>
                        <div>
                            <h3 className="text-sm text-gray-300 mb-0.5">Category</h3>
                            <input
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="text-sm py-2 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
                                type="text"
                                placeholder="design, dev, etc"
                            />
                        </div>
                    </div>

                    <div className="w-2/5 flex items-center flex-col font-gilroy">
                        <h3 className="text-sm text-gray-300 mb-0.5">Description</h3>
                        <textarea
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                            className="w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400"
                            placeholder="Task description"
                        />
                        <button
                            type="submit"
                            className="bg-emerald-500 w-1/2 py-3 shadow-md transition duration-500 hover:scale-105 hover:shadow-lg hover:bg-emerald-600 px-5 rounded text-base font-semibold mt-4 font-gilroy tracking-widest"
                        >
                            Assign Task
                        </button>
                    </div>
                </div>
            </form>

            {modalStatus && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
                    <div className="relative p-4 text-center bg-black rounded-lg shadow-lg dark:bg-gray-800 sm:p-5">
                        <div className="relative flex flex-col w-full outline-none focus:outline-none bg-opacity-50 backdrop-blur-md z-50">
                            <div className='flex items-center justify-end'>
                                <button onClick={() => {
                                    setModalStatus(false);
                                }}
                                    className='h-8 w-8 flex items-center justify-center transition duration-700 ease-in-out rounded-full  text-base font-semibold shadow-md hover:shadow-lg transform hover:scale-105 hover:rotate-[180deg]'>
                                    <i className="ri-close-line text-red-800 text-xl"></i>
                                </button>
                            </div>
                            <p className="mb-2 mt-4 mx-10 text-2xl font-bold font-gilroy text-white dark:text-white">Task Assigned Successfully</p>
                            <div className='flex items-center justify-center'>
                                <button className='h-16 w-16 flex items-center justify-center transition duration-700 ease-in-out rounded-full  text-base font-semibold py-2 px-6 shadow-md hover:shadow-lg transform hover:scale-125'>
                                    <span className='text-5xl'>👍</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateTask;
