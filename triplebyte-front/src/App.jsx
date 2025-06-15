import './assets/styles/App.css'
import Navbar from './components/NavBar'
import Routing from './routing'
import { useLocation } from 'react-router-dom'

function App() {
  const location = useLocation()
  const hideNavbarRoutes = ['/play/play2'] // rutas donde no quieres que se vea la navbar

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <div className="main-content">
        <Routing />
      </div>
    </>
  )
}

export default App
