import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  const isAdminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
  console.log(isAdminLoggedIn)

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin-login' element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute isAllowed={isAdminLoggedIn}>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
