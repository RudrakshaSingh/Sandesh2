import React from "react";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { resetUserState } from "../../Redux/Slices/UserAuth";

function AccessDenied() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin= () => {
        dispatch(resetUserState());
        navigate('/user/login');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-4xl font-bold mb-4 text-red-600">Access Denied</h1>
                <p className="mb-6 text-gray-600">You do not have permission to access this page.</p>
                <div className="space-y-4">
                    <Link 
                        to="/" 
                        className="block w-full text-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Go back to Home
                    </Link>
                    <button 
                        onClick={handleLogin}
                        className="block w-full text-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AccessDenied;