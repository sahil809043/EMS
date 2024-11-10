import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

function Register() {
    const [rightPanelActive, setRightPanelActive] = useState(false);
    const [adminLogin, setAdminLogin] = useState(false);

    const handleSignUpClick = () => setRightPanelActive(true);
    const handleSignInClick = () => setRightPanelActive(false);
    const handleAdminLogin = () => setAdminLogin(true);
    const handleUserLogin = () => setAdminLogin(false);

    const {
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
    } = useContext(AuthContext);

    return (
        <>
            {adminLogin ? (
                <div className={`bg-[url('https://cdn.pixabay.com/photo/2016/06/02/02/38/mesh-1430108_1280.png')] bg-center bg-cover flex items-center justify-center min-h-screen`}>
                    <div className="absolute top-0 w-1/3 h-full flex justify-center items-center">
                        <form onSubmit={loginAdmin} className="flex flex-col w-full items-center text-center bg-[#20b2abc5] p-12">
                            <h1 className='text-3xl font-bold text-gray-800'>Hello👋,</h1>
                            <h1 className='text-3xl font-bold text-gray-800 mb-12'>Admin</h1>
                            <input type='email' placeholder='Admin email' onChange={(e) => updateAdminLoginInfo({ ...adminLoginInfo, email: e.target.value })} className="w-[300px] text-gray-900 p-3 mb-4 rounded-md bg-gray-200" />
                            <input type="password" placeholder="Admin Password" onChange={(e) => updateAdminLoginInfo({ ...adminLoginInfo, password: e.target.value })} className="w-[300px] text-gray-900 p-3 rounded-md bg-gray-200 mb-10" />
                            <button className="bg-[#f13453] text-white py-3 px-12 mb-7 rounded-full uppercase text-xs font-bold hover:bg-[lightcoral]">
                                Login In
                            </button>
                            <button onClick={handleUserLogin} className="text-gray-900 py-3 px-12 text-xs font-bold">
                                Go back to Employee Login
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className={`bg-[url('https://cdn.pixabay.com/photo/2016/06/02/02/38/mesh-1430108_1280.png')] bg-center bg-cover flex items-center justify-center min-h-screen ${rightPanelActive ? 'right-panel-active' : ''}`}>
                    <div
                        className={`relative flex justify-center items-center w-[768px] max-w-full min-h-[480px] rounded-lg shadow-2xl overflow-hidden transition-all duration-600 ${rightPanelActive ? 'transform translate-x-[0%]' : ''
                            }`}
                        id="container"
                    >
                        {/* Sign Up Container */}
                        <div
                            className={`absolute top-0 left-0 w-1/2 h-full flex justify-center items-center transition-all duration-600 ${rightPanelActive ? 'opacity-100 z-5 transform translate-x-full' : 'opacity-0 z-1'
                                }`}
                        >
                            <form onSubmit={registerUser} className="flex flex-col w-full items-center text-center bg-gradient-to-r from-[lightcoral] to-[#f0808068] p-12">
                                <h1 className="font-bold text-gray-800 mb-6 text-xl">Create Account</h1>
                                <span className="text-xs mb-6">Please enter your Credentials</span>
                                <input type="text" placeholder="Name" onChange={(e) => updateRegisterInfo({ ...registerInfo, username: e.target.value })} className="w-full text-gray-900 p-3 mb-4 rounded-md bg-gray-200" />
                                <input type="email" placeholder="Email" onChange={(e) => updateRegisterInfo({ ...registerInfo, email: e.target.value })} className="w-full text-gray-900 p-3 mb-4 rounded-md bg-gray-200" />
                                <input type="password" placeholder="Password" onChange={(e) => updateRegisterInfo({ ...registerInfo, password: e.target.value })} className="w-full text-gray-900 p-3 mb-6 rounded-md bg-gray-200" />
                                <input type="password" placeholder="Confirm Password" onChange={(e) => updateRegisterInfo({ ...registerInfo, confirmPassword: e.target.value })} className="w-full text-gray-900 p-3 mb-6 rounded-md bg-gray-200" />
                                <button className="bg-red-500 text-white py-3 px-12 rounded-full uppercase text-xs font-bold hover:bg-red-600">
                                    Sign Up
                                </button>
                                {registerError && (
                                    <div className="relative top-0 font-semibold text-nowrap mt-3 font-grotesk tracking-tighter text-center select-auto" role="alert">
                                            <p className='text-red-700 underline capitalize'>{registerError.message} 😞</p>
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Sign In Container */}
                        <div
                            className={`absolute top-0 left-0 w-1/2 h-full flex justify-center items-center transition-all duration-600 ${rightPanelActive ? 'opacity-0 z-1' : 'opacity-100 z-2'
                                }`}
                        >
                            <form onSubmit={loginUser} className="flex flex-col w-full items-center text-center bg-gradient-to-r from-[lightcoral] to-[#f0808068] p-12">
                                <h1 className="font-bold mb-6 text-gray-800 text-xl">Sign in</h1>
                                <span className="text-xs mb-6">Please enter your Credentials</span>
                                <input type="email" placeholder="Email" onChange={(e) => updateLoginInfo({ ...loginInfo, email: e.target.value })} className="w-full text-gray-900 p-3 mb-4 rounded-md bg-gray-100" />
                                <input type="password" placeholder="Password" onChange={(e) => updateLoginInfo({ ...loginInfo, password: e.target.value })} className="w-full text-gray-900 p-3 mb-6 rounded-md bg-gray-100" />
                                    {loginError && (
                                        <div className="relative top-0 font-semibold text-nowrap mb-3 font-grotesk tracking-tight text-center select-auto" role="alert">
                                            <p className='text-red-700 underline capitalize'>{loginError.message} 😞</p>
                                        </div>
                                    )}
                                <a href="#" className="text-gray-600 mb-6">Forgot your password?</a>
                                <button className="bg-red-500 text-white py-3 px-12 mb-7 rounded-full uppercase text-xs font-bold hover:bg-red-600">
                                    Sign In
                                </button>
                                <button onClick={handleAdminLogin} className="text-gray-900 py-3 px-12 text-xs font-bold">
                                    Admin? login Now
                                </button>
                            </form>
                        </div>

                        {/* Overlay Container */}
                        <div
                            className={`absolute top-0 left-1/2 w-1/2 h-full bg-[#621862] text-white flex items-center justify-center transition-transform duration-600 transform ${rightPanelActive ? '-translate-x-full' : 'translate-x-0'
                                }`}
                        >
                            <div className="flex flex-col items-center text-center p-10">
                                <h1 className="text-3xl font-bold">{rightPanelActive ? 'Welcome Back!' : 'Hello, User👋'}</h1>
                                <p className="text-sm font-light mb-5 mt-10">
                                    {rightPanelActive
                                        ? 'To keep connected with us please login with your personal info'
                                        : 'Enter your personal details and start your journey with us'}
                                </p>
                                <button
                                    className="border border-white py-2 px-8 rounded-full text-white uppercase text-xs font-bold"
                                    onClick={rightPanelActive ? handleSignInClick : handleSignUpClick}
                                >
                                    {rightPanelActive ? 'Sign In' : 'Sign Up'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Register;
