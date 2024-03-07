import React from 'react';
import Button from '../Components/Button';
import { useNavigate } from 'react-router-dom';


const LandingPage = () => {
    const navigate = useNavigate();


    return (
        <div className="container mx-auto px-4 py-8 bg-purple-200">
            <h1 className="text-3xl font-bold text-center mb-8">Welcome to <b className='text-purple-700'>PayPulse</b></h1>
            <div className="flex justify-center gap-40 mx-80 px-40">

                <Button lebel={"Signup"} onClick={() => { navigate("/signup") }} className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4' />
                <Button lebel={"Signin"} onClick={() => { navigate("/signin") }} className='bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded' />
            </div>
        </div>
    );
}

export default LandingPage;
