import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    navigate('/')
  }
  return (
    <nav className='flex items-center justify-between shadow-lg py-4 px-4'>
      <h1>Daash</h1>
      <button
        onClick={handleLogout}
        className='px-2 py-1 font-medium'
      >
        Logout
      </button>
    </nav>
  )
}

export default Navbar
