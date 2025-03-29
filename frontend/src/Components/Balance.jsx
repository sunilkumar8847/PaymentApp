import React from 'react'

export default function Balance({value}) {
  const formattedBalance = value.toFixed(2);
  
  return (
    <div className='bg-white rounded-xl shadow-md p-6 border border-purple-100 mb-6 hover:shadow-lg transition-all duration-300'>
      <div className='text-gray-600 text-sm mb-1 flex justify-between'>
        <span>Your Balance</span>
        <span title="Last updated just now" className="text-xs flex items-center gap-1 text-purple-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Updated
        </span>
      </div>
      <div className='flex items-baseline'>
        <span className='text-3xl font-bold text-gray-800'>₹</span>
        <span className='text-3xl font-bold ml-1 text-purple-700' title="Current account balance">{formattedBalance}</span>
      </div>
      <div className='mt-4 flex justify-between items-center'>
        <div className='text-xs text-gray-500'>Available funds</div>
        <div className='bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full' title="Your account is active and in good standing">
          <span className='font-medium flex items-center gap-1'>
            <span className="h-1.5 w-1.5 bg-purple-700 rounded-full"></span>
            Active
          </span>
        </div>
      </div>
    </div>
  )
}