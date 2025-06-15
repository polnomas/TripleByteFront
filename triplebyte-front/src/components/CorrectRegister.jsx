import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/styles/CorrectRegister.css' 

function CorrectRegister() {
  const navigate = useNavigate()

  const handleClick = () => {navigate('/login')}

  return (
    <div className="login-container">
      <h1>¡Registro exitoso!</h1>
      <p>Tu cuenta ha sido creada exitosamente. Apreta el botón para iniciar sesión.</p>
      <div className="button-group">
        <button onClick={handleClick}>Inicia sesión</button>
      </div>
    </div>
  )
}

export default CorrectRegister