import { useState } from "react";
import NewPostPopUp from "./NewPostPopUp";

export default function AdminPage() {
    const [showPopup, setShowPopup] = useState(false)

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Header */}
            <header className="bg-white shadow p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-600">Admin Panel</h1>

                {/* Logout Button */}
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                Log Out
                </button>
            </header>

            {/* Main Content */}
            <main className="p-6">

                {/* Welcome Banner */}
                <div className="bg-blue-500 text-white p-6 rounded-lg shadow text-center mb-8">
                <h2 className="text-3xl font-semibold">Welcome, Admin!</h2>
                <p className="mt-2">
                    Create and manage game updates for your homepage.
                </p>
                </div>

                {/* Create Post Button */}
                <div className="flex justify-center">
                <button onClick={() => setShowPopup(true)} className="bg-white border border-blue-500 text-blue-600 px-6 py-3 rounded-lg shadow hover:bg-blue-50 transition">
                    + Create New Post
                </button>
                </div>

            </main>
            {showPopup && <NewPostPopUp onClose={() => setShowPopup(false)} />}
        </div>
    );
}