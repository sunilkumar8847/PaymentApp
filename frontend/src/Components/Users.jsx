import React from 'react'
import { useState, useEffect } from 'react'
import Button from './Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Users = () => {
    const [users, setUsers] = useState([]);
    const[filter, setFilter] = useState("");

 //use debouncing
    useEffect(()=>{
        // axios.get("https://payment-app-backend-gules.vercel.app/api/v1/user/bulk?filter=" + filter)
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=` + filter)
        .then( response => {
            setUsers(response.data.user)
        })
    },[filter])

    return (
        <div className='mx-4'>
            <div className='font-bold text-lg mt-6'>
                Users
            </div>
            <div className='my-2'>
                <input type="text" placeholder='search users...' onChange={(e) => {
                    setFilter(e.target.value)
                    }} className='w-full px-2 py-2 border border-slate-300 rounded shadow-md'/>
            </div>
            <div>
                {users.map(user => <User key={user._id} user={user} />)}
            </div>
        </div>
    )
}

const User = ({ user }) => {
    const navigate = useNavigate();

    return (
        <div className='flex justify-between'>
            <div className='flex gap-2'>
                <div className='h-10 w-10 rounded-full bg-slate-200 flex justify-center text-xl font-bold pt-1'>
                    {user.firstName[0]}
                </div>
                <div className='pt-1.5 h-full'>
                    {user.firstName} {user.lastName}
                </div>
            </div>
            <div className='flex flex-col justify-center '>
                <Button onClick={(e) => {
                    navigate(`/send?id= ${user._id}&name= ${user.firstName}`)
                    // navigate("/send?id=" + user._id + "&name=" + user.firstName);
                }} lebel={'Send Money'} />
            </div>
        </div>
    )
}

