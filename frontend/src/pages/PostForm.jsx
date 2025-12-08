import { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

export default function PostForm({ setShowPopup }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  // const [imagePreview, setImagePreview] = useState(null);
  // const [imageFile, setImageFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const publishDate = new Date().toLocaleString();

  // Image preview
  // const handleImageChange = (e) => {
  //   if (e.target.files && e.target.files[0]) {
  //     const file = e.target.files[0]
  //     setImageFile(file)
  //     setImagePreview(URL.createObjectURL(file))
  //   }
  // };

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (!title.trim() || !body.trim()) {
      alert("Fill in the blanks")
      return
    }

    try {
      setIsSaving(true)

      // let imgUrl = null
      // if (imageFile) {
      //   const filePath = `posts/${Date.now()}-${imageFile.name}`
      //   const imgRef = ref(storage, filePath)
      //   await uploadBytes(imgRef, imageFile)
      //   imgUrl = await getDownloadURL(imgRef)
      // }

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
      // setImageFile(null);
      // setImagePreview(null);

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

        {/* <label
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
        /> */}

        {/* Image Preview */}
        {/* {imagePreview && (
          <div className="mb-6">
            <p className="font-semibold mb-2">Thumbnail Preview:</p>

            <img
              src={imagePreview}
              alt="Preview"
              className="w-48 h-48 object-cover rounded border"
            />
          </div>
        )} */}

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
