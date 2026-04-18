import React, { useEffect, useState } from 'react'
import { getCurrentUser, logout } from '../api/auth'
import { Outlet, Link, useNavigate } from 'react-router-dom'

function Dashboard() {
    const [data, setData] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getCurrentUser()
                setData(res.data)
            } catch (error) {
                console.error("Failed to fetch user:", error)
            }
        }

        fetchUser()
    }, [])

    const handleLogout = async () => {
        try {
            await logout()
            navigate("/login")
        } catch (error) {
            console.error("Logout failed:", error)
        }
    }

    return (
        <div className="flex h-screen w-screen bg-slate-950 text-slate-100">

            {/* Sidebar */}
            <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col p-6 space-y-6">

                <h2 className="text-2xl font-bold text-indigo-400">
                    Dashboard
                </h2>

                <nav className="flex flex-col space-y-3 text-sm font-medium">

                    <Link
                        to="profile"
                        className="hover:bg-slate-800 px-3 py-2 rounded transition"
                    >
                        Profile
                    </Link>

                    <Link
                        to="summary"
                        className="hover:bg-slate-800 px-3 py-2 rounded transition"
                    >
                        Summary
                    </Link>

                    <Link
                        to="inventory"
                        className="hover:bg-slate-800 px-3 py-2 rounded transition"
                    >
                        Inventory
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="mt-6 cursor-pointer bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 px-3 py-2 rounded transition"
                    >
                        Logout
                    </button>

                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-slate-950 flex items-center justify-center p-6">

                <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
                    <Outlet context={{ data }} />
                </div>

            </div>

        </div>
    )
}

export default Dashboard