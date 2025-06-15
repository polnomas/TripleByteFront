import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext'
import '../assets/styles/NavBar.css'

function Navbar() {
  const { token, user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  console.log('user:', user)
  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><Link to="/">INICIO</Link></li>
        <li><Link to="/instructions">INSTRUCCIONES</Link></li>
        <li><Link to="/about">NOSOTROS</Link></li>

        {token && (
          <li><Link to="/game">JUGAR</Link></li>
        )}

        {!token && (
          <>
            <li><Link to="/login">LOGIN</Link></li>
            <li><Link to="/register">REGISTRO</Link></li>
          </>
        )}

        {token && user?.isAdmin && (
          <>
            <li><Link to="/game/gamehistory">HISTORIAL</Link></li>
            <li><Link to="/game/gamereports">REPORTES</Link></li>
          </>
        )}

        {token && (
          <>
            <li className="nav-user">Hola, {user.nick}</li>
            <li><button onClick={handleLogout}>CERRAR SESIÓN</button></li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
