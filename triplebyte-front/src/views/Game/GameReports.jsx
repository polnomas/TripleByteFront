import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../assets/styles/GameHistory.css'

function GameReports() {
  const navigate = useNavigate()
  const reportes = [
    {
      id: 'RPT001',
      tipo: 'Conducta inapropiada',
      jugador: 'Tere',
      detalles: 'Uso de lenguaje ofensivo durante la partida.',
    },
    {
      id: 'RPT002',
      tipo: 'Bug detectado',
      jugador: 'Pablo',
      detalles: 'No se pudo avanzar después del turno 3.',
    },
    {
      id: 'RPT003',
      tipo: 'Trampa sospechosa',
      jugador: 'Sofía',
      detalles: 'Jugadas demasiado rápidas, posible uso de bot.',
    },
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
        console.log('Acceso a ruta protegida de reportes exitoso')
      } catch (err) {
        console.error('Error al acceder a la ruta protegida de reportes:', err)
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
      <h1>Reportes del sistema</h1>
      <div className="history-list">
        {reportes.map((reporte, index) => (
          <div key={index} className="history-card">
            <p><strong>ID Reporte:</strong> {reporte.id}</p>
            <p><strong>Tipo:</strong> {reporte.tipo}</p>
            <p><strong>Jugador Involucrado:</strong> {reporte.jugador}</p>
            <p><strong>Detalles:</strong> {reporte.detalles}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GameReports
