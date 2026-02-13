import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminHome from './pages/AdminHome';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  const admin_login = localStorage.getItem("admin_login")
  return (
    <Router basename={import.meta.emv.BASE_URL}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin-login' element={<AdminLogin />} />
        {/* <Route path='/admin' element={<ProtectedRoute isallowed = {admin_login} redirectPath={"admin-login"}><AdminHome/></ProtectedRoute>} /> */}
        <Route path='/admin' element={<AdminHome />} />
        <Route path='*' element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
