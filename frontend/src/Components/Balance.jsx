import React from 'react'

export default function Balance({value}) {
  const formattedBalance = value.toFixed(2);
  return (
    <div className='flex gap-4 '>
        <div className='font-bold text-lg'>
            Your Balance
        </div>
        <div className='font-semibold text-lg flex gap-1'>
            Rs <div className='text-money-blue'>{formattedBalance}</div>
        </div>
    </div>
  )
}