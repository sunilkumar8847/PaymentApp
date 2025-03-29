import React, { useState, useEffect } from 'react';
import { apiClient, endpoints } from '../Api/apiClient';

const SendMoneyModal = ({ isOpen, onClose, recipient }) => {
  const [amount, setAmount] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleCloseWithAnimation = (wasSuccessful) => {
    setIsVisible(false);
    setTimeout(() => onClose(wasSuccessful), 300);
  };

  if (!isOpen) return null;

  const handleSendMoney = async () => {
    if (!amount || amount <= 0) {
      setErrorMsg('Please enter a valid amount');
      setTimeout(() => setErrorMsg(''), 3000);
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiClient.post(
        endpoints.transfer, 
        {
          to: recipient.id.trim(),
          amount: Number(amount)
        }
      );

      setSuccessMsg("Transaction Successful!");
      setAmount('');
      
      setTimeout(() => {
        handleCloseWithAnimation(true);
      }, 1500);
    } catch (error) {
      console.error("Transaction error:", error);
      setErrorMsg(error.response?.data?.msg || "Transaction Failed. Please try again.");
      setTimeout(() => setErrorMsg(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className={`fixed inset-0 bg-black transition-opacity duration-300 flex items-center justify-center z-50 ${
        isVisible ? 'bg-opacity-50' : 'bg-opacity-0'
      }`}
      onClick={() => !isLoading && handleCloseWithAnimation(false)}
    >
      <div 
        className={`bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative transition-all duration-300 ${
          isVisible ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={() => !isLoading && handleCloseWithAnimation(false)} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          title="Close"
          disabled={isLoading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Send Money</h2>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center shadow-sm border border-purple-200">
            <span className="text-xl font-bold text-purple-700">
              {recipient.name ? recipient.name[0].toUpperCase() : "?"}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800">{recipient.name}</h3>
            <p className="text-sm text-gray-500">ID: {recipient.id?.substring(0, 8)}...</p>
          </div>
        </div>

        <div className="mb-6">
          <label 
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Amount (in ₹)
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount to send"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            disabled={isLoading}
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => !isLoading && handleCloseWithAnimation(false)} 
            className={`flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium transition-colors duration-200 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'
            }`}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSendMoney}
            disabled={isLoading}
            className={`flex-1 px-4 py-3 rounded-lg font-medium text-white transition-all duration-200 
              ${isLoading ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-700 hover:bg-purple-800 cursor-pointer'}`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing
              </span>
            ) : "Send Money"}
          </button>
        </div>

        {successMsg && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg flex items-center gap-2 animate-fadeIn">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {successMsg}
          </div>
        )}

        {errorMsg && (
          <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-lg flex items-center gap-2 animate-fadeIn">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {errorMsg}
          </div>
        )}
      </div>
    </div>
  );
};

export default SendMoneyModal; 