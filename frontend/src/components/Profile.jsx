import React from 'react'
import { useOutletContext } from 'react-router-dom'

function Profile() {
    const { data } = useOutletContext();
    return (
        <div className="bg-black/30 p-8 rounded-2xl shadow-xl backdrop-blur-md text-center">
            <h2 className="text-3xl font-bold mb-4">Profile</h2>
            <p className="text-2xl">{data?.username}</p>
            <p className="text-lg text-gray-200">{data?.email}</p>
        </div>
    )
}

export default Profile