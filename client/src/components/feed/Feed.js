import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getFeedData } from '../../redux/Slice/feedSlice'
import Follower from '../follower/Follower'
import Post from '../post/Post'
import './feed.scss'
const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector(state=>state.feedDataReducer.feedData)
  // console.log('feed data', feedData)

  useEffect(()=>{
    dispatch(getFeedData())
  },[dispatch])

  return (
    <div className='Feed'>
      <div className="container">
        <div className="left-part">
          {feedData?.posts?.map(post=>  <Post key={post._id} post={post} />)}
        </div>
        <div className="right-part">
          <div className="following">
            <h3 className='title'>You are Following</h3>
             {feedData?.followings?.map(user=><Follower user={user} key={user._id}/>)}
          </div>
          <div className="suggestions">
            <div className="title">Suggestion for you</div>
            {feedData?.suggestions?.map(user=><Follower user={user} key={user._id}/>)}
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feed
