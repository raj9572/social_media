/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { followAndUnFollowUser } from '../../redux/Slice/feedSlice'
import Avatar from '../Avatar/Avatar'
import './Follower.scss'

const Follower = ({user}) => {
 const dispatch = useDispatch();
 const navigate = useNavigate()
 const feedData = useSelector(state=>state.feedDataReducer.feedData)

 const [isFollowing,setIsFollowing] = useState()

 useEffect(()=>{
   
    setIsFollowing(feedData.followings.find(item=>item._id === user._id))

 },[feedData,dispatch])

 const handleUserFollow=()=>{
  dispatch(followAndUnFollowUser({
    userIdFollow:user?._id
  }))
 }
  return (
    <div className='Follower'>
        <div className="user-info"  onClick={()=>navigate(`/profile/${user?._id}`)} >
        <Avatar src={user?.avatar?.url}/>
        <h4 className='name'>{user?.name}</h4>
        </div>
        <h5 onClick={handleUserFollow} className={`hover-link follow-link`}>{isFollowing ? 'UnFollow':"Follow"}</h5>
    </div>
  )
}

export default Follower
