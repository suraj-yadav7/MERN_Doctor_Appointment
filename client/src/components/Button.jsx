import React from "react";

const Button = ({
    children,
    type='button',
    className='',
    textColor="text-white",
    ...props
})=>{
    return <button type={type} className={`px-4 py-2 border border-gray-400 rounded-lg  ${textColor} ${className}`} {...props}>{children}</button>
};

export default Button;