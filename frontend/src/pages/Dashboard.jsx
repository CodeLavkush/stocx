import React, { useEffect, useState } from 'react'
import { getCurrentUser } from '../api/auth'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
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
        <div className="flex h-screen w-screen bg-linear-to-r from-slate-900 to-slate-700 text-white">

            {/* Sidebar */}
            <div className="w-64 bg-linear-to-r from-stone-500 to-stone-700 flex flex-col p-6 space-y-6 shadow-lg">
                <h2 className="text-2xl font-bold">Dashboard</h2>

                <nav className="flex flex-col space-y-4 text-lg">
                    <Link to="profile">Profile</Link>
                    <Link to="summary">Summary</Link>
                    <Link to="inventory">Inventory</Link>
                </nav>
            </div>

            {/* Page Content */}
            <div className="flex-1 flex items-center justify-center bg-linear-to-r from-purple-500 to-purple-900 p-6">
                <Outlet context={{ data }} />
            </div>
        </div>
    )
}

export default Dashboard