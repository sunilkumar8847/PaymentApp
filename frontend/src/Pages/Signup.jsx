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
    <div className='bg-slate-300 h-screen flex justify-center'>
      <div className='flex flex-col justify-center drop-shadow-2xl'>
        <div className='bg-white w-86 text-center p-2 h-max px-8 rounded-lg flex flex-col gap-1'>
          <Heading lebel={"Sign Up"} />
          <Subheading lebel={"Enter Your information to create an account"} />
          <InputBox lebel={"First Name"} placeholder={"Sunil Kumar"} onChange={(e) => setFirstName(e.target.value)} />
          <InputBox lebel={"Last Name"} placeholder={"Sahoo"} onChange={(e) => setLastName(e.target.value)} />
          <InputBox lebel={"Email"} placeholder={"sonu@gmail.com"} onChange={(e) => setUsername(e.target.value)} />
          <InputBox lebel={"Password"} placeholder={""} onChange={(e) => setPassword(e.target.value)} />
          <Button lebel={"Sign Up"} onClick={async () => {
            const response = await axios.post(`http://localhost:3000/api/v1/user/signup`,{
            // const response = await axios.post("https://payment-app-backend-gules.vercel.app/api/v1/user/signup", {
              firstName, //firstName: firstName
              lastName,
              username,
              password
            });
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
          }

          } />
          <ButtomWarning lebel={"Alredy registered? "} buttonText={"Login >"} to={"/signin"} />
        </div>
      </div>
    </div>
  )
}
