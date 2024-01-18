import { useState, useEffect } from 'react'
import Form from './components/Form'
import Dashboard from './components/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  
  const [user, setUser] = useState("")

  function setCurrentUser(currentUser){
    setUser(currentUser)
  }

  useEffect(()=>{
    console.log(user)
  }, [user])

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Form login={setCurrentUser} /> }/>
                <Route path='/dashboard' element={ <Dashboard logout={setCurrentUser}/> }/>
            </Routes>
        </BrowserRouter>
        
      
    </>
  )
}

export default App
