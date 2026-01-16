import { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

export default function PostForm({ setShowPopup }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const publishDate = new Date().toLocaleString();

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (!title.trim() || !body.trim()) {
      alert("Fill in the blanks")
      return
    }

    try {
      setIsSaving(true)

      const postData = {
        type: 'post',
        title: title.trim(),
        body: body.trim(),
        images: [],
        publishDate,

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
      }

      await addDoc(collection(db, "posts"), postData); // --> save to Firebase, posts collection

      setTitle("");
      setBody("");

      alert("Post published!");
      setShowPopup(false); // --> close the new post popup
    } catch (err) {
      console.error("Error saving post:", err);
      alert("There was an error publishing the post.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
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
        <label className="block mb-2 font-semibold">Image Upload(optional)</label>
        <p className="text-gray-400 text-sm italic my-5">Coming soon..</p>

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
        <button
          type="submit"
          disabled={isSaving}
          className={`cursor-pointer px-6 py-2 rounded text-white transition ${
            isSaving
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isSaving ? "Publishing..." : "Publish Post"}
        </button>
      </form>
  );
}
