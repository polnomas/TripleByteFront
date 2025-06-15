import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../assets/styles/LoginForms.css'

function Player() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMensaje('')

    const datosLogin = {
      password,
      ...(identifier.includes('@') ? { mail: identifier } : { nick: identifier })
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        datosLogin
      )

      localStorage.setItem('user', JSON.stringify(data.data))
      navigate('/home')
    } catch (error) {
      const msg = error.response?.data?.message || 
                  (error.response?.status === 401 ? 'Credenciales inválidas' : 'Error al iniciar sesión')
      setMensaje(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="form-container">
      <h1>Ingreso Jugador</h1>
      <form onSubmit={handleSubmit}>
        <label>Correo electrónico o Nickname</label>
        <input
          type="text"
          placeholder="tucorreo@ejemplo.com o tu_nickname"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          placeholder="••••••••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Cargando...' : 'Ingresar'}
        </button>
      </form>

      {mensaje && (
        <div className={`message ${mensaje.includes('correctamente') ? 'success' : 'error'}`}>
          {mensaje}
        </div>
      )}
    </div>
  )
}

export default Player




