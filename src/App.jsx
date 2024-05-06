import { useState, useEffect } from 'react'
import Form from './components/Form'
import Dashboard from './components/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Form/> }/>
                <Route path='/dashboard' element={ <Dashboard/> }/>
            </Routes>
        </BrowserRouter>
        
      
    </>
  )
}

export default App
