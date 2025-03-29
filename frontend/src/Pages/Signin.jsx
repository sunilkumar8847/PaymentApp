import React, { useState } from 'react'
import Heading from '../Components/Heading'
import Subheading from '../Components/Subheading'
import InputBox from '../Components/InputBox'
import Button from '../Components/Button'
import ButtomWarning from '../Components/ButtomWarning'
import { useNavigate } from 'react-router-dom'
import { apiClient, endpoints } from '../Api/apiClient'

export default function Signin() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className='min-h-screen bg-gradient-to-b from-purple-50 to-white flex justify-center items-center p-4'>
            <div className='w-full max-w-md'>
                <div className='bg-white rounded-xl shadow-xl p-8 border border-purple-100'>
                    <Heading label="Sign In" />
                    <Subheading label="Enter your credentials to access your account" />
                    
                    <div className="space-y-4 mt-2">
                        <InputBox label="Email" placeholder="sonu@gmail.com" onChange={(e) => setUsername(e.target.value)} />
                        <InputBox label="Password" type="password" placeholder="••••••••" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    
                    <div className="mt-6">
                        <Button 
                            label="Sign In" 
                            className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 min-h-[52px] rounded-lg shadow-md hover:shadow-lg font-medium text-base transition-all duration-200 w-full"
                            onClick={async() => {
                                try {
                                    const response = await apiClient.post(endpoints.signin, {
                                        username,
                                        password
                                    });
                                    localStorage.setItem("token", response.data.token);
                                    navigate("/dashboard");
                                } catch (error) {
                                    console.error("Sign in failed:", error);
                                    alert("Invalid email or password. Please try again.");
                                }
                            }} 
                        />
                    </div>
                    
                    <ButtomWarning label="Don't have an account?" buttonText="Sign Up >" to="/signup" />
                    
                    <div className="mt-6 text-center">
                        <div className="text-xs text-gray-500">
                            By signing in, you agree to our 
                            <span className="text-purple-700 cursor-pointer hover:underline"> Terms of Service</span> and 
                            <span className="text-purple-700 cursor-pointer hover:underline"> Privacy Policy</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
