import React, { useEffect, useState } from 'react'
import { AppBar } from '../Components/AppBar'
import Balance from '../Components/Balance'
import { Users } from '../Components/Users'
import axios from 'axios'

export const Dashboard = () => {
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await axios.get(`${window.location.origin}/api/v1/account/balance`, {
                const response = await axios.get("https://payment-app-backend-gules.vercel.app/api/v1/account/balance", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                console.log("Response:", response);
                setBalance(response.data.balance);
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <AppBar />
            <div className='mt-6 mx-4'>
                <Balance value={balance}/>
            </div>
            <Users />
        </div>
    );
};
