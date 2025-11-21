import { useState } from "react";
import NewPostPopUp from "./NewPostPopUp";

export default function AdminPage() {
  const [showPopup, setShowPopup] = useState(false);
  const posts = []; // placeholder — no posts yet

  return (
    <div className="min-h-screen bg-gray-100">

        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">Admin Panel</h1>

            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Log Out
            </button>
        </header>

        {/* Welcome Banner */}
        <div className="bg-blue-500 text-white p-6 text-center text-lg font-semibold shadow">
            <h2 className="text-3xl font-bold">Welcome, Admin!</h2>
            <p className="mt-1 text-sm">
            Create and manage game updates for your homepage.
            </p>
        </div>

        {/* Main Content - Two Column Layout */}
        {/* Main Content - Two Column Layout */}
        <main className="p-6 flex gap-6">

        {/* LEFT COLUMN (66%) */}
        <div className="w-2/3 flex flex-col">

            {/* Create Post Button */}
            <button
            onClick={() => setShowPopup(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-fit mb-6"
            >
            + Create New Post
            </button>

            {/* Posts / Placeholder */}
            {posts.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-600 text-lg font-semibold">
                Your posts will show here
            </div>
            ) : (
            <div>{/* Render posts here later */}</div>
            )}
        </div>

        {/* RIGHT COLUMN (34%) */}
        <div className="w-1/3">
            {/* Empty for future content */}
        </div>

        </main>


        {/* POPUP */}
        {showPopup && (
            <NewPostPopUp onClose={() => setShowPopup(false)} />
        )}
    </div>
  );
}
