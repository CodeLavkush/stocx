import React, { useEffect, useState } from "react";
import { getSummary } from "../api/summary.js";

function Summary() {
    const [summary, setSummary] = useState({
        totalItems: 0,
        totalQuantity: 0,
    });

    const [loading, setLoading] = useState(false);

    const fetchSummary = async () => {
        try {
            setLoading(true);

            const res = await getSummary();

            const data = {
                totalItems: res?.data[0].totalItems || 0,
                totalQuantity: res?.data[0].totalQuantity || 0,
            };

            setSummary(data);
        } catch (err) {
            console.error("Error fetching summary:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSummary();
    }, []);

    return (
        <div className="flex flex-col md:flex-row gap-6">

            {loading ? (
                <div className="w-full text-center">
                    <p className="text-xl animate-pulse text-gray-200">
                        Loading summary...
                    </p>
                </div>
            ) : (
                <>
                    {/* Total Items */}
                    <div className="flex-1 p-6 rounded-2xl bg-black/30 backdrop-blur-md shadow-xl text-center hover:scale-105 transition duration-300">
                        <h3 className="text-xl mb-2 text-gray-200">
                            Total Item Count
                        </h3>
                        <p className="text-4xl font-bold text-white">
                            {summary.totalItems}
                        </p>
                    </div>

                    {/* Total Quantity */}
                    <div className="flex-1 p-6 rounded-2xl bg-black/30 backdrop-blur-md shadow-xl text-center hover:scale-105 transition duration-300">
                        <h3 className="text-xl mb-2 text-gray-200">
                            Total Quantity
                        </h3>
                        <p className="text-4xl font-bold text-white">
                            {summary.totalQuantity}
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}

export default Summary;