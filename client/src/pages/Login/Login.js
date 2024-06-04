import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './login.scss'
import { axiosClient } from '../../Utils/axiosClient'
import { KEY_ACCESS_TOKEN, setItem } from '../../Utils/localStorageManager'
import {useNavigate} from 'react-router-dom'
const Login = () => {
  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const handleSubmit = async(e)=>{
    e.preventDefault()
    // console.log(email,password)
   try {
    const response = await axiosClient.post('/auth/login',{
      email,
      password
    })
    setItem(KEY_ACCESS_TOKEN,response.result.accessToken)
   
    navigate("/")
   } catch (error) {
    // console.log('error',error)
   }

    
  }

  



  return (
    <div className='login'>
       <div className="login-box">
        <h2 className='heading'>Login</h2>
        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" onChange={(e)=>setEmail(e.target.value)} className='email' placeholder='Enter your email' id='email' />

            
            <label htmlFor="password">Password</label>
            <input type="text" onChange={(e)=>setPassword(e.target.value)} className='password' placeholder='Enter your password' id='password' />

            <input type="submit"  value="submit" className='submit' />
        </form>
        <p className='subheading'>Do not have an account? <Link to="/signup">SignUp</Link> </p>
       </div>
    </div>
  )
}

export default Login
