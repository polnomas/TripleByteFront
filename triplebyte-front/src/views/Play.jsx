import React from 'react';
import '../assets/styles/play.css';

const Play = () => {
  return (
    <div className="play-container">

      {/* Fila superior: dos jugadores */}
      <div className="player-row">
        <div className="player">
          <div className="player-name">Nick Jugador 1</div>
          <div className="card-row">
            <div className="card card-green">Skip-Bo</div>
            <div className="card card-green">Skip-Bo</div>
            <div className="card card-green">Skip-Bo</div>
            <div className="card card-green">Skip-Bo</div>
            <div className="card card-green">Skip-Bo</div>
          </div>
          <div className="card-row">
            <div className="pile pile-start">6</div>
            <div className="pile pile-discard"></div>
            <div className="pile pile-discard"></div>
            <div className="pile pile-discard"></div>
            <div className="pile pile-discard"></div>
          </div>
        </div>

        <div className="player">
          <div className="player-name">Nick Jugador 2</div>
          <div className="card-row">
            <div className="card card-green">Skip-Bo</div>
            <div className="card card-green">Skip-Bo</div>
            <div className="card card-green">Skip-Bo</div>
            <div className="card card-green">Skip-Bo</div>
            <div className="card card-green">Skip-Bo</div>
          </div>
          <div className="card-row">
            <div className="pile pile-start">6</div>
            <div className="pile pile-discard"></div>
            <div className="pile pile-discard"></div>
            <div className="pile pile-discard"></div>
            <div className="pile pile-discard"></div>
          </div>
        </div>
      </div>

      {/* Fila central de pilas */}
      <div className="center-piles">
        <div className="pile pile-build"></div>
        <div className="pile pile-build"></div>
        <div className="pile pile-build"></div>
        <div className="pile pile-build"></div>
      </div>

      {/* Fila inferior: otros dos jugadores */}
      <div className="player-row">
        <div className="player">
          <div className="player-name">Nick Jugador 3</div>
          <div className="card-row">
            <div className="pile pile-start">6</div>
            <div className="pile pile-discard"></div>
            <div className="pile pile-discard"></div>
            <div className="pile pile-discard"></div>
            <div className="pile pile-discard"></div>
          </div>
          <div className="card-row">
            <div className="card card-green">Skip-Bo</div>
            <div className="card card-green">Skip-Bo</div>
            <div className="card card-green">Skip-Bo</div>
            <div className="card card-green">Skip-Bo</div>
            <div className="card card-green">Skip-Bo</div>
          </div>
        </div>

        <div className="player">
          <div className="player-name">Yo</div>
          <div className="card-row">
            <div className="pile pile-start">6</div>
            <div className="pile pile-discard"></div>
            <div className="pile pile-discard"></div>
            <div className="pile pile-discard"></div>
            <div className="pile pile-discard"></div>
          </div>
          <div className="card-row">
            <div className="card card-skipbo">Skip-Bo</div>
            <div className="card card-red">9</div>
            <div className="card card-red">5</div>
            <div className="card card-red">12</div>
            <div className="card card-red">10</div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Play;
