import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import '../../assets/styles/GameCreate.css'
import axios from 'axios'
import SocketContext from '../../SocketContext'
import '../../assets/styles/GameWaiting.css'

function GameWaiting() {
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()
  const location = useLocation()
  const [gameId, isOwner] = [location.state.gameId, location.state.isOwner]
  const [users, setUsers] = useState(location.state.users)

  const socket = useContext(SocketContext)
  useEffect(() => {
    if (!socket) return
    socket.emit('joinGame', {gameId, userId: user.id})
    const handleNewPlayer = (newUsers) => {
      console.log('New player joined:', newUsers)
      setUsers(newUsers)
    }
    socket.on('newPlayer', handleNewPlayer)
    const handleGameStarted = (gameData) => {
      console.log('Game started:', gameData)
      navigate(`/play/play2`, { state: gameData })
    }
    socket.on('gameStarted', handleGameStarted)
    return () => {
      socket.off('newPlayer', handleNewPlayer)
      socket.off('gameStarted', handleGameStarted)
    }
  }, [socket, gameId, navigate, user.id])
  
  return (
    <div className='waiting-container'>
      <h1>Esperando a los jugadores...</h1>
      <h2>Espera a que los demás jugadores se unan y que el dueño de la sala empiece la partida.</h2>
      <h2><strong>ID sala:</strong> {gameId}</h2>
      <h2><strong>Jugadores en la Sala:</strong> {users.length}</h2>
    </div>
  )
}

export default GameWaiting