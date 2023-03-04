import React from 'react'
import Avatar from '../Avatar/Avatar'
import backgroundImg from '../../assests/backgroundImg.jpeg'
import './post.scss'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { LikeAndUnLikePost } from '../../redux/Slice/postsSlice'
import {useNavigate} from 'react-router-dom'
import { showToast } from '../../redux/Slice/appConfigSlice'
import { TOAST_SUCCESS } from '../../App'
const Post = ({ post }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate()
  const handlePostLiked = async (id) => {
    dispatch(showToast({
      type:TOAST_SUCCESS,
      message:'liked or unliked'
    }))
    dispatch(LikeAndUnLikePost({
      postId: id
    }))
  }
  return (
    <div className='Post'>
      <div className="heading" onClick={()=>navigate(`/profile/${post.owner._id}`)}>
        <Avatar src={post?.owner?.avatar?.url} />
        <h4>{post?.owner?.name}</h4>
      </div>
      <div className="content">
        <img src={post?.image.url} alt="" />
      </div>
      <div className="footer">
        <div className="like" onClick={() => handlePostLiked(post._id)}>
          {post?.isLiked ? <AiFillHeart style={{color:'red'}} className='icon'/> : <AiOutlineHeart className='icon' />}
         
          <h4>{`${post?.likesCount}`} likes</h4>
        </div>
        <p className="caption">
          {post?.caption}
        </p>
        <h6 className='time-ago'>{post?.timeago}</h6>
      </div>
    </div>
  )
}

export default Post
