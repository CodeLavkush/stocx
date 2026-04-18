import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from "../api/auth.js"

function Login() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.type === "email" ? "email" : "password"]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const data = await login(formData)

            if (data?.success) {
                navigate("/dashboard")
            }
        } catch (error) {
            console.error("ERROR: ", error)
        }
    }

    return (
        <div className='w-screen h-screen flex justify-center items-center bg-linear-to-r from-slate-900 to-slate-700'>
            <div className='w-100 h-100 flex flex-col justify-between items-center rounded-2xl p-4 bg-linear-to-r from-stone-500 to-stone-700 border-2 text-white shadow-[6px_6px_0px_1px_#ffffff]'>
                <h2 className='text-4xl font-bold mt-4 p-2'>Login</h2>

                <form onSubmit={handleSubmit} className='flex p-4 gap-6 justify-center w-full h-full flex-col items-center'>
                    <input
                        className='text-white border p-2 rounded-lg w-full'
                        type="email"
                        placeholder='Enter your email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        className='text-white border p-2 rounded-lg w-full'
                        type="password"
                        placeholder='Enter your password'
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button
                        className='bg-linear-to-r from-violet-200 to-pink-200 cursor-pointer text-black active:scale-60 shadow-[6px_6px_0px_1px_#000000] py-2 px-8 rounded-lg transition-all font-semibold uppercase'
                        type='submit'
                    >
                        Submit
                    </button>
                </form>

                <p className='text-md'>
                    Create an account. <Link className='text-purple-400' to="/register">Register</Link>
                </p>
            </div>
        </div>
    )
}

export default Login