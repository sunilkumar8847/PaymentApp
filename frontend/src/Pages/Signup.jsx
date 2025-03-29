import Heading from '../Components/Heading'
import Subheading from '../Components/Subheading'
import InputBox from '../Components/InputBox'
import Button from '../Components/Button'
import ButtomWarning from '../Components/ButtomWarning'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-gradient-to-b from-purple-50 to-white flex justify-center items-center p-4'>
      <div className='w-full max-w-md'>
        <div className='bg-white rounded-xl shadow-xl p-8 border border-purple-100'>
          <Heading label="Sign Up" />
          <Subheading label="Enter your information to create an account" />
          
          <div className="space-y-2">
            <InputBox label="First Name" placeholder="Sunil Kumar" onChange={(e) => setFirstName(e.target.value)} />
            <InputBox label="Last Name" placeholder="Sahoo" onChange={(e) => setLastName(e.target.value)} />
            <InputBox label="Email" placeholder="sonu@gmail.com" onChange={(e) => setUsername(e.target.value)} />
            <InputBox label="Password" type="password" placeholder="••••••••" onChange={(e) => setPassword(e.target.value)} />
          </div>
          
          <div className="mt-6">
            <Button 
              label="Create Account" 
              className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 min-h-[52px] rounded-lg shadow-md hover:shadow-lg font-medium text-base transition-all duration-200 w-full"
              onClick={async () => {
                try {
                  const response = await axios.post("https://payment-app-backend-inm40e2yg-sunil-kumars-projects-d4f37504.vercel.app/api/v1/user/signup", {
                    firstName,
                    lastName,
                    username,
                    password
                  });
                  localStorage.setItem("token", response.data.token);
                  navigate("/dashboard");
                } catch (error) {
                  console.error("Signup failed:", error);
                  alert("Signup failed. Please check your details and try again.");
                }
              }}
            />
          </div>
          
          <ButtomWarning label="Already registered?" buttonText="Login >" to="/signin" />
        </div>
      </div>
    </div>
  )
}
