import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { verifyEmail } from "../api/auth.js"

function OTP() {
    const navigate = useNavigate()

    const [otp, setOtp] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const data = await verifyEmail(otp)

            if (data?.success) {
                navigate("/login")
            }
        } catch (error) {
            console.error("ERROR:", error)
        }
    }

    return (
        <div className='w-screen h-screen flex justify-center items-center bg-gray-900'>
            <div className='w-100 h-100 flex flex-col justify-between items-center rounded-2xl p-4 bg-gray-600 border-2 text-white shadow-[6px_6px_0px_1px_#ffffff]'>

                <h2 className='text-4xl font-bold mt-4'>Email Verification</h2>

                <form onSubmit={handleSubmit} className='flex p-4 gap-6 justify-center w-full h-full flex-col items-center'>

                    <input
                        className='text-white border p-2 rounded-lg w-full text-center tracking-widest text-xl'
                        type="text"
                        placeholder='Enter your OTP'
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        required
                    />

                    <button
                        className='bg-blue-600 cursor-pointer active:scale-60 shadow-[6px_6px_0px_1px_#000000] py-2 px-8 rounded-lg transition-all font-semibold uppercase'
                        type='submit'
                    >
                        Verify
                    </button>
                </form>
            </div>
        </div>
    )
}

export default OTP