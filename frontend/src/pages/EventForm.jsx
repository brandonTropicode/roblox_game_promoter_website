import { useState } from "react";

export default function EventForm() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [reward, setReward] = useState("");
  const [image, setImage] = useState(null);

  // Image preview handler
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

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

      {/* Image Upload */}
      <label className="block mb-2 font-semibold">Event Banner Image</label>

      {/* Image Preview */}
      {image && (
        <div className="mb-6">
          <p className="font-semibold mb-2">Banner Preview:</p>
          <img
            src={image}
            alt="Event Banner"
            className="w-64 h-40 object-cover rounded border"
          />
        </div>
      )}

      {/* Upload + Submit */}
      <div className="flex items-center justify-between mb-4">

        {/* Upload Button */}
        <label
          htmlFor="event-image-upload"
          className="
            border border-blue-500
            text-blue-500
            bg-white
            px-6 py-2
            rounded
            text-center
            cursor-pointer
            hover:bg-blue-500 hover:text-white
            transition
          "
        >
          Upload Image
        </label>

        {/* Hidden File Input */}
        <input
          id="event-image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Publish Button */}
        <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">
          Publish Event
        </button>
      </div>
    </div>
  )
}
