import React from 'react'
import { Route, Routes } from 'react-router'
import ChatPage from './Pages/ChatPage'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'

const App = () => {
  return (
    <div className='min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden'>

    {/* DECORATORS - GRID BG & GLOW SHAPES */}
      <Routes>
      <Route path="/" element={<ChatPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignupPage/>}/>
    </Routes>
    </div>
  )
}

export default App
