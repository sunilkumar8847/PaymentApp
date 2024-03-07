import React, { useState } from 'react'
import Heading from '../Components/Heading'
import Subheading from '../Components/Subheading'
import InputBox from '../Components/InputBox'
import Button from '../Components/Button'
import ButtomWarning from '../Components/ButtomWarning'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Signin() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (

        <div className='bg-slate-300 h-screen flex justify-center '>
            <div className='flex flex-col justify-center drop-shadow-2xl'>
                <div className='bg-white w-82 text-center p-2 h-max px-8 rounded-lg flex flex-col gap-2'>
                    <Heading lebel={"Sign In"} />
                    <Subheading lebel={"Enter your credentials to access your account"} />
                    <InputBox lebel={"Email"} placeholder={"sonu@gmail.com"} onChange={(e)=>setUsername(e.target.value)} />
                    <InputBox lebel={"Password"} placeholder={""} onChange={(e)=> setPassword(e.target.value)} />
                    <Button lebel={"Login"} onClick={async() => {
                        // const response = await axios.post(`${window.location.origin}/api/v1/user/signin`, {
                        const response = await axios.post("https://payment-app-backend-gules.vercel.app/api/v1/user/signin", {
                            username,
                            password
                        });
                        localStorage.setItem("token",response.data.token);
                        
                        navigate("/dashboard");
                    }} />
                    <ButtomWarning lebel={"Don't have an account? "} buttonText={"Sign Up >"} to={"/signup"} />
                </div>
            </div>
        </div>
    )
}
