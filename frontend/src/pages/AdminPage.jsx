import { useEffect, useState } from "react";
import NewPostPopUp from "./NewPostPopUp";
import PostList from "./PostList";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { getUserByID } from "../services/userService";
import { signOut } from "firebase/auth";

export default function AdminPage() {
    const [showPopup, setShowPopup] = useState(false);
    const [posts, setPosts] = useState([]);
    const [admin, setAdmin] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const loadAdmin = async() => {
            const user = auth.currentUser

            if (!user) {
                navigate('/admin-login', {replace: true})
                return
            }

            const profile = await getUserByID(user.uid)

            if (!profile || profile.role !== 'admin') {
                navigate('/admin-login', {replace: true})
                return
            }

            setAdmin(profile)
        }

        loadAdmin()
    }, [navigate])

    useEffect(() => {
        const postsRef = collection(db, 'posts');

        const unsubscribe = onSnapshot(postsRef, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setPosts(data)
        })

        return () => unsubscribe()
    }, [])

    const handleLogout = async() => {
        await signOut(auth)
        navigate("/admin-login", { replace: true });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-600">Admin Panel</h1>

                <button
                onClick={handleLogout}
                className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                Log Out
                </button>
            </header>

            <div className="bg-blue-500 text-white p-6 text-center text-lg font-semibold shadow">
                <h2 className="text-3xl font-bold">
                Welcome{admin ? `, ${admin.firstname}!` : ", Admin!"}
                </h2>

                <p className="mt-1 text-sm">
                Create and manage game updates for your game.
                </p>
            </div>

            <main className="p-6 flex gap-6">
                <div className="w-2/3 flex flex-col">
                <button
                    onClick={() => setShowPopup(true)}
                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-fit mb-6"
                >
                    + Create New Post
                </button>

                <PostList posts={posts} />
                </div>

                <div className="w-1/3">
                <p className="text-gray-400 text-sm italic my-6">Coming soon..</p>
                </div>
            </main>

            {showPopup && <NewPostPopUp onClose={() => setShowPopup(false)} />}
        </div>
    )
}
