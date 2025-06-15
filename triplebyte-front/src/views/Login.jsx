import React, { useState, useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../assets/styles/LoginForms.css'

function Login() {
  const { setToken, setUser } = useContext(AuthContext)
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensaje('')

    const loginData = {
      password,
      ...(identifier.includes('@') ? { mail: identifier } : { nick: identifier })
    }

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, loginData)

      const token = data.data.token
      const user = {
        id: data.data.id,
        nick: data.data.nick,
        mail: data.data.mail,
        isAdmin: data.data.isAdmin 
      }
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      setToken(token)
      setUser(user)

      if (user.isAdmin) {
        navigate('/') 
      } else {
        navigate('/') 
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Error al iniciar sesión'
      setMensaje(msg)
    }
  }

  return (
    <div className="form-container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="identifier">Correo o Nickname</label>
        <input
          id="identifier"
          type="text"
          placeholder="usuario@correo o nombre_usuario"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          placeholder="••••••••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
      </form>
      {mensaje && <p className="error">{mensaje}</p>}
    </div>
  )
}

export default Login