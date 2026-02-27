import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";

export default function ProtectedRoute({ children }) {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAuthorized(false);
        return;
      }

      try {
        const snap = await getDoc(doc(db, "users", user.uid));

        if (snap.exists() && snap.data().role === "admin") {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (err) {
        console.error("ProtectedRoute role check failed:", err);
        setAuthorized(false);
      }
    });

    return () => unsub();
  }, []);

  if (authorized === null) {
    return <div className="p-6">Loading...</div>;
  }

  return authorized ? children : <Navigate to="/admin-login" replace />;
}