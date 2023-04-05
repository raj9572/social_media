// import React, { useRef, useState } from 'react'
import React from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import {   useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { } from '../../redux/Slice/appConfigSlice.js'
import { axiosClient } from '../../Utils/axiosClient.js'
import { KEY_ACCESS_TOKEN, removeItem } from '../../Utils/localStorageManager.js'
// import { setLoading } from '../../redux/Slice/appConfigSlice.js'
import Avatar from '../Avatar/Avatar.js'
import './navbar.scss'

const Navbar = () => {

  // const loadingRef = useRef()
  // const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  const myProfile = useSelector(state=>state.appConfigReducer.myProfile)
  

  async function handleLogoutClick(){
     try {
        await axiosClient.post('/auth/logout');
        removeItem(KEY_ACCESS_TOKEN)
        navigate('/login');
     } catch (error) {
       console.log(error)
     }
  }

  return (
    <div className='Navbar'>
      <div className="container">
        <h2 className="banner hover-link" onClick={()=>navigate("/")}> Social Media</h2>
        <div className="right-side">
          <div className="profile hover-link" onClick={()=>navigate(`profile/${myProfile._id}`)}>
            <Avatar src={myProfile?.avatar?.url}/>
          </div>
          <div className="logout hover-link" onClick={handleLogoutClick}>
            <AiOutlineLogout/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
