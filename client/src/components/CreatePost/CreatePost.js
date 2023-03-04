import React, { useState } from 'react'
import Avatar from '../Avatar/Avatar'
import './createPost.scss'
import backgroundDummyImg from '../../assests/backgroundImg.jpeg'
import { BsCardImage } from 'react-icons/bs'
import { axiosClient } from '../../Utils/axiosClient'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../redux/Slice/appConfigSlice'
import { getUserProfile } from '../../redux/Slice/postsSlice'
const CreatePost = () => {
    const myProfile = useSelector(state => state.appConfigReducer.myProfile)

    const [postImg, setPostImg] = useState('')
    const [caption, setCaption] = useState('')
    const dispatch = useDispatch();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            if (fileReader.readyState === fileReader.DONE) {
                setPostImg(fileReader.result)
            }
        }
    }

    const handlePostSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await axiosClient.post('/post', {
                caption,
                postImg
            })
            dispatch(getUserProfile({ userId: myProfile?._id }))
        } catch (error) {

        }
        finally {
            setCaption('');
            setPostImg('');
        }
    }

    return (
        <div className='CreatePost'>
            <div className="left-part">
                <Avatar src={myProfile?.avatar?.url} />
            </div>

            <div className="right-part">
                <input value={caption} type="text" onChange={(e) => setCaption(e.target.value)} className='captionInput' placeholder='whats on your mind' />

                {postImg && <div className="img-container">
                    <img className='post-img' src={postImg} alt="postImg" />
                </div  >}


                <div className="bottom-part">
                    <div className="input-post-img">
                        <label htmlFor="inputImg" className='labelImg'>
                            <BsCardImage />
                        </label>
                        <input className='inputImg' id='inputImg' type="file" accept='image/*' onChange={handleImageChange} />
                    </div>
                    <button className='post-btn btn-primary' onClick={handlePostSubmit}>Post</button>
                </div>
            </div>
        </div>
    )
}

export default CreatePost
