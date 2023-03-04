import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { getItem, KEY_ACCESS_TOKEN } from '../Utils/localStorageManager'

const OnlyIfNotLogged = () => {
    const user = getItem(KEY_ACCESS_TOKEN)
  return (
  
       user ? <Navigate to='/' /> : <Outlet/>
    
  )
}

export default OnlyIfNotLogged
