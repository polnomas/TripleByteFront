import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../assets/styles/GameHistory.css'

function GameHistory() {
  const navigate = useNavigate()
  const partidas = [
    { id: 'AAA111', jugadores: ['Sofía', 'Pablo', 'Tere'], ganador: 'Sofía' },
    { id: 'BBB222', jugadores: ['Pablo', 'Sofía'], ganador: 'Pablo' },
    { id: 'CCC333', jugadores: ['Sofía', 'Tere'], ganador: 'Tere' },
    { id: 'DDD444', jugadores: ['Tere', 'Pablo'], ganador: 'Pablo' },
    { id: 'EEE555', jugadores: ['Pablo', 'Sofía'], ganador: 'Sofía' },
  ]

  useEffect(() => {
    const fetchProtected = async () => {
      const token = localStorage.getItem('token')
      try {
        await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/secure/admin`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        console.log('Acceso a ruta protegida exitoso')
      } catch (err) {
        console.error('Error al acceder a la ruta protegida:', err)
      }
    }
    fetchProtected()
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'))
  
    if (!token || !user) {
      navigate('/login')
    }
  }, [])

  return (
    <div className="gamehistory-container">
      <h1>Historial de partidas</h1>
      <div className="history-list">
        {partidas.map((partida, index) => (
          <div key={index} className="history-card">
            <p><strong>ID sala:</strong> {partida.id}</p>
            <p><strong>Jugadores:</strong> {partida.jugadores.join(', ')}</p>
            <p><strong>Ganador:</strong> {partida.ganador}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GameHistory
