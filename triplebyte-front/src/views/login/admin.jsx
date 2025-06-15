import React from 'react'
import '../../assets/styles/LoginForms.css'

function Admin() {
  return (
    <div className="form-container">
      <h1>Ingreso Administrador</h1>
      <form>
        <label htmlFor="email">Correo electrónico</label>
        <input type="email" id="correo" placeholder="admin@ejemplo.cl" required />

        <label htmlFor="password">Contraseña</label>
        <input type="password" id="password" placeholder="••••••••••••••" required />

        <button type="submit">Ingresar</button>
      </form>
    </div>
  )
}

export default Admin
