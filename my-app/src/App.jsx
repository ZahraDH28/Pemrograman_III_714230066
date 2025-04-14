import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './pages/dasboard'

function App() {
  return(
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Dashboard />
    </div>
  )
}

export default App
