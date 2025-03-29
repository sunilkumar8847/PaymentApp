import React, { useState, useEffect } from 'react';
import { apiClient, endpoints } from '../Api/apiClient';

const TransactionHistoryModal = ({ isOpen, onClose }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
      fetchTransactions();
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleCloseWithAnimation = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  const fetchTransactions = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await apiClient.get(endpoints.getTransactions);
      
      setTransactions(response.data.transactions || []);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError('Failed to load transaction history. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black transition-opacity duration-300 flex items-center justify-center z-50 ${
        isVisible ? 'bg-opacity-50' : 'bg-opacity-0'
      }`}
      onClick={handleCloseWithAnimation}
    >
      <div 
        className={`bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 relative transition-all duration-300 max-h-[80vh] overflow-hidden ${
          isVisible ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={handleCloseWithAnimation} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          title="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Transaction History</h2>
          <p className="text-sm text-gray-500 mt-1">Your recent payment activities</p>
        </div>

        <div className="overflow-y-auto max-h-[calc(80vh-140px)]">
          {loading ? (
            <div className="py-20 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-700"></div>
            </div>
          ) : error ? (
            <div className="py-16 text-center">
              <div className="text-red-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-700">{error}</p>
              <button 
                className="mt-4 px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  fetchTransactions();
                }}
              >
                Try Again
              </button>
            </div>
          ) : transactions.length === 0 ? (
            <div className="py-16 text-center">
              <div className="text-gray-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <p className="text-gray-700">No transactions found</p>
              <p className="text-gray-500 text-sm mt-2">You haven't made any transactions yet</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="py-4 px-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${transaction.isOutgoing ? 'bg-red-100' : 'bg-green-100'}`}>
                        {transaction.isOutgoing ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {transaction.isOutgoing ? 'Paid to ' : 'Received from '}
                          <span className="font-semibold">
                            {transaction.otherUser.firstName} {transaction.otherUser.lastName}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500">{formatDate(transaction.timestamp)}</p>
                      </div>
                    </div>
                    <div className={`font-bold ${transaction.isOutgoing ? 'text-red-600' : 'text-green-600'}`}>
                      {transaction.isOutgoing ? '-' : '+'} ₹{transaction.amount.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistoryModal; 