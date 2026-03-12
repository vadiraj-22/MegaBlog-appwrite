import React, { useId } from 'react'

const Select = React.forwardRef(function Select({
    options,
    label,
    className = "",
    ...props
}, ref){
    const id = useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className='inline-block mb-2 text-sm font-medium text-gray-700'>{label}</label>}
        <select 
            {...props} 
            id={id}
            ref={ref}
            className={`px-4 py-3 rounded-lg bg-white text-black outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent duration-200 border border-gray-300 w-full ${className}`}
        >
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
            ))}
        </select>
    </div>
  )
})

export default Select