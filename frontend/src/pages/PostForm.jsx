import { useState } from "react";

export default function PostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const publishDate = new Date().toLocaleString();

  // Image preview
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="max-w-3xl mx-auto">

        {/* Title */}
        <label className="block mb-2 font-semibold">Post Title</label>
        <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a short title..."
        className="w-full p-2 border rounded mb-6"
        />

        {/* Description */}
        <label className="block mb-2 font-semibold">Post Body / Description</label>
        <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write the description..."
        className="w-full p-2 border rounded h-32 mb-6"
        />

        {/* Image Upload */}
        <label className="block mb-2 font-semibold">Thumbnail Image (optional)</label>

        <label
            htmlFor="post-image-upload"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition mb-4"
            >
            Upload Image
        </label>

        <input
            id="post-image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
        />

        {/* Image Preview */}
        {image && (
        <div className="mb-6">
            <p className="font-semibold mb-2">Thumbnail Preview:</p>
            <img
            src={image}
            alt="Preview"
            className="w-48 h-48 object-cover rounded border"
            />
        </div>
        )}

        {/* Publish Date */}
        <div className="mb-6">
        <label className="block font-semibold mb-1">Publish Date</label>
        <input
            type="text"
            readOnly
            value={publishDate}
            className="w-full p-2 border rounded bg-gray-100"
        />
        </div>

        {/* Submit Button */}
        <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">
        Publish Post
        </button>
    </div>
  );
}
