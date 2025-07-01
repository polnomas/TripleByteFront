import React, { useEffect, useState, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../assets/styles/GameCreate.css'
import axios from 'axios'
import SocketContext from '../../SocketContext'

function GameCreate() {
  const user = JSON.parse(localStorage.getItem('user'))
  const [cards, setCards] = useState(null);
  // const [players, setPlayers] = useState(null);
  const [roomId, setRoomId] = useState(null)
  const navigate = useNavigate();
  const [users, setUsers] = useState([])
  const createdRef = useRef(false)
  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'))
  
    if (!token || !user) {
      navigate('/login')
    }
  }, [])
  useEffect(() => {
    if (createdRef.current) return
    createdRef.current = true
    const createRoom = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/play/initialize`, { ownersUserId: user.id })
        console.dir(response, {depth: null})
        setRoomId(response.data.data.id)
      } catch (error) {
        console.error('Error creating room:', error)
      }
    }
    createRoom()
  }, [])
  const socket = useContext(SocketContext)
  useEffect(() => {
    if (!roomId || !socket || !user.id) return
    socket.emit('joinGame', {gameId: roomId, userId: user.id})
    const handleNewPlayer = (newUsers) => {
      console.log('New player joined:', newUsers)
      setUsers(newUsers)
    }
    socket.on('newPlayer', handleNewPlayer)
    return () => {
      socket.off('newPlayer', handleNewPlayer)
    }
  }, [roomId, socket, user.id])
  
  const handleStartGame = async () => {
    if (cards) {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/play/start`, {gameId: roomId, ownersUserId: user.id, mainPileSize: cards})
      console.dir(response, {depth: null})
      navigate(`/play/play2`, { state: response.data.data })
    }
  }

  return (
    <div className="gamecreate-container">
      <h1>Crear sala de juego</h1>

      <div className="room-id">
        <h2>Comparte el ID de la sala para jugar con tus amigos!</h2>
        <h2><strong>ID sala:</strong> {roomId}</h2>
        <h2><strong>Jugadores en Espera:</strong> {users.length}</h2>
      </div>

      <h3>Selecciona la cantidad de cartas de la pila principal:</h3>
      <div className="cards-selection">
        {[5, 10, 15, 20, 25].map(num => (
          <button
            key={num}
            className={cards === num ? 'selected' : ''}
            onClick={() => setCards(num)}
          >
            {num} cartas
          </button>
        ))}
      </div>

      {/* <h3>Selecciona la cantidad de jugadores:</h3>
      <div className="players-selection">
        {[2, 3, 4].map(num => (
          <button
            key={num}
            className={players === num ? 'selected' : ''}
            onClick={() => setPlayers(num)}
          >
            {num} jugadores
          </button>
        ))}
      </div> */}

      {cards && (
        <div className="confirmation-section">
          <p>Has seleccionado <strong>{cards}</strong> cartas.</p>
          <button className="start-button" onClick={handleStartGame}>
            EMPEZAR EL JUEGO
          </button>
        </div>
      )}
    </div>
  );
}

export default GameCreate;
