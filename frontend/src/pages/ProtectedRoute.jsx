import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ isallowed,redirectPath,children}){
    if(!isallowed){
        return <Navigate to={redirectPath} replace />
    }
}