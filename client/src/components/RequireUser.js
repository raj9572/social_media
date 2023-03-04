import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getItem, KEY_ACCESS_TOKEN } from '../Utils/localStorageManager'

const RequireUser = () => {
    const user = getItem(KEY_ACCESS_TOKEN)
  return (
    <div>
      {user ? <Outlet/> :<Navigate to='/login'/>} 
    </div>
  )
}

export default RequireUser
