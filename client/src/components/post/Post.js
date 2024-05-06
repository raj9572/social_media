import React, { useState } from 'react'
import Avatar from '../Avatar/Avatar'
// import backgroundImg from '../../assests/backgroundImg.jpeg'
import './post.scss'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import {FaCommentAlt} from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { LikeAndUnLikePost } from '../../redux/Slice/postsSlice'
import { useNavigate } from 'react-router-dom'
import { showToast } from '../../redux/Slice/appConfigSlice'
import { TOAST_SUCCESS } from '../../App'
import { axiosClient } from '../../Utils/axiosClient'
const Post = ({ post }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('')
  const navigate = useNavigate()

  const handlePostLiked = async (id) => {
    dispatch(showToast({
      type: TOAST_SUCCESS,
      message: 'liked or unliked'
    }))
    dispatch(LikeAndUnLikePost({
      postId: id
    }))

  }

  const handleComment = async (id) => {
      const response = await axiosClient.post("post/postcomment", {
        commentText:comment,
        postId:id
      })
      // console.log('response in comment', response)
      dispatch(showToast({
        type: TOAST_SUCCESS,
        message: response.result
      }))

      setComment('')

  }
  return (
    <div className='Post' >
      <div className="heading" onClick={() => navigate(`/profile/${post.owner._id}`)}>
        <Avatar src={post?.owner?.avatar?.url} />
        <h4>{post?.owner?.name}</h4>
      </div>
      <div className="content">
        <img src={post?.image?.url} alt="" />
      </div>
      <div className="footer">
        <div className="like" onClick={() => handlePostLiked(post._id)}>
          {post?.isLiked ? <AiFillHeart style={{ color: 'red' }} className='icon' /> : <AiOutlineHeart className='icon' />}

          <h4>{`${post?.likesCount}`} likes</h4>
        </div>
        <p className="caption">
          {post?.caption}
        </p>
        <h6 className='time-ago'>{post?.timeago}</h6>
      </div>
      <div className="comment">
        <input className='inputComment' type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Enter your comment....' />
        <button className='btn' onClick={()=>handleComment(post._id)}>comment</button>
        <FaCommentAlt style={{color:'gray'}}  className='icon' onClick={()=>navigate(`/viewPostDetails/${post._id}`)}/>
        {/* <span style={{color:'red'}} className='commentCount'>{post?.comments?.length}</span> */}
        {/* <span style={{color:'red'}} className='commentCount'></span> */}
      </div>
    </div>
  )
}

export default Post
