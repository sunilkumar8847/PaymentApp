import React from 'react'

export default function InputBox({ label, lebel, placeholder, onChange, type = "text" }) {
  // Support both label and lebel for backward compatibility
  const textLabel = label || lebel;
  
  return (
    <div className="mb-3">
      <div className='text-sm font-medium text-left py-2 text-gray-700'>{textLabel}</div>
      <input 
        type={type}
        placeholder={placeholder} 
        onChange={onChange} 
        className='w-full px-3 py-2.5 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200'
      />
    </div>
  )
}
