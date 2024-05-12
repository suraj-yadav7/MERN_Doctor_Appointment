import { current } from '@reduxjs/toolkit'
import React from 'react'

const Pagination = ({currentPage,dataLen,itemsPerPage,onPageChange})=>{

    let totalPages =  Math.ceil(dataLen/itemsPerPage)

    function prevPageHandle(){
        onPageChange(currentPage-1)
    }

    function nextPageHandle(){
        onPageChange(currentPage+1)
    }

    return(
        <>
            <div className=' flex justify-center items-center mt-4 '>
            <div className='relative bottom-1 left-0 w-full text-center text-2xl phone:text-xl sm:text-1.5xl'>
                <button onClick={prevPageHandle} disabled={currentPage===1} className='mx-2  text-white border border-red-300 px-2 rounded-lg bg-green-500 hover:bg-green-300 disabled:bg-gray-400 disabled:cursor-not-allowed'>Prev</button>
                <spam>{currentPage} of {totalPages}</spam>
                <button  onClick={nextPageHandle} disabled={currentPage===totalPages} className='mx-2  text-white border border-red-300 px-2 rounded-lg bg-green-500 hover:bg-green-300 disabled:bg-gray-400 disabled:cursor-not-allowed'>Next</button>
            </div>
            </div>
        </>
    )
}

export default Pagination;