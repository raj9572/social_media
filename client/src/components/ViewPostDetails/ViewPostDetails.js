/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Avatar from '../Avatar/Avatar'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { FaCommentAlt } from 'react-icons/fa'
import { axiosClient } from '../../Utils/axiosClient'
import { useDispatch } from 'react-redux'
import { showToast } from '../../redux/Slice/appConfigSlice'
import { LikeAndUnLikePost } from '../../redux/Slice/postsSlice'
import { TOAST_SUCCESS } from '../../App'
import './viewpostdetails.scss'

const ViewPostDetails = () => {
   const dispatch = useDispatch()
   const { postId } = useParams()
   const [post, setPost] = useState({})
   const [key , setKey ] = useState(2)
   const [comments,setComments] = useState([])
   const navigate = useNavigate()
   useEffect(() => {
      getpostDetails()
   }, [dispatch,key])



   const getpostDetails = async () => {
      const postDetails = await Promise.all([axiosClient.get(`post/postDetails/${postId}`),axiosClient.get(`post/getcomments/${postId}`)]) 
      setPost(postDetails[0].result.post)
      setComments(postDetails[1].result.comments)
      // console.log('postDetails',postDetails)
   }

   const handlePostLiked = async (id) => {
      dispatch(showToast({
         type: TOAST_SUCCESS,
         message: 'liked or unliked'
      }))
      dispatch(LikeAndUnLikePost({
         postId: id
      }))
      setKey(Math.random())
  
    }


   return (

      <div className="ViewPostContainer">

      
      <div className='ViewPost'>
         <div className="heading" onClick={() => navigate(`/profile/${post.owner._id}`)}>
            <Avatar src={post?.owner?.avatar?.url} />
            <h4>{post?.owner?.name}</h4>
         </div>
         <div className="content">
            <img src={post?.image?.url}  alt="" />
         </div>
         <div className="footer">
            <div className="like" onClick={() => handlePostLiked(post._id)}>
            {post?.isLiked ? <AiFillHeart style={{ color: 'red' }} className='icon' /> : <AiOutlineHeart className='icon' />}
            <h4>{`${post?.likesCount}`} likes</h4>
            </div>
            <p className='caption'>
               {post?.caption}
            </p>
            <h6 className='time-ago'>{post?.timeago}</h6>
         </div>
         <div className="comment">
            <input className='inputComment' type="text" placeholder='Enter your comment....' />
            <button className='btn' >comment</button>
            <FaCommentAlt style={{ color: 'gray' }} className='icon' />
            <span style={{ color: 'black' }} className='commentCount'>{comments?.length}</span>
         </div>
         <div className='commentView'>
            {comments?.map(comment=>(
                  <div className='userComment'>
                     <Avatar src={comment?.userId?.avatar?.url} />
                     <p>{comment.commentText}</p>
                  </div>
            ))}
            
           
         </div>
      </div>
      </div>
   )
}

export default ViewPostDetails
