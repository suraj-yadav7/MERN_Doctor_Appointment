import React from "react";

const Button = ({
    children,
    type='button',
    className='',
    bgColor="bg-blue-500",
    textColor="text-white",
    ...props
})=>{
    return <button type={type} className={`px-4 py-2 border border-gray-400 rounded-lg hover:bg-blue-400 ${bgColor} ${textColor} ${className}`} {...props}>{children}</button>
};

export default Button;