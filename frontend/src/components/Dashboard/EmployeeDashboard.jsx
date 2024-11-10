import React from 'react'
import EmployeeHeader from '../other/EmployeeHeader'
import TaskListNumbers from '../other/TaskListNumbers'
import TaskList from '../TaskList/TaskList'

const EmployeeDashboard = (props) => {

  return (
    <div className='p-10 bg-[#1C1C1C] h-screen'>
        
        <EmployeeHeader changeUser={props.changeUser} data={props.data}/>
        <TaskListNumbers />
        <TaskList data={props.data} />
    </div>
  )
}

export default EmployeeDashboard