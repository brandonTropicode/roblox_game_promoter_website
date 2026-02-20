import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  const handleLogin = async(e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth,email,password)
      setMessage("your login has been approved by the higher ups")
      navigate("/admin")
    } catch(error){setmessage("why you wrong")}
  };
  
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded-lg p-8 w-80"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-6 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>

        {message && (
          <p className="text-center mt-4 text-sm">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
