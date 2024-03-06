import React from 'react'
import { Link } from 'react-router-dom'

export default function ButtomWarning({lebel, buttonText, to}) {
  return (
    <div className='flex justify-center text-sm py-2'>
        <div>{lebel} </div>
        <Link className='underline pl-1' to={to} >{buttonText} </Link>
    </div>
  )
}
