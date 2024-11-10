import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Register from './components/other/Register';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import { AuthContext } from './context/AuthProvider';
import EmployeeInfo from './components/other/EmployeeInfo';

const App = () => {
  const [user, setUser] = useState(null);
  const { employeeId, adminId, userData, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = window.location.pathname;

    if (employeeId) {
      setUser('employee');
      if (currentPath !== '/employee-info') {
        navigate('/employee');
      }
    } else if (adminId) {
      setUser('admin');
      if (currentPath !== '/employee-info') {
        navigate('/admin');
      }
    } else {
      setUser(null);
    }
  }, [employeeId, adminId, navigate]);

  return (
    <>
      <Routes>
        {!user && <Route path="/" element={<Register />} />}

        {user === 'admin' && (
          <Route path="/admin" element={<AdminDashboard changeUser={setUser} data={currentUser} allEmployees={userData} />} />
        )}
        {user === 'employee' && (
          <Route path="/employee" element={<EmployeeDashboard changeUser={setUser} data={currentUser} />} />
        )}

        <Route path="/employee-info" element={<EmployeeInfo />} />
        <Route path="*" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
