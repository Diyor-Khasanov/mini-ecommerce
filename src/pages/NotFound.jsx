import { BadgeX } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import useTheme from '../context/useTheme'

const NotFound = () => {
  const {theme} = useTheme();
  
  return (
    <div className={`flex flex-col items-center justify-center h-screen ${theme === "dark" ? "bg-slate-800 text-white" : "bg-white text-slate-800"}`}>
      <h1 className='text-6xl font-bold flex items-center'>
        4
        <BadgeX className='w-12 h-12' />
        4 
      </h1>
      <p className='text-xl mt-4'>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className='mt-4 bg-purple-600 text-white px-6 py-2 rounded'>Back to Home</Link>
    </div>
  )
}

export default NotFound