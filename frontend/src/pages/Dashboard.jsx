import React, { useEffect, useState } from 'react'
import { getCurrentUser } from '../api/auth'

function Dashboard() {
    const [data, setData] = useState(null)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getCurrentUser()
                setData(res.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchUser()
    }, [])
    return (
        <div className='bg-gray-800 w-screen h-screen flex justify-center items-center text-4xl flex-col text-white'>
            <p>{data?.username}</p>
            <p>{data?.email}</p>
        </div>
    )
}

export default Dashboard