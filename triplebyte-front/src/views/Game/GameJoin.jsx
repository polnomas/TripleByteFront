import React, { useState, useEffect } from 'react'
import '../../assets/styles/GameJoin.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function GameJoin() {
  const [roomId, setRoomId] = useState('')
  const [joined, setJoined] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'))
  
    if (!token || !user) {
      navigate('/login')
    }
  }, [])
  const handleJoin = async () => {
    if (roomId.trim() !== '') {
      console.log(user.id)
      console.log(roomId)
      let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/play/join`, { gameId: Number(roomId), userId: Number(user.id) })
      console.dir(res, { depth: null })
      setJoined(true)
      navigate(`/game/gamewaiting`, { state: {gameId: res.data.data.id, isOwner: false, users: res.data.data.players.map(p => p.userId)} })
    }
  }

  return (
    <div className="gamejoin-container">
      <h1>Unirse a sala<br />de juego</h1>

      {!joined ? (
        <div className="form-group">
          <label htmlFor="room-id-input">Ingresa el ID de la sala:</label>
          <input
            id="room-id-input"
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="ID de la sala"
          />
          <button onClick={handleJoin}>Unirme</button>
        </div>
      ) : (
        <div className="success-message">
          <h2>Te has unido exitosamente!</h2>
          <p>Para empezar a jugar debes esperar a que el<br />anfitrión de la sala empiece la partida.</p>
        </div>
      )}

    </div>
  )
}

export default GameJoin
