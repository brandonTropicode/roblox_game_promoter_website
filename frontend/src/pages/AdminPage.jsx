import { useEffect, useState } from "react";
import NewPostPopUp from "./NewPostPopUp";
import PostList from "./PostList";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { getUserByID } from "../services/userService";
import { signOut } from "firebase/auth";
import LayoutOne from "./LayoutOne";
import LayoutTwo from "./LayoutTwo";
import LayoutThree from "./LayoutThree"

export default function AdminPage() {
    const [showPopup, setShowPopup] = useState(false);
    const [posts, setPosts] = useState([]);
    const [admin, setAdmin] = useState(null)
    const [layout, setLayout] = useState('one')

    const navigate = useNavigate()

    useEffect(() => {
        const savedLayout = localStorage.getItem("layout");

        if (savedLayout === "one" || savedLayout === "two" || savedLayout === "three") {
            setLayout(savedLayout);
        } else {
            localStorage.setItem("layout", "one");
        }
    }, []);

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

            <main className="p-6 flex gap-8">
                {/* LEFT SIDE — Posts */}
                <div className="w-2/3 flex flex-col">
                    {layout === "one" && <LayoutOne posts={posts} />}
                    {layout === "two" && <LayoutTwo posts={posts} />}
                    {layout === "three" && <LayoutThree posts={posts} />}
                </div>

                {/* RIGHT SIDE — Controls Panel */}
                <div className="w-1/3 flex flex-col gap-6">

                    {/* Layout Selector Card */}
                    <div className="bg-white p-5 rounded-xl shadow-sm">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">
                            Post Layout
                        </h3>

                        <div className="flex gap-2">
                            {["one", "two", "three"].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => {
                                        setLayout(type);
                                        localStorage.setItem("layout", type);
                                    }}
                                    className={`flex-1 px-4 py-2 rounded-lg transition font-medium ${
                                        layout === type
                                            ? "bg-blue-500 text-white shadow"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    {type === "one" && "List"}
                                    {type === "two" && "Grid"}
                                    {type === "three" && "Table"}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Create Post Card */}
                    <div className="bg-white p-5 rounded-xl shadow-sm">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">
                            Create Content
                        </h3>

                        <button
                            onClick={() => setShowPopup(true)}
                            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
                        >
                            + Create New Post
                        </button>
                    </div>
                </div>
            </main>

            {showPopup && <NewPostPopUp onClose={() => setShowPopup(false)} />}
        </div>
    )
}
