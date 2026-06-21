import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Game from './pages/Game.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './Layout.jsx'
import HomeScreen from './pages/HomeScreen.jsx'
import Leaderboard from './pages/Leaderboard.jsx'
import GameProvider from './context/GameContext.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomeScreen />} />
            <Route path='scenes/:sceneId' element={<Game />} />
            <Route path='leaderboard' element={<Leaderboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GameProvider>
    
  // </StrictMode>,
)
