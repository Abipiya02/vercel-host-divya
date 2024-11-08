import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
        Home page
        <Link path='/register'>Register</Link>
        <Link path='/login'>Login</Link>

    </div>
  )
}

export default Home