import React from 'react';
import '../assets/styles/Instructions.css';

const instructionsData = [
  {
    title: "🎯 Objetivo del juego",
    content: `El propósito es ser la primera persona en vaciar su pila de inicio. Esa pila está llena de cartas ocultas, y solo puedes ver la carta superior. Combina estrategia, memoria y un poquito de suerte 🍀`
  },
  {
    title: "🃏 ¿Qué pilas de cartas existen?",
    content: `
      Pila de inicio (tu meta es vaciarla), pilas de descarte (hasta 4 cartas) y pilas de construcción (comunitarias, todos pueden jugar aquí, ¡en orden!)
    `
  },
  {
    title: "🚀 Comienzo de la partida",
    content: `Cada jugador comienza con una pila de inicio y una mano de 5 cartas. El turno se decide aleatoriamente.`
  },
  {
    title: "🔄 ¿Qué puedo hacer en mi turno?",
    content: `
      Puedes robar si tienes menos de 5 cartas, jugar desde tu mano, pila de inicio o descarte, usar cartas especiales. Si no puedes jugar más, descarta y termina el turno.
    `
  },
  {
    title: "🏁 ¿Cómo termina la partida?",
    content: `El juego termina cuando un jugador vacía su pila de inicio. ¡Ese jugador gana!`
  },
  {
    title: "🃠 Cartas de Habilidad Especial",
    content: `
      Comodín Doble (actúa como 2 números consecutivos), Bloqueo de Turno (impide que un jugador juegue), Jugar cualquier carta de descarte (rompe las reglas normales).
    `
  },
];

function Instructions() {
  return (
    <div className="instructions-grid">
      <h1>¿Cómo se juega?</h1>
      <div className="card-grid">
        {instructionsData.map((item, index) => (
          <div className="flip-card" key={index}>
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <h2>{item.title}</h2>
              </div>
              <div className="flip-card-back">
                <p>{item.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Instructions;