import React from 'react';
import Button from '../Components/Button';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500 px-4 py-8">
            <div className="text-center bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
                    Welcome to <span className="text-purple-700">PayPlus</span>
                </h1>
                <p className="text-gray-600 mb-10 text-lg md:text-xl">
                    Your secure and reliable payment solution.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Button onClick={() => navigate("/signup")} label={"Sign Up"} className="w-full sm:w-auto px-8 py-3 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition duration-300" />
                    <Button onClick={() => navigate("/signin")} label={"Sign In"} className="w-full sm:w-auto px-8 py-3 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition duration-300" />
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
