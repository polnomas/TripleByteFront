
# 🎲 Skip-Bo Web App — TripleByte_front_s2

## 💻 Descripción General
Es una aplicación web desarrollada con **React** para gestionar y jugar Skip-Bo en línea que incluye autenticación con **JWT**, roles de **usuario** y **administrador**, protección de rutas, navegación amigable y diseño modular. Además, el frontend se comunica con una API RESTful desarrollada en **Koa**.

---

### 🎨 Mockups actualizados

Los mockups actualizados pueden verse en el PDF subido. También puede verse en en este [link](https://www.canva.com/design/DAGmV__rMsw/CXmamCSBptf4C09njFgAeQ/view?utm_content=DAGmV__rMsw&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h38d3c637e5).

---

## 📁 Estructura del Proyecto

```
triplebyte-front/
│
├── src/
│   ├── components/       # Componentes reutilizables
│   ├── assets/
│   │   └── styles/       # Archivos CSS por componente/vista
│   ├── auth/             # Lógica de autenticación
│   └── views/            # Vistas principales (Home, Game, About...)
├── index.html
├── package.json
├── README.md
└── .gitignore
```

---

## ⚙️ Instalación y Ejecución

1. **Instalar dependencias:**
```sh
cd triplebyte-front
yarn install
```

2. **Levantar entorno de desarrollo:**
```sh
yarn dev
```

3. **Acceder a la app:**
[http://localhost:5173](http://localhost:5173)

---

## 🧭 Navegación y Páginas

🔹**Barra de navegación** siempre visible, implementada con `<nav>`, permite ir a:
- Inicio
- Instrucciones
- Nosotros
- Ir a partida (Juego)
- Login
- Registro
- Historial y Reportes (solo admin)

🔹**Navegación** implementada con React Router.

🔹**Páginas estáticas:**
- Instrucciones (`/instructions`)
- Nosotros (`/about`)

🔹**Página de inicio:** amigable, con títulos, menús y orientación clara.

🔹**Página de partida:** modular, con componentes reutilizables para crear y unirse a salas.

🔹**Estilos:** cada componente/vista tiene su propio archivo CSS, donde se usa Flexbox y Grid para diseño.

---

## 🔐 Autenticación y Roles

🔹**Registro e inicio de sesión:** los usuarios pueden registrarse como usuario normal o admin, y, al iniciar sesión, reciben un JWT.

🔹**Validación de tokens:** el backend valida el JWT en cada endpoint protegido y el acceso es denegado si el token es inválido o expiró.

---

## 🔐 Protección de Rutas

Este proyecto implementa un sistema de autenticación y autorización basado en **tokens JWT**, cumpliendo con los siguientes principios de seguridad:

### ✅ Reglas de acceso

- 🔒 **Sólo los usuarios autenticados** pueden acceder a rutas protegidas como:
  - `JUGAR` (`/game`, `/game/gamecreate`, `/game/gamejoin`, `/play`)
  - `HISTORIAL` (`/game/gamehistory`)
  - `REPORTES` (`/game/gamereports`)

- 🛡️ **Los administradores** (usuarios con `isAdmin: true`) tienen acceso exclusivo a:
  - `/game/gamehistory`
  - `/game/gamereports`

- 🧾 El token **JWT** se guarda en `localStorage` en el frontend, y se **adjunta en el header `Authorization`** con cada request a rutas protegidas (`Bearer <token>`).

---

### 🔄 Redirección al login si no hay token

Las vistas protegidas verifican, mediante `useEffect`, si existe un token y un usuario guardado en `localStorage`. Si no están presentes, el usuario es **redirigido automáticamente a `/login`**, previniendo el acceso a secciones restringidas.

```js
useEffect(() => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  if (!token || !user) {
    navigate('/login')
  }
}, [])

---

### 🔐 Protección de rutas manuales

Aunque técnicamente es posible acceder manualmente escribiendo una ruta en el navegador (por ejemplo `/game/gamejoin` o `/game/gamereports`), si el usuario **no está autenticado**, el frontend se encarga de:

- 🚫 Evitar la carga de contenido.
- 🔄 Redirigir automáticamente al login.
- 🔐 Proteger las llamadas a la API enviando el token sólo cuando corresponde.

Esto asegura que **no se pueda interactuar con el backend ni visualizar contenido restringido** sin autenticación.

---

### ⚠️ Sobre `/play`

Debido a que `/play` requiere un estado de partida (`gameState`) que se transmite mediante navegación con `location.state`, **no es posible acceder directamente escribiendo `/play` en el navegador**, ya que el componente depende de esos datos previos.

En consecuencia:

- Si el usuario intenta acceder manualmente, la vista **no funcionará correctamente** (no hay estado de juego).
- Esto **refuerza la seguridad por navegación guiada**: el usuario sólo puede llegar a `/play` a través del flujo adecuado (crear o unirse a una sala).


---

## 🔗 Endpoints de Juego

🔹`api/play/start_game`: permite empezar el juego. Se cumple cuando el dueño de la partida, vale decir el dueño de la sala de juego, hace click en el botón de empezar. 
🔹`api/play/make_a_move`: permite realizar un movimiento. En este caso, específicamente, al inicio del juego se puede dar click en la Draw Pile robar la carta y ponerla en la mano propia.

📌 **Ejemplo de solicitud protegida:**
```js
const token = localStorage.getItem('token')
await axios.get(
`${import.meta.env.VITE_BACKEND_URL}/api/secure/gamejoin`,
{
headers: {
Authorization: `Bearer ${token}`
}
}
)
```

---


## 🕹️ Guía de Uso

### 👤 Para usuarios:
1. Registrarse con correo, contraseña y nickname.
2. Iniciar sesión para acceder a las funciones del juego (sólo usuarios autenticados pueden crear o unirse a las partidas). En esta página se puede acceder a las opciones de la barra de navegación, donde también aparece el nickname.
4. Leer instrucciones, explorar la sección "Nosotros" o jugar partidas del juego
5. Cerrar sesión desde la barra.

### 🛠️ Para administradores:
Todavia no tenemos implementado como hacer que un usuario pasa de ser un usuario autenticado a un administrador, por lo que para ver lo que puede ver un administrador se puede cambiar la columna isAdmin. Para esto, en postman, se puede actualizar esta columna con PATCH (la columna a actualizar es isAdmin:  true). Luego de que se cambia esa columna, se debe cerrar sesión y luego iniciar nuevamente.
1. Iniciar sesión como adminnistrador.
2. Acceder exclusivamente a historial de partidas y reportes. También se puede usar todas las funciones de usuario.
3. Cerrar sesión desde la barra.

#### 🔁 En cualquier caso, al cerrar sesión, se elimina el token y se actualiza automáticamente la vista.
---

## ⚙️ Consideraciones Técnicas

- 🔁 Navegación con **React Router**.
- 🧠 Estado global de autenticación con **Context API**.
- 📡 Solicitudes HTTP usando **Axios**.
- 🔐 Autenticación y autorización con **JWT**.
- 🧩 **Diseño modular** y responsivo con CSS personalizado por vista.


---

## ⚠️ Reglas y Consideraciones

- El backend debe estar corriendo y accesible en la URL definida en `.env`.
- Los tokens **JWT** tienen expiración. Si expiran, el usuario debe iniciar sesión nuevamente.
- El sistema **distingue entre usuarios y administradores** para restringir el acceso a rutas.

---

## 👥 Integrantes

- Sofía Schele Laso  
- Pablo Altamirano  
- María Teresita Bustamante Chateau