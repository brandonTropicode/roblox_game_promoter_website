import { addDoc, collection } from "firebase/firestore"
import { useState } from "react"
import { db } from "../firebase"

export default function PostForm({setshowpopup}){
    const[title,setTitle] = useState('')
    const[body,setBody] = useState('')
    // const[img,setImg] = useState(null)
    const [isSaving,setIsSaving] = useState(false)
    const publishDate = new Date().toLocaleString()
    const handleImgChange = (e) => {
        if(e.target.files && e.target.files[0]){
            setImg(URL.createObjectURL(e.target.files[0]))
        }
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(!title.trim()||!body.trim()){
            alert('Fill in the blanks')
            return
        }
        try{
            setIsSaving(true)
            const postData = {
			        type:"post",
			        title:title.trim(), 
			        body:body.trim(),
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
            await addDoc(collection(db,'posts'),postData)
            setTitle('')
            setBody('')
            alert('your post is published')
            setshowpopup(false)
        } catch (err) {
            console.error("Error saving post:", err);
            alert("There was an error publishing the post.");
            } finally {
            setIsSaving(false);
            }
    }
    return(
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
            onChange={handleImgChange}
            className="hidden"
        />

        {/* Image Preview */}
        {/* {img && (
        <div className="mb-6">
            <p className="font-semibold mb-2">Thumbnail Preview:</p>
            <img
            src={img}
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
        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">
        Publish Post
        </button>
    </form>
    )
}