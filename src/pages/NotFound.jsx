import { BadgeX } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
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