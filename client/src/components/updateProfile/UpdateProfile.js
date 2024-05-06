import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userImage from '../../assests/user.png'
import { updateMyProfile} from '../../redux/Slice/appConfigSlice'
import './updateProfile.scss'

const UpdateProfile = () => {
  const dispatch = useDispatch()

  const myProfile = useSelector(state=>state.appConfigReducer.myProfile)
  const [name,setName] = useState('');
  const [bio,setBio] = useState('')
  const [userImg,setUserImg]= useState('')

  useEffect(()=>{
      
       setName(myProfile?.name || '');
       setBio(myProfile?.bio || '')
       setUserImg(myProfile?.avatar?.url)
  },[myProfile])

  function handleImageChange(e){
      const file = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = ()=>{
        if(fileReader.readyState === fileReader.DONE){
          setUserImg(fileReader.result)
        }
      }
  }
  function handleSubmitUpdate(e){
    e.preventDefault()
    dispatch(updateMyProfile({name,bio,userImg}))
  }



  return (
    <div className='UpdateProfile'>
       <div className="container">
           <div className="left-part">
              <div className="input-user-img">
                <label htmlFor="inputImg" className='labelImg'>
                <img src={userImg ? userImg : userImage} alt="username" />
                </label>
                <input className='inputImg' id='inputImg' type="file" accept='image/*' onChange={handleImageChange} />
              </div>
           </div>
           <div className="right-part">
            <form onSubmit={handleSubmitUpdate}>
                <input value={name} type="text" placeholder='Your Name' onChange={(e)=>setName(e.target.value)} />
                <input value={bio} type="text" placeholder='Your bio' onChange={(e)=>setBio(e.target.value)} />
                <input type="submit" className='btn btn-primary' onClick={handleSubmitUpdate} />
            </form>

            <button className='delete-account btn-primary'>delete Account</button>
           </div>
       </div>
    </div>
  )
}

export default UpdateProfile
