import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase"; // adjust path if needed

export default function ProtectedRoute({ children }) {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const checkRole = async () => {
      const user = auth.currentUser;

      if (!user) {
        setAuthorized(false);
        return;
      }

      const snap = await getDoc(doc(db, "users", user.uid));

      if (snap.exists() && snap.data().role === "admin") {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
    };

    checkRole();
  }, []);

  if (authorized === null) return null;

  return authorized ? children : <Navigate to="/admin-login" replace />;
}