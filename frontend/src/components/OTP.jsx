import React from 'react'

function OTP() {
    return (
        <>
            <div className='w-screen h-screen flex justify-center items-center bg-gray-900'>
                <div className='w-100 h-100 flex justify-between items-center flex-col rounded-2xl p-4 bg-gray-600 border-2 text-white shadow-[6px_6px_0px_1px_#ffffff]'>
                    <h2 className='text-4xl font-bold mt-4'>Email Verification</h2>
                    <form action="#" method='POST' className='flex p-4 gap-6 justify-center w-full h-full flex-col items-center'>
                        <input className='text-white border p-2 rounded-lg w-full' type="otp" placeholder='Enter your OTP' required />
                        <button className='bg-blue-600 cursor-pointer active:scale-60 shadow-[6px_6px_0px_1px_#000000] py-2 px-8 rounded-lg transition-all font-semibold uppercase' type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default OTP