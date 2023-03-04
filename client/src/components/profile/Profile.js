import React, { useEffect, useState } from 'react'
import Post from '../post/Post'
import './Profile.scss'
import userImg from '../../assests/user.png'
import { useNavigate, useParams } from 'react-router-dom'
import CreatePost from '../CreatePost/CreatePost'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../../redux/Slice/postsSlice'
import { followAndUnFollowUser } from '../../redux/Slice/feedSlice'

const Profile = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const userProfile = useSelector(state => state.postReducer.userProfile)
  const myProfile = useSelector(state => state.appConfigReducer.myProfile)
  const [isMyProfile, setMyProfile] = useState(false)
  const [isFollowing,setIsFollowing] = useState(false)
 const feedData = useSelector(state=>state.feedDataReducer.feedData)


  useEffect(() => {
    dispatch(getUserProfile({ userId: params.userId }))
    setMyProfile(myProfile?._id === params.userId)
    setIsFollowing(feedData?.followings?.find(item=>item._id === params.userId))
  }, [myProfile,params.userId,feedData])


  const handleUserFollow = ()=>{
    dispatch(followAndUnFollowUser({
      userIdFollow:params.userId
    }))
  }

  return (
    <div className='Profile'>
      <div className="container">
        <div className="left-part">
         {isMyProfile && <CreatePost />}
          {userProfile?.posts?.map(post => <Post key={post._id} post={post} />)}
        </div>
        <div className="right-part">
          <div className="profile-card">
            <img className='user-img' src={userProfile?.avatar?.url} alt="user" />
            <h3 className='user-name'>{userProfile.name}</h3>
            <p>{userProfile?.bio}</p>
            <div className="follwer-info">
              <h4>{`${userProfile?.followers?.length} follower`}</h4>
              <h4>{`${userProfile?.followings?.length} followings`} </h4>
            </div>
            {!isMyProfile && <button className='follow btn-primary' onClick={handleUserFollow}>{isFollowing ? "UnFollow" :"Follow"}</button>}
            {isMyProfile && <button className='update-profile btn-secondary' onClick={() => navigate('/updateProfile')}>Update Profile</button>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
