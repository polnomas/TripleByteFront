import {useState, useEffect}  from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../assets/styles/Play/Play2.css';
import axios from 'axios';
import React  from 'react';

const Play = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()
  const location = useLocation()
  const [gameState, setGameState] = useState(location.state)
  const [playerState, setPlayerState] = useState(null)
  const fetchMyGameState = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/play/my_status/${gameState.id}/${user.id}`)
      console.dir(response, {depth: null})
      await setPlayerState(response.data.data)
      console.dir(playerState, {depth: null})
    } catch (error) {
       console.error('Error fetching game state:', error);
    }
  }
  useEffect(() => {
    fetchMyGameState()
  }, [])
  let oponentIndex = -1
  for (let i = 0; i < gameState.players.length; i++) {
    if (gameState.players[i].userId !== user.id) {
      oponentIndex = i
      break
    }
  }
  const handleDraw = async () => {
    try {
      const reqData = {
        gameId: gameState.id,
        action: {
          type: 'draw',
          userMovingId: user.id
        }
      }
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/play/make_a_move`, reqData)
      console.dir(response, {depth: null})
      if (response.data.data.cardId) {
        await fetchMyGameState()
      }
    } catch (error) {
      console.error('Error drawing a card:', error);
    }
  }
  return (
    <div className="play-wrapper"> 

      <button className="exit-button" onClick={() => navigate('/')}>
        Salir del juego
      </button>

      <div className="play-container">

        {/* Jugador oponente */}
        <div className="player opponent">
          <div className="player-name">{gameState.players[oponentIndex].userId}</div>

          <div className="card-row">
            <div className="card-base card-ability">{Object.keys(gameState.players[oponentIndex].skills.content).length === 0 ? 0 : Object.keys(gameState.players[oponentIndex].skills.content)}</div>
            <div className="card-base card-ability">{Object.keys(gameState.players[oponentIndex].skills.content).length === 0 ? 0 : Object.keys(gameState.players[oponentIndex].skills.content)}</div>
          </div>

          <div className="card-row">
            <div className="card-base pile-start">{gameState.players[oponentIndex].mainPile.top}</div>
            <div className="card-base pile-discard">{gameState.players[oponentIndex].discardPiles[0].top}</div>
            <div className="card-base pile-discard">{gameState.players[oponentIndex].discardPiles[1].top}</div>
            <div className="card-base pile-discard">{gameState.players[oponentIndex].discardPiles[2].top}</div>
            <div className="card-base pile-discard">{gameState.players[oponentIndex].discardPiles[3].top}</div>
          </div>
        </div>

        {/* Pilas de construcción al centro */}
        <div className="center-piles">
          <div className="card-base pile-build">{gameState.constructionPiles[0].top}</div>
          <div className="card-base pile-build">{gameState.constructionPiles[1].top}</div>
          <div className="card-base pile-build">{gameState.constructionPiles[2].top}</div>
          <div className="card-base pile-build">{gameState.constructionPiles[3].top}</div>
          <button className="card-base card-skipbo" onClick={handleDraw}>
            Skip-Bo
          </button>
        </div>

        {/* Jugador actual */}
        <div className="player">
          <div className="player-name">{user.nick}</div>

          <div className="card-row">
            <div className="card-base pile-start">{playerState === null ? 0 : playerState.mainPile.top}</div>
            <div className="card-base pile-discard">{playerState === null ? 0 : playerState.discardPiles[0].top}</div>
            <div className="card-base pile-discard">{playerState === null ? 0 : playerState.discardPiles[1].top}</div>
            <div className="card-base pile-discard">{playerState === null ? 0 : playerState.discardPiles[2].top}</div>
            <div className="card-base pile-discard">{playerState === null ? 0 : playerState.discardPiles[3].top}</div>
          </div>

          <div className="card-row">
            <div className="card-base card-red">{playerState === null ? 0 : playerState.hand.content.length >= 1 ? playerState.hand.content[0] : 0}</div>
            <div className="card-base card-red">{playerState === null ? 0 : playerState.hand.content.length >= 2 ? playerState.hand.content[1] : 0}</div>
            <div className="card-base card-red">{playerState === null ? 0 : playerState.hand.content.length >= 3 ? playerState.hand.content[2] : 0}</div>
            <div className="card-base card-red">{playerState === null ? 0 : playerState.hand.content.length >= 4 ? playerState.hand.content[3] : 0}</div>
            <div className="card-base card-red">{playerState === null ? 0 : playerState.hand.content.length >= 5 ? playerState.hand.content[4] : 0}</div>
          </div>

          <div className="card-row">
            <div className="card-base card-ability">{playerState === null ? 0 : Object.keys(playerState.skills.content).length === 0 ? 0 : Object.keys(playerState.skills.content)}</div>
            <div className="card-base card-ability">{playerState === null ? 0 : Object.keys(playerState.skills.content).length === 0 ? 0 : Object.keys(playerState.skills.content)}</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Play;
