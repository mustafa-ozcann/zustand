import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className='bg-gray-800 text-white p-4'>
        <nav className='container mx-auto'>
            <ul className='flex gap-4'>
                <li>
                    <Link to="/" className='hover:text-gray-300'>Home</Link>
                </li>
                <li>
                    <Link to="/users" className='hover:text-gray-300'>Users</Link>
                </li>
                <li>
                    <Link to="/todo">Todo</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default Header