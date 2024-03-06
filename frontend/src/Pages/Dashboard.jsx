import React from 'react'
import { AppBar } from '../Components/AppBar'
import Balance from '../Components/Balance'
import { Users } from '../Components/Users'

export const Dashboard = () => {
    return (
        <div>
            <AppBar />
            <div className='mt-6 mx-4'>
                <Balance value={"12,000"}/>
            </div>
            <Users />
        </div>
    )
}
