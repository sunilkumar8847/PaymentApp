import React from 'react';
import Button from '../Components/Button';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto px-4 py-4 bg-purple-200 py-48 sm:py-60">
            <h1 className="text-3xl font-bold text-center mb-8">Welcome to <b className='text-purple-700'>PayPluse</b></h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center mt-32">
                <Button onClick={() => navigate("/signup")} lebel={"SignUp"} />
                <Button onClick={() => navigate("/signin")} lebel={"SignIn"} />
            </div>
        </div>
    );
}

export default LandingPage;
