import React from 'react'
import { useId } from 'react'
const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props

},ref){
    const id = useId()
    return(
        <div className='w-full'>
            {label && 
            <label className='inline-block mb-2 text-sm font-medium text-gray-700' htmlFor={id}>
                {label}
            </label>}

            <input 
                type={type} 
                className={`px-4 py-3 rounded-lg bg-white text-black outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent duration-200 border border-gray-300 w-full ${className}`} 
                ref={ref}
                {...props} 
                id={id} 
            />
        </div>
    )
})

export default Input