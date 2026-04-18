import React, { useEffect, useState } from "react";
import {
    createItem,
    getItems,
    deleteItem,
    updateItem,
} from "../api/item";

function Inventory() {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({
        name: "",
        sku: "",
        category: "",
        price: "",
        quantity: "",
    });

    const [editingItem, setEditingItem] = useState(null);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    //  Fetch items
    const fetchItems = async () => {
        try {
            setLoading(true);
            const res = await getItems(page, 6);

            setItems(res.data.items);
            setTotalPages(res.totalPages);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [page]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createItem({
                ...form,
                price: Number(form.price),
                quantity: Number(form.quantity),
            });

            setForm({
                name: "",
                sku: "",
                category: "",
                price: "",
                quantity: "",
            });

            fetchItems();
        } catch (err) {
            console.error("Create error:", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteItem(id);
            fetchItems();
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    //  Start editing
    const handleEdit = (item) => {
        setEditingItem(item);
    };

    //  Update item
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await updateItem(editingItem._id, {
                ...editingItem,
                price: Number(editingItem.price),
                quantity: Number(editingItem.quantity),
            });

            setEditingItem(null);
            fetchItems();
        } catch (err) {
            console.error("Update error:", err);
        }
    };

    return (
        <div className="w-full max-w-6xl">

            {/* Create Form */}
            <form
                onSubmit={handleSubmit}
                className="mb-6 grid grid-cols-2 gap-4 bg-black/30 p-4 rounded-xl"
            >
                {["name", "sku", "category", "price", "quantity"].map((field) => (
                    <input
                        key={field}
                        name={field}
                        value={form[field]}
                        onChange={handleChange}
                        placeholder={field}
                        className="p-2 rounded bg-gray-800 text-white"
                        required
                    />
                ))}

                <button className="col-span-2 bg-purple-600 p-2 rounded hover:bg-purple-700 transition">
                    Add Item
                </button>
            </form>

            {/* Edit Form */}
            {editingItem && (
                <form
                    onSubmit={handleUpdate}
                    className="mb-6 grid grid-cols-2 gap-4 bg-black/30 p-4 rounded-xl"
                >
                    {["name", "sku", "category", "price", "quantity"].map((field) => (
                        <input
                            key={field}
                            name={field}
                            value={editingItem[field]}
                            onChange={(e) =>
                                setEditingItem({
                                    ...editingItem,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            className="p-2 rounded bg-gray-800 text-white"
                            required
                        />
                    ))}

                    <button className="col-span-2 bg-green-600 p-2 rounded hover:bg-green-700 transition">
                        Update Item
                    </button>

                    <button
                        type="button"
                        onClick={() => setEditingItem(null)}
                        className="col-span-2 bg-gray-600 p-2 rounded hover:bg-gray-700 transition"
                    >
                        Cancel
                    </button>
                </form>
            )}

            {/* Loading */}
            {loading && (
                <p className="text-center text-lg animate-pulse">Loading...</p>
            )}

            {/* Items */}
            {!loading && (
                <div className="grid grid-cols-3 gap-4">
                    {items.length === 0 && (
                        <p className="col-span-3 text-center">No items found</p>
                    )}

                    {items.map((item) => (
                        <div
                            key={item._id}
                            className="p-4 bg-black/30 rounded-xl shadow backdrop-blur-md"
                        >
                            <h4 className="text-xl font-bold">{item.name}</h4>
                            <p>SKU: {item.sku}</p>
                            <p>Category: {item.category}</p>
                            <p>Price: ₹{item.price}</p>
                            <p>Qty: {item.quantity}</p>

                            <div className="flex gap-2 mt-3">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-6 gap-4 items-center">
                <button
                    disabled={page === 1}
                    onClick={() => setPage((prev) => prev - 1)}
                    className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
                >
                    Prev
                </button>

                <span className="text-lg">
                    Page {page} / {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage((prev) => prev + 1)}
                    className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Inventory;