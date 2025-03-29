import React from 'react'
import { Link } from 'react-router-dom'

export default function ButtomWarning({label, lebel, buttonText, to}) {
  // Support both label and lebel for backward compatibility
  const textLabel = label || lebel;
  
  return (
    <div className='flex justify-center text-sm py-4 mt-2'>
      <div className="text-gray-600">{textLabel}</div>
      <Link className='text-purple-700 font-medium hover:text-purple-900 pl-1 transition-colors duration-200' to={to}>
        {buttonText}
      </Link>
    </div>
  )
}
