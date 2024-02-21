import React from 'react'
import { Navbar } from './Navbar'
import { useSelector } from 'react-redux'

function Home() {
    const {userInfo} = useSelector((state => state.auth));

  return (
    <>
        <Navbar/>
        <div>Home</div>
        {userInfo ? <h1>{userInfo.data.email}</h1>: <h1>Usr not available</h1>}
    </>
  )
}

export default Home