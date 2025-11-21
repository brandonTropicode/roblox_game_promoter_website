import { useState } from "react";
import PostForm from "./PostForm";
import EventForm from "./EventForm";
import UpdateForm from "./UpdateForm";

export default function NewPostPopUp({ onClose }) {
  const [selectedType, setSelectedType] = useState("post");

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex justify-center items-center z-50 animate-[fadeIn_0.3s_ease-out]">
      {/* Popup Container */}
        <div className="bg-white w-[80%] h-[85%] rounded-lg shadow-xl p-6 overflow-y-auto relative animate-[popupIn_0.25s_ease-out]">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
          Create New Content
        </h2>

        {/* Type Selector */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`cursor-pointer px-4 py-2 rounded ${
              selectedType === "post"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setSelectedType("post")}
          >
            Post
          </button>

          <button
            className={`cursor-pointer px-4 py-2 rounded ${
              selectedType === "update"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setSelectedType("update")}
          >
            Update
          </button>

          <button
            className={`cursor-pointer px-4 py-2 rounded ${
              selectedType === "event"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setSelectedType("event")}
          >
            Event
          </button>
        </div>

        {/* Dynamic Form */}
        <div className="mt-4">
          {selectedType === "post" && <PostForm />}
          {selectedType === "update" && <UpdateForm />}
          {selectedType === "event" && <EventForm />}
        </div>

      </div>
    </div>
  );
}
