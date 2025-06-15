import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import '../../assets/styles/GameCreate.css'
import axios from 'axios'
import { io } from 'socket.io-client'
function GameWaiting() {
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()
  const location = useLocation()
  const [gameId, isOwner] = [location.state.gameId, location.state.isOwner]
  const [users, setUsers] = useState(location.state.users)

  useEffect(() => {
    const socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit('joinGame', gameId)
    socket.on('newPlayer', (newUsers) => {
      console.log('New player joined:', newUsers)
      setUsers(newUsers)
    })
    socket.on('gameStarted', (gameData) => {
      console.log('Game started:', gameData)
      navigate(`/play/play2`, { state: gameData })
    })
    return () => {
      socket.disconnect()
    }
  }, [gameId])
  return (
    <div>
      <h1>Waiting for players...</h1>
      <h2>Room ID: {gameId}</h2>
        <h3>Players in the room:</h3>
        <p>Players: {users.length}</p>
    </div>
  )
}

export default GameWaiting