import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home'
import Instructions from './views/Instructions'
import About from './views/About'
import Game from './views/Game'
import Login from './views/Login'
import Register from './views/Register'
import Admin from './views/login/admin'
import Player from './views/login/player'
import GameCreate from './views/Game/GameCreate'
import GameJoin from './views/Game/GameJoin'
import GameHistory from './views/Game/GameHistory'
import GameReports from './views/Game/GameReports'
import GameWaiting from './views/Game/GameWaiting';
import Play2 from './views/Play/Play2'
import Play3 from './views/Play/Play3'
import Play4 from './views/Play/Play4'
import CorrectRegister from './components/CorrectRegister'

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/instructions" element={<Instructions />} />
      <Route path="/about" element={<About />} />
      <Route path="/game" element={<Game />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login/admin" element={<Admin />} />
      <Route path="/login/player" element={<Player />} />
      <Route path="/game/gamecreate" element={<GameCreate />} />
      <Route path="/game/gamejoin" element={<GameJoin />} />
      <Route path="/game/gamehistory" element={<GameHistory />} />
      <Route path="/game/gamereports" element={<GameReports />} />
      <Route path="/game/gamewaiting" element={<GameWaiting />} />
      <Route path="/play/play2" element={<Play2 />} />
      <Route path="/play/play3" element={<Play3 />} />
      <Route path="/play/play4" element={<Play4 />} />
      <Route path="/correctregister" element={<CorrectRegister />} />
    </Routes>
  )
}

export default Routing