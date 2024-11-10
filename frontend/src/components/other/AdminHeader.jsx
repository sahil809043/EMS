import React, { useState } from 'react'

const AdminHeader = (props) => {

    const logOutUser = () => {
        props.changeUser('')
        localStorage.removeItem('adminId');
    }


    return (
        <div className="flex items-center justify-between p-6 bg-[#1e1e2f] rounded-lg shadow-lg text-white">
            <div className="text-animation">
                <h1 className="text-2xl font-light opacity-75 mb-1 animate-fadeIn">Welcome</h1>
                <h2 className="text-4xl font-bold text-blue-400 animate-slideIn">
                    Admin 👋
                </h2>
            </div>
            <button
                onClick={logOutUser}
                className="bg-red-600 hover:bg-red-500 transition duration-200 ease-in-out text-base font-semibold text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105"
            >
                Log Out
            </button>
        </div>
    )
}

export default AdminHeader