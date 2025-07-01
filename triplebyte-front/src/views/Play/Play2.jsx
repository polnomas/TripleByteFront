import { useState, useEffect, useMemo, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../assets/styles/Play/Play2_modificado.css';
import React from 'react';
import Handler from './handlers';
import renderImage from '../../image_logic/cloudinary_config';
import SocketContext from '../../SocketContext';

const Play = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const location = useLocation();
  const [gameState, setGameState] = useState(null);
  const [playerState, setPlayerState] = useState(null);
  const [origin, setOrigin] = useState(null)
  const [originValue, setOriginValue] = useState(null)
  const gameId = location.state?.id || localStorage.getItem('gameId');

  useEffect(() => {
    if (location.state?.id) {
      localStorage.setItem('gameId', location.state.id);
    }
  }, [location.state]);

  const socket = useContext(SocketContext)
  const handler = useMemo(() => {
    if (!socket) return null
    return new Handler(
    socket,
    user.id,
    gameId,
    setGameState,
    setPlayerState,
    setOrigin,
    setOriginValue
  )}, [socket, user.id, gameId]);

  useEffect(() => {
    if (!handler) return
    handler.updateGameState();
    handler.updatePlayerState();
  }, [handler]);

  useEffect(() => {
    return () => {
      handler?.cleanup()
    }
  }, [handler])

  if (!gameState) return <div>Cargando...</div>;
  if (gameState?.status === "finished") {
  return (
    <div className="game-finished">
      <h2>¡El juego ha terminado!</h2>
      <button className="exit-button" onClick={() => navigate('/')}>
        Volver al Inicio
      </button>
    </div>
  );
}

  let oponentIndex = -1;
  for (let i = 0; i < gameState.players.length; i++) {
    if (gameState.players[i].userId !== user.id) {
      oponentIndex = i;
      break;
    }
  }

  return (
    <div className="play-wrapper">
      <div className="side left">
        <div className="turn-indicator">
          {gameState.players[gameState.currentTurn]?.userId === user.id
            ? "¡Es tu turno!"
            : `Turno de: ${gameState.players[gameState.currentTurn]?.userId}`}
        </div>
      </div>
      <div className="play-container">
        {/* Jugador oponente */}
        <div className="player opponent">
          <div className="player-name">{gameState.players[oponentIndex]?.userId}</div>
          <div className="card-row">
            {renderImage(
              gameState.players[oponentIndex]?.skills?.content?.[0] || 0,
              "card-base card-ability opponent-card"
            )}
            {renderImage(
              gameState.players[oponentIndex]?.skills?.content?.[1] || 0,
              "card-base card-ability opponent-card"
            )}
          </div>
          <div className="card-row">
            {renderImage(
              gameState.players[oponentIndex]?.mainPile?.top || 0,
              "card-base pile-start opponent-card"
            )}
            {renderImage(
              gameState.players[oponentIndex]?.discardPiles?.[0]?.top || 0,
              "card-base pile-discard opponent-card"
            )}
            {renderImage(
              gameState.players[oponentIndex]?.discardPiles?.[1]?.top || 0,
              "card-base pile-discard opponent-card"
            )}
            {renderImage(
              gameState.players[oponentIndex]?.discardPiles?.[2]?.top || 0,
              "card-base pile-discard opponent-card"
            )}
            {renderImage(
              gameState.players[oponentIndex]?.discardPiles?.[3]?.top || 0,
              "card-base pile-discard opponent-card"
            )}
          </div>
        </div>

        {/* Pilas de construcción al centro */}
        <div className="center-piles">
          {gameState.constructionPiles.map((pile, index) => (
            <div
              key={index}
              onClick={() => {
                if (origin === 'DiscardPile' && originValue !== null) {
                  handler.handleSelection('ConstructionPile', index, origin, originValue);
                  setOrigin(null);
                  setOriginValue(null);
                } else {
                  handler.handleSelection('ConstructionPile', index, origin, originValue, origin === 'Hand' ? playerState?.hand?.content : null)
                }
              }}
            >
              {renderImage(pile.top || 0, "card-base")}
            </div>
          ))}
          <button className="card-base card-skipbo" onClick={() => { handler.handleDraw() }}>
            Skip-Bo
          </button>
        </div>

        {/* Jugador actual */}
        <div className="player">
          <div className="player-name">{user?.nick || 'Jugador'}</div>
          <div className="card-row">
            <div
              className={`${origin === 'MainPile' && originValue ? ' selected' : ''}`}
              onClick={() => {
                handler.handleSelection('MainPile', !originValue, origin, originValue)
              }}
            >
              {renderImage(playerState?.mainPile?.top || 0, "card-base pile-start")}
            </div>
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`${origin === 'DiscardPile' && originValue === index ? ' selected' : ''}`}
                onClick={() => {
                  if (origin === 'Hand' && originValue !== null) {
                    // Si hay carta de la mano seleccionada, mueve de la mano a la discard pile
                    handler.handleSelection('DiscardPile', index, origin, originValue, playerState?.hand?.content);
                    setOrigin(null);
                    setOriginValue(null);
                  } else {
                    // Si no, selecciona la discard pile como origen para mover a construction pile
                    setOrigin('DiscardPile');
                    setOriginValue(index);
                  }
                }}               
              >
                {renderImage(playerState?.discardPiles?.[index]?.top || 0, "card-base pile-discard")}
              </div>
            ))}
          </div>
          <div className="card-row">
            {playerState?.hand?.content?.length > 0 ? (
              playerState.hand.content.map((card, index) => (
                <div
                  key={index}
                  className={`${origin === 'Hand' && originValue === index ? ' selected' : ''}`}
                  onClick={() => handler.handleSelection('Hand', index, origin, originValue)}
                >
                  {renderImage(card, "card-base card-red")}
                </div>
              ))
            ) : (
              Array(5).fill(0).map((_, index) => (
                <div key={index}>
                  {renderImage(0, "card-base card-red")}
                </div>
              ))
            )}
          </div>
          <div className="card-row">
            {renderImage(
              playerState?.skills?.content?.[0] || 0,
              "card-base card-ability"
            )}
            {renderImage(
              playerState?.skills?.content?.[1] || 0,
              "card-base card-ability"
            )}
          </div>
        </div>
      </div>
      <div className="side right">
        <button className="exit-button" onClick={() => navigate('/')}>
          Salir del juego
        </button>
      </div>
    </div>
  );
};

export default Play;

