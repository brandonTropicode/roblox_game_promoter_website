import { useEffect, useState } from "react";
import NewPostPopup from "./NewPostPopup";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import PostList from "./PostList";

export default function AdminHome(){
     const [showpopup,setShowpopup]=useState(false)
     const [posts,setposts]=useState([])
     useEffect(() => {
      const postsRef = collection(db,'posts')
      const refresh=onSnapshot(postsRef,(snapshot)=>{
        const data = snapshot.docs.map((doc)=>({
          id:doc.id,
          ...doc.data()
        }))
        setposts(data)
      })
      return () => refresh()
     }, [])
    console.log(posts)
     {/* Replace the entire return statement */}
return (
  <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Admin Panel</h1>

          <button className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          Log Out
          </button>
      </header>

      <div className="bg-blue-500 text-white p-6 text-center text-lg font-semibold shadow">
          <h2 className="text-3xl font-bold">Welcome, Admin!</h2>
          <p className="mt-1 text-sm">
          Create and manage game updates for your tycoon.
          </p>
      </div>

      <main className="p-6 flex gap-6">

          <div className="w-2/3 flex flex-col">

              <button
              onClick={() => setShowpopup(true)}
              className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-fit mb-6"
              >
              + Create New Post
              </button>

              <PostList posts={posts} /> {/* Remove posts in the {} and ask student */}
          </div>

          <div className="w-1/3">
              <p className="text-gray-400 text-sm italic my-6">Coming soon..</p>
          </div>

      </main>

      {showpopup && (
          <NewPostPopup onClose={() => setShowpopup(false)} />
      )}
  </div>
);
}