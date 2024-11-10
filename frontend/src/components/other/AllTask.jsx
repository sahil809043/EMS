import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom'
import EmployeeInfo from './EmployeeInfo';

const AllTask = () => {
  const { userData: allEmployees } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className='bg-[#1e1e2f] p-5 rounded font-ultra mt-5'>
      <div className='bg-red-400 mb-2 py-2 px-4 flex justify-between rounded'>
        <h2 className='text-lg text-black font-bold w-1/5'>Employee Name</h2>
        <h3 className='text-lg text-black font-bold w-1/5'>New Task</h3>
        <h5 className='text-lg text-black font-bold w-1/5'>Active Task</h5>
        <h5 className='text-lg text-black font-bold w-1/5'>Completed</h5>
        <h5 className='text-lg text-black font-bold w-1/5'>Failed</h5>
      </div>
      <div>
        {allEmployees && allEmployees.length > 0 ? (
          allEmployees.map((elem, idx) => (
            <div key={idx} className='border-2 border-emerald-500 mb-2 py-2 px-4 flex justify-between rounded'>
              <button onClick={() => {
                navigate('/employee-info', { state: { data: elem } });
              }} className='text-lg flex items-start cursor-pointer capitalize font-gilroy font-light w-1/5'>{elem.username}</button>
              <h3 className='text-lg font-gilroy font-medium w-1/5 text-blue-400'>{elem.taskCount[0]?.newTask || 0}</h3>
              <h5 className='text-lg font-gilroy font-medium w-1/5 text-yellow-400'>{elem.taskCount[0]?.active || 0}</h5>
              <h5 className='text-lg font-gilroy font-medium w-1/5 text-white'>{elem.taskCount[0]?.completed || 0}</h5>
              <h5 className='text-lg font-gilroy font-medium w-1/5 text-red-600'>{elem.taskCount[0]?.failed || 0}</h5>
            </div>
          ))
        ) : (
          <p className='text-gray-400'>No employees found.</p>
        )}
      </div>
    </div>
  );
};

export default AllTask;
