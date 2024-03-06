import React from 'react'

export default function InputBox({lebel, placeholder, onChange}) {
  return (
    <div>
        <div className='text-sm font-medium text-left py-2'>{lebel} </div>
        <input placeholder={placeholder} onChange={onChange} className='w-full px-2 py-1 border rounded border-slate-200'/>
    </div>
  )
}
