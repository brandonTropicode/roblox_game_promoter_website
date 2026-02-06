import { useState } from "react";

export default function EventForm() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [reward, setReward] = useState("");

  return (
    <div className="max-w-3xl mx-auto">
      {/* Title */}
      <label className="block mb-2 font-semibold">Event Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Example: Winter Gift Hunt Event!"
        className="w-full p-2 border rounded mb-6"
      />

      {/* Description */}
      <label className="block mb-2 font-semibold">Event Description</label>
      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Explain what the event is about..."
        className="w-full p-2 border rounded h-32 mb-6"
      />

      {/* Start Date */}
      <label className="block mb-2 font-semibold">Event Start Date / Time</label>
      <input
        type="datetime-local"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        className="w-full p-2 border rounded mb-6"
      />

      {/* End Date */}
      <label className="block mb-2 font-semibold">Event End Date / Time</label>
      <input
        type="datetime-local"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        className="w-full p-2 border rounded mb-6"
      />

      {/* Reward */}
      <label className="block mb-2 font-semibold">Event Reward (optional)</label>
      <input
        type="text"
        value={reward}
        onChange={(e) => setReward(e.target.value)}
        placeholder="Example: Earn 2x Bonds, Exclusive badge..."
        className="w-full p-2 border rounded mb-6"
      />

      {/* Upload + Submit */}
      <div className="flex items-center justify-between mb-4">
        {/* Publish Button */}
        <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">
          Publish Event
        </button>
      </div>
    </div>
  )
}
