import React from 'react'
import { useContext } from 'react'
import {AppState} from "../App"

function Home() {
  const {user} =useContext(AppState)
  return (
    <div>
      Home

      <h2>welcom: {user.username}</h2>
    </div>
  )
}

export default Home
