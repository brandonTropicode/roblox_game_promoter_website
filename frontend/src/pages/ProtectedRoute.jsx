import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ isAllowed, redirectPath = "/admin-login", children }) {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}
