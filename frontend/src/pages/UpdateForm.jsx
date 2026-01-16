import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";

export default function UpdateForm({ setShowPopup }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [summary, setSummary] = useState("");
  const [changes, setChanges] = useState([""]);
  const [version, setVersion] = useState("");
  const publishDate = new Date().toLocaleString();
  const [isSaving, setIsSaving] = useState(false)

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

  // handleSubmit function to add update post to the db
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !summary.trim()) {
      alert("Fill in the required fields");
      return;
    }

    try {
      setIsSaving(true);

      const updateData = {
        type: "update",
        title: title.trim(),
        category: category || "",
        summary: summary.trim(),
        changes: changes.filter((c) => c.trim() !== ""),
        version: version || "",
        images: [],
        publishDate,

        body: "",
        description: "",
        startDate: "",
        endDate: "",
        reward: "",
        requirements: "",
        bannerImage: "",
      };

      await addDoc(collection(db, "posts"), updateData);

      // reset form
      setTitle("");
      setCategory("");
      setSummary("");
      setChanges([""]);
      setVersion("");

      alert("Update published!");
      setShowPopup(false);
    } catch (err) {
      console.error("Error saving update:", err);
      alert("There was an error publishing the update.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">

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
        type="button"
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
      <p className="text-gray-400 text-sm italic my-5">Coming soon..</p>

      {/* Publish Date */}
      <label className="block mb-1 font-semibold">Publish Date</label>
      <input
        type="text"
        readOnly
        value={publishDate}
        className="w-full p-2 border rounded bg-gray-100 mb-6"
      />

      {/* Submit */}
      <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition cursor-pointer">
        Publish Update
      </button>
    </form>
  );
}
