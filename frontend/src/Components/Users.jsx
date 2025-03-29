import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SendMoneyModal from './SendMoneyModal'
import { apiClient, endpoints } from '../Api/apiClient'

export const Users = ({ onTransactionSuccess }) => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        apiClient.get(`${endpoints.searchUsers}?filter=${filter}`)
            .then(response => {
                setUsers(response.data.user)
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            });
    }, [filter])

    const handleOpenModal = (user) => {
        setSelectedUser({
            id: user._id,
            name: user.firstName
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = (wasSuccessful) => {
        setIsModalOpen(false);
        setSelectedUser(null);
        
        if (wasSuccessful && onTransactionSuccess) {
            onTransactionSuccess();
        }
    };

    return (
        <div className='mx-4 mb-20'>
            <div className='font-bold text-xl mt-8 mb-4 text-gray-800'>
                Users
            </div>
            <div className='my-3'>
                <input 
                    type="text" 
                    placeholder='Search users...' 
                    onChange={(e) => {
                        setFilter(e.target.value)
                    }} 
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200'
                />
            </div>
            <div className='mt-6 space-y-4'>
                {users.map(user => (
                    <User 
                        key={user._id} 
                        user={user} 
                        onSendMoney={() => handleOpenModal(user)} 
                    />
                ))}
            </div>

            {isModalOpen && selectedUser && (
                <SendMoneyModal 
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    recipient={selectedUser}
                />
            )}
        </div>
    )
}

const User = ({ user, onSendMoney }) => {
    return (
        <div className='flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 border border-gray-100 shadow-sm'>
            <div className='flex gap-3 items-center'>
                <div className='h-12 w-12 rounded-full bg-purple-100 flex justify-center items-center text-xl font-bold text-purple-700 border border-purple-200'>
                    {user.firstName[0]}
                </div>
                <div className=''>
                    <div className='font-medium text-gray-800'>{user.firstName} {user.lastName}</div>
                    <div className='text-sm text-gray-500'>User ID: {user._id.substring(0, 8)}...</div>
                </div>
            </div>
            <div>
                <button 
                    onClick={onSendMoney}
                    title="Send money to this user"
                    className='bg-purple-700 hover:bg-purple-800 text-white p-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

