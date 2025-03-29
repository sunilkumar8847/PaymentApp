import React, { useEffect, useState, useCallback } from 'react'
import { AppBar } from '../Components/AppBar'
import Balance from '../Components/Balance'
import { Users } from '../Components/Users'
import TransactionHistoryModal from '../Components/TransactionHistoryModal'
import { apiClient, endpoints } from '../Api/apiClient'

export const Dashboard = () => {
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

    const fetchBalance = useCallback(async () => {
        try {
            setLoading(true);
            const response = await apiClient.get(endpoints.getBalance);
            setBalance(response.data.balance);
            return true;
        } catch (error) {
            console.error('Error fetching balance:', error);
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchUserData = useCallback(async () => {
        try {
            const userResponse = await apiClient.get(endpoints.getUser);
            if (userResponse.data && userResponse.data.firstName) {
                setUsername(userResponse.data.firstName);
            }
        } catch (error) {
            console.log("User endpoint not available");
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await fetchBalance();
            await fetchUserData();
        };

        fetchData();
    }, [fetchBalance, fetchUserData]);

    const handleTransactionSuccess = useCallback(async () => {
        await fetchBalance();
    }, [fetchBalance]);

    const handleOpenHistoryModal = () => {
        setIsHistoryModalOpen(true);
    };

    const handleCloseHistoryModal = () => {
        setIsHistoryModalOpen(false);
    };

    return (
        <div className='min-h-screen bg-gray-50'>
            <AppBar />
            
            <div className='max-w-3xl mx-auto px-4 pt-6 pb-20'>
                {username && (
                    <div className="text-sm text-gray-600 mb-1 ml-1">
                        <span className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                            Welcome back, {username}!
                        </span>
                    </div>
                )}
                
                {loading ? (
                    <div className='animate-pulse bg-white rounded-xl h-32 mb-6'></div>
                ) : (
                    <Balance value={balance} />
                )}
                
                <div className="flex justify-between items-center mb-2">
                    <div title="Quick actions" className="flex gap-2 mb-2">
                        <button 
                            className="bg-purple-50 hover:bg-purple-100 p-2 rounded-full text-purple-700 transition-colors duration-200" 
                            title="Transaction History"
                            onClick={handleOpenHistoryModal}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>
                    <div title="Need help?" className="text-sm text-purple-700 hover:text-purple-800 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
                
                <Users onTransactionSuccess={handleTransactionSuccess} />
            </div>
            
            <div className='fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 py-3 px-6 flex justify-between items-center'>
                <div className='text-purple-700 font-medium'>PayPlus</div>
                <div className='text-xs text-gray-500'>© 2024 All rights reserved</div>
            </div>

            <TransactionHistoryModal 
                isOpen={isHistoryModalOpen}
                onClose={handleCloseHistoryModal}
            />
        </div>
    );
};
