import React from 'react';
import '../assets/styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="home-title">
        <h2>BIENVENIDO A</h2>
        <h1>Skip-Bo Web</h1>
      </div>
      <div className="home-card">
        <p>
          Nuestro objetivo es ofrecerte una experiencia amigable, divertida y 100% digital del juego.
        </p>
        <p>
          Puedes revisar las instrucciones, conocer al equipo o comenzar a jugar desde el menú superior.
        </p>
      </div>
    </div>
  );
}

export default Home;
