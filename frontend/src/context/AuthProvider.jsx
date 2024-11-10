import React, { createContext, useEffect, useState, useCallback } from 'react'
import { postRequest, getRequest, baseUrl } from '../utils/Services'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null)


    const [userId, setUserId] = useState(() => {
        const userFromStorage = localStorage.getItem('userId');
        return userFromStorage || null;
    });

    const [currentUser, setCurrentUser] = useState({});
    const [registered, setRegistered] = useState(false);
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const [adminLoginError, setAdminLoginError] = useState(null);
    const [isAdminLoginLoading, setIsAdminLoginLoading] = useState(false);
    const [adminLoginInfo, setAdminLoginInfo] = useState({
        email: '',
        password: ''
    });

    const [employeeId, setEmployeeId] = useState(() => {
        const employeeFromStorage = localStorage.getItem('employeeId');
        return employeeFromStorage || null;
    })

    const [adminId, setAdminId] = useState(() => {
        const adminFromStorage = localStorage.getItem('adminId');
        return adminFromStorage || null;
    })


    // register user
    const registerUser = useCallback(async (e) => {
        console.log('listening on register')
        e.preventDefault();
        setIsRegisterLoading(true);
        setRegisterError(null);

        try {
            const response = await postRequest(
                `${baseUrl}/employee/register`,
                JSON.stringify(registerInfo)
            );
            console.log("Response > ", response);

            setIsRegisterLoading(false);

            if (response.error) {
                setRegisterError({ error: true, message: response.error });
            } else {
                setRegistered(true);
                window.location.reload();
            }
        } catch (error) {
            console.error(error)
            setIsRegisterLoading(false);
            setRegisterError({ error: true, message: `Server Error` });
        }
    }, [registerInfo]);
    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);


    //login user
    const loginUser = useCallback(async (e) => {
        e.preventDefault();
        setIsLoginLoading(true);
        setLoginError(null);

        try {
            const response = await postRequest(
                `${baseUrl}/employee/login`,
                JSON.stringify(loginInfo)
            );

            setIsLoginLoading(false);

            if (response.error) {
                setLoginError({ error: true, message: response.error });
            } else {
                localStorage.setItem('employeeId', response.Employee._id);
                setUserId(response.user._id);
                window.location.reload();
            }
        } catch (error) {
            setIsLoginLoading(false);
            setLoginError({ error: true, message: `server error` });
        }
    }, [loginInfo]);
    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    }, []);

    //admin login
    const loginAdmin = useCallback(async (e) => {
        e.preventDefault();
        setIsAdminLoginLoading(true);
        setAdminLoginError(null);

        try {
            const response = await postRequest(
                `${baseUrl}/admin/login`,
                JSON.stringify(adminLoginInfo)
            );
            setIsAdminLoginLoading(false);
            console.log("Response > ", response);
            if (response.error) {
                setAdminLoginError({ error: true, message: response.error });
            } else {
                localStorage.setItem('adminId', '#admin9000');
            }

        } catch (error) {
            setIsAdminLoginLoading(false);
            setAdminLoginError({ error: true, message: `server error` });
        }
    });
    const updateAdminLoginInfo = useCallback((info) => {
        setAdminLoginInfo(info);
    }, []);


    //get current employee
    const getUser = useCallback(async () => {
        if (employeeId) {
            try {
                const response = await getRequest(`${baseUrl}/employee/find${employeeId}`);
                if (response.error) {
                    console.log(response.error);
                } else {
                    setCurrentUser(response);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    }, [employeeId]);
    useEffect(() => {
        if (employeeId) {
            getUser();
        }
    }, [employeeId, getUser]);


    //get all the employees
    const getAllEmployees = useCallback(async () => {
        try {
            const response = await getRequest(`${baseUrl}/employee/employees`);
            if (response.error) {
                console.log(response.error);
            } else {
                setUserData(response);
            }
        } catch (error) {
            // console.log(error.message);
        }
    }, []);
    useEffect(() => {
        getAllEmployees();
    }, [getAllEmployees]);


    //accept tasks
    const acceptTask = useCallback(async (taskId) => {
        try {
            const response = await postRequest(`${baseUrl}/employee/acceptTask`, JSON.stringify({ employeeId, taskId }));
            if (response.error) {
                console.log(response.error);
            } else {
                console.log('Task accepted');
            }
            window.location.reload()
        } catch (error) {
            console.log(error.message);
        }
    }, [employeeId]);


    //complete tasks
    const completeTask = useCallback(async (taskId) => {
        try {
            const response = await postRequest(`${baseUrl}/employee/completedTask`, JSON.stringify({ employeeId, taskId }));
            if (response.error) {
                console.log(response.error);
            } else {
                console.log('Task completed');
            }
            window.location.reload()
        } catch (error) {
            console.log(error.message);
        }
    }, [employeeId]);


    //fail tasks
    const failTask = useCallback(async (taskId) => {
        try {
            const response = await postRequest(`${baseUrl}/employee/failedTask`, JSON.stringify({ employeeId, taskId }));
            if (response.error) {
                console.log(response.error);
            } else {
                console.log('Task failed');
            }
            window.location.reload()
        } catch (error) {
            console.log(error.message);
        }
    }, [employeeId]);



    return (
        <div>
            <AuthContext.Provider value={{
                registerError,
                registerInfo,
                updateRegisterInfo,
                isRegisterLoading,
                registerUser,
                loginUser,
                loginError,
                isLoginLoading,
                loginInfo,
                updateLoginInfo,
                loginAdmin,
                adminLoginError,
                isAdminLoginLoading,
                adminLoginInfo,
                updateAdminLoginInfo,
                adminId,
                userId,
                userData,
                currentUser,
                employeeId,
                acceptTask,
                completeTask,
                failTask,
            }}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}

export default AuthProvider