import React from 'react'
import './Avatar.scss'
import userImg from '../../assests/user.png'
const Avatar = ({src}) => {
  return (
    <div className='Avatar'>
       <img src={src ? src : userImg} alt="user Avatar" />
    </div>
  )
}

export default Avatar
