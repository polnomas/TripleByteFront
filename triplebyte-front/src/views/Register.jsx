import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../assets/styles/Register.css'
import { AuthContext } from '../auth/AuthContext' 

function Register() {
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [mensaje, setMensaje] = useState('')
  const navigate = useNavigate()

  const { setToken, setUser } = useContext(AuthContext) 

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
        nick: nickname,
        mail: mail,
        password: password
      })
      const user = {
        id: response.data.data.id,
        nick: response.data.data.nick,
        mail: response.data.data.mail,
        isAdmin: response.data.data.isAdmin
      }
      const token = response.data.data.token
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify({
        id: response.data.data.id,
        nick: response.data.data.nick,
        mail: response.data.data.mail
      }))
      setToken(token)
      setUser(user)
      navigate('/correctregister')
    } catch (error) {
      console.log(error.response)
      setMensaje('Error al crear usuario')
    }
  }

  return (
    <div className="register-container">
      <h1>Crear Cuenta</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="mail">Correo electrónico</label>
        <input
          type="email"
          id="mail"
          placeholder="usuario@ejemplo.cl"
          value={mail}
          onChange={e => setMail(e.target.value)}
          required
        />

        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          placeholder="••••••••••••••"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <label htmlFor="nickname">Nickname</label>
        <input
          type="text"
          id="nickname"
          placeholder="Nombre de usuario"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          required
        />

        <button type="submit">Crear</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  )
}

export default Register
