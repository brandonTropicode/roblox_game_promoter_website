import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminHome from './pages/AdminHome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/admin' element={<AdminLogin />} />
        <Route path='/admin-home' element={<AdminHome/>} />
        <Route path='*' element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  )
}

export default App
