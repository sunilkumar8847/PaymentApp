import React from 'react';
import Button from '../Components/Button';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-100 via-white to-purple-50">
            {/* Navigation Bar */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-1 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2 text-purple-700" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                            </svg>
                            <span className="text-2xl font-bold text-purple-700">PayPlus</span>
                        </div>
                        <div className="hidden md:flex space-x-4">
                            <button className="text-gray-700 hover:text-purple-700 px-3 py-2 transition-colors duration-200">Features</button>
                            <button className="text-gray-700 hover:text-purple-700 px-3 py-2 transition-colors duration-200">About</button>
                            <button className="text-gray-700 hover:text-purple-700 px-3 py-2 transition-colors duration-200">Contact</button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 mb-10 md:mb-0 animate-fadeIn">
                        <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full mb-4 inline-block">Secure Payments</span>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Welcome to <span className="text-purple-700">PayPlus</span></h1>
                        <p className="text-lg text-gray-700 mb-8 leading-relaxed">The secure and convenient way to manage your payments and transactions in one place. Experience the future of digital payments.</p>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <Button 
                                onClick={() => navigate("/signup")} 
                                label="Get Started" 
                                className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-4 min-h-[52px] rounded-lg shadow-lg hover:shadow-xl font-medium text-base transform transition-all duration-200 hover:-translate-y-1 w-full sm:w-auto"
                            />
                            <Button 
                                onClick={() => navigate("/signin")} 
                                label="Sign In" 
                                className="border-2 border-purple-700 text-purple-700 hover:bg-purple-50 px-8 py-4 min-h-[52px] rounded-lg shadow-md font-medium text-base transform transition-all duration-200 hover:-translate-y-1 w-full sm:w-auto"
                            />
                        </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center animate-slideIn">
                        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-purple-100 transform transition-all duration-200 hover:shadow-2xl">
                            <div className="flex justify-center mb-6">
                                <div className="h-20 w-20 bg-purple-100 rounded-full flex items-center justify-center shadow-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-2xl font-semibold text-center mb-6">Instant Payment Solutions</h3>
                            <ul className="space-y-4">
                                <li className="flex items-center bg-gray-50 p-3 rounded-lg shadow-sm hover:bg-gray-100 transition-all duration-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-700 font-medium">Fast and secure transactions</span>
                                </li>
                                <li className="flex items-center bg-gray-50 p-3 rounded-lg shadow-sm hover:bg-gray-100 transition-all duration-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-700 font-medium">Low transaction fees</span>
                                </li>
                                <li className="flex items-center bg-gray-50 p-3 rounded-lg shadow-sm hover:bg-gray-100 transition-all duration-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-700 font-medium">Smart payment tracking</span>
                                </li>
                            </ul>
                            <div className="mt-8 text-center">
                                <span className="text-purple-700 text-sm font-medium">✨ Trusted by thousands of users worldwide</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add custom classes to enable animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideIn {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-fadeIn {
                    animation: fadeIn 1s ease-out;
                }
                .animate-slideIn {
                    animation: slideIn 1s ease-out;
                }
            `}</style>
        </div>
    );
}

export default LandingPage;
