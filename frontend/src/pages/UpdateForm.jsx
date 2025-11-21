import { useState } from "react";

export default function UpdateForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [summary, setSummary] = useState("");
  const [changes, setChanges] = useState([""]);
  const [version, setVersion] = useState("");
  const [images, setImages] = useState([]);
  const publishDate = new Date().toLocaleString();

  // Handle change list updates
  const updateChange = (value, index) => {
    const newChanges = [...changes];
    newChanges[index] = value;
    setChanges(newChanges);
  };

  const addChangeField = () => {
    setChanges([...changes, ""]);
  };

  const removeChange = (index) => {
    if (changes.length === 1) return;
    const updated = changes.filter((_, i) => i !== index);
    setChanges(updated);
  };

  // Image upload handler
  const handleImageUpload = (e) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
        .slice(0, 3 - images.length) // allow a max of 3 total
        .map((file) => URL.createObjectURL(file));

      setImages((prev) => [...prev, ...selectedFiles].slice(0, 3));
    }
  };

  // Remove one specific image
  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  };

  return (
    <div className="max-w-3xl mx-auto">

      {/* Update Title */}
      <label className="block mb-2 font-semibold">Update Title</label>
      <input
        type="text"
        placeholder="Example: Version 1.02 Patch Notes"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-6"
      />

      {/* Category Selector */}
      <label className="block mb-2 font-semibold">Category (optional)</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded mb-6"
      >
        <option value="">Select a Category</option>
        <option value="Gameplay">Gameplay</option>
        <option value="UI">UI</option>
        <option value="Bug Fix">Bug Fix</option>
        <option value="New Feature">New Feature</option>
        <option value="Balance">Balance</option>
        <option value="Visuals">Visuals</option>
      </select>

      {/* Summary */}
      <label className="block mb-2 font-semibold">Update Summary</label>
      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="Write a short summary of the update..."
        className="w-full p-2 border rounded h-24 mb-6"
      />

      {/* List of Changes */}
      <label className="block mb-2 font-semibold">List of Changes</label>

      {changes.map((change, index) => (
        <div key={index} className="flex items-center gap-2 mb-3">
          <input
            type="text"
            value={change}
            onChange={(e) => updateChange(e.target.value, index)}
            placeholder={`Change #${index + 1}`}
            className="w-full p-2 border rounded"
          />

          {index > 0 && (
            <button
                onClick={() => removeChange(index)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
                ✕
            </button>
          )}
        </div>
      ))}

      <button
        onClick={addChangeField}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mb-6"
      >
        + Add Change
      </button>

      {/* Version Number */}
      <label className="block mb-2 font-semibold">Version Number (optional)</label>
      <input
        type="text"
        placeholder="Example: 1.02 or 2.0.4"
        value={version}
        onChange={(e) => setVersion(e.target.value)}
        className="w-full p-2 border rounded mb-6"
      />

      {/* Image Upload */}
      <label className="block mb-2 font-semibold">Update Images (optional, max 3)</label>

      <label
        htmlFor="update-image-upload"
        className="inline-block bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition mb-4"
      >
        Upload Images
      </label>

      <input
        id="update-image-upload"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Horizontally scrolling image list */}
      {images.length > 0 && (
        <div className="flex gap-4 overflow-x-auto mb-6">
          {images.map((img, idx) => (
            <div key={idx} className="relative">
              {/* Remove button */}
              <button
                onClick={() => removeImage(idx)}
                className="absolute top-0 left-0 bg-red-500 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center hover:bg-red-600"
              >
                ✕
              </button>

              {/* Small image */}
              <img
                src={img}
                alt="Preview"
                className="w-24 h-24 object-cover rounded border"
              />
            </div>
          ))}
        </div>
      )}

      {/* Publish Date */}
      <label className="block mb-1 font-semibold">Publish Date</label>
      <input
        type="text"
        readOnly
        value={publishDate}
        className="w-full p-2 border rounded bg-gray-100 mb-6"
      />

      {/* Submit */}
      <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">
        Publish Update
      </button>
    </div>
  );
}
