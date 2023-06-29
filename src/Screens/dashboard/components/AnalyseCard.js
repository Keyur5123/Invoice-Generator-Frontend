import React from 'react'

function index({ header, amount, trend, icon }) {
    return (
        <div className='px-5 py-5 font-sans bg-white rounded-lg'>
            <div className='flex justify-between text-center items-center'>
                <div className='text-left'>
                    <span className='text-lg font-bold text-gray-600'>{header}</span>
                    <div className='flex'>
                        <span className='text-orange-400 font-bold text-2xl mr-2'>{amount}</span>
                        <span className='text-green-500 text-sm font-bold flex items-end mb-1'>{trend}</span>
                    </div>
                </div>
                <div className='flex px-4 h-12 items-center bg-gradient-to-r from-violet-500 to-fuchsia-500'>
                    {icon}
                </div>
            </div>
        </div>
    )
}

export default index