import React from 'react';
import '../assets/styles/About.css';

function About() {
  return (
    <div className="about-container">
      <h1>Sobre Nosotros</h1>
      <p>
        ¡Hola! Somos un grupo de estudiantes de la Escuela de Ingeniería de la Pontificia Universidad Católica de Chile. 
        Este proyecto forma parte de una entrega en la que buscamos aplicar lo aprendido en desarrollo web. 
        ¿El objetivo? Crear una aplicación entretenida, dinámica y basada en el juego <strong>Skip-Bo</strong>. 
      </p>

      <h1>Conoce al equipo</h1>

      <h3>🧠 María Teresita Bustamante</h3>
      <p>
        Mayor en Investigación Operativa · Minor en Tecnologías de la Información.
      </p>

      <h3>💻 Pablo Altamirano</h3>
      <p>
        Mayor en Computación y Sistemas de Información (Track Computación) · Minor en Fundamentos de la Computación.
      </p>

      <h3>📘 Sofía Schele</h3>
      <p>
        Mayor en Investigación Operativa · Minor en Tecnologías de la Información.
      </p>

      <p>
        Gracias por darte el tiempo de conocernos y visitar nuestra aplicación. 
        ¡Esperamos que la disfrutes tanto como nosotros disfrutamos hacerla!
      </p>
    </div>
  );
}

export default About;