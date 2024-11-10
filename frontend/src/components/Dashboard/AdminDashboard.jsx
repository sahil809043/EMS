import React from 'react'
import AdminHeader from '../other/AdminHeader'
import CreateTask from '../other/CreateTask'
import AllTask from '../other/AllTask'

const AdminDashboard = (props) => {

    return (
        <div className='h-screen w-full p-7'>
            <AdminHeader changeUser={props.changeUser} data={props.data} />
            <CreateTask />
            <AllTask allEmployees={props.allEmployees} />
        </div>
    )
}

export default AdminDashboard