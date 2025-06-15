import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../assets/styles/Game.css'

function Game() {
  const navigate = useNavigate()

  const handleProtectedNavigation = async (route) => {
    const token = localStorage.getItem('token')
    try {
      await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/secure/gamejoin`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      console.log('Acceso a ruta protegida exitoso')
      navigate(route)
    } catch (err) {
      console.error('Error al acceder a la ruta protegida de reportes:', err)
    }
  }

  return (
    <div className="game-container">
      <h1>¡Bienvenido al juego!</h1>
      <div className="button-group">
        <button onClick={() => handleProtectedNavigation('/game/gamecreate')}>
          Crear Sala de Juego
        </button>
        <button onClick={() => handleProtectedNavigation('/game/gamejoin')}>
          Unirse a Sala de Juego
        </button>
      </div>
    </div>
  )
}

export default Game

