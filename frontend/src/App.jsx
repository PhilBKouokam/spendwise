import { useContext } from 'react'
import { Routes, Route, Navigate } from "react-router-dom"
import { AuthContext } from './context/AuthContext'

import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Transactions from './pages/Transactions.jsx'
import Navbar from './components/Layout/Navbar.jsx'
import './App.css'

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="container justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <Routes>
          { /*Public Routes*/ }
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="/login" element={!user? <Login /> : <Navigate to="/" /> } />

          { /*Protected Routes*/ }
          <Route
            path="/"
            element={user ? <Dashboard /> : <Navigate to="/login" /> }
          />
          <Route
            path="/transactions"
            element={user ? <Transactions /> : <Navigate to="/login" /> }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  )
}

export default App;
