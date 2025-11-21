import { useState } from "react";
import NewPostPopUp from "./NewPostPopUp";
import PostList from "./PostList";

export default function AdminPage() {
  const [showPopup, setShowPopup] = useState(false);
    const posts = [
    {
        id: "1",
        type: "post",
        title: "New Sneak Peek!",
        body: "We are working on a brand new area for the tycoon. Here is a small preview of what we're building!",
        // images: [
        // "https://via.placeholder.com/300x200.png?text=Sneak+Peek"
        // ],
        publishDate: "2025-11-21 12:00 PM",

        summary: "",
        changes: [],
        version: "",
        category: "",

        description: "",
        startDate: "",
        endDate: "",
        reward: "",
        requirements: "",
        bannerImage: ""
    },

    {
        id: "2",
        type: "update",
        title: "Version 1.03 Patch Notes",
        summary: "Small improvements and bug fixes across the tycoon experience.",
        changes: [
        "Fixed conveyor belt collision issue",
        "Improved dropper animation speed",
        "Added new mini-map icon"
        ],
        version: "1.03",
        category: "Bug Fix",
        // images: [
        // "https://via.placeholder.com/100.png?text=Fix+1",
        // "https://via.placeholder.com/100.png?text=Fix+2"
        // ],
        publishDate: "2025-11-20 3:45 PM",

        body: "",
        description: "",
        startDate: "",
        endDate: "",
        reward: "",
        requirements: "",
        bannerImage: ""
    },

    {
        id: "3",
        type: "event",
        title: "Christmas Gift Hunt!",
        description: "Find hidden gifts throughout the map to win exclusive rewards and holiday items!",
        startDate: "2025-12-01",
        endDate: "2025-12-25",
        reward: "Exclusive Santa Hat + 2x Bonds",
        bannerImage: "https://via.placeholder.com/800x200.png?text=Holiday+Event",
        publishDate: "2025-11-19 9:00 AM",

        body: "",
        summary: "",
        changes: [],
        version: "",
        category: "",
        requirements: "No level requirement.",
        images: []
    }
    ];

  return (
    <div className="min-h-screen bg-gray-100">

        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">Admin Panel</h1>

            <button className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            Log Out
            </button>
        </header>

        {/* Welcome Banner */}
        <div className="bg-blue-500 text-white p-6 text-center text-lg font-semibold shadow">
            <h2 className="text-3xl font-bold">Welcome, Admin!</h2>
            <p className="mt-1 text-sm">
            Create and manage game updates for your tycoon.
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
            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-fit mb-6"
            >
            + Create New Post
            </button>

            {/* Posts / Placeholder */}
            <PostList posts={posts} />
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
