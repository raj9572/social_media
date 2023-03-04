import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { axiosClient } from '../../Utils/axiosClient'
import './signUp.scss'
const SignUp = () => {
  const [name,setName ] = useState('')
  const [email,setEmail ] = useState('')
  const [password,setPassword ] = useState('')
  
  const handleSubmit=async(e)=>{
     e.preventDefault();
     try {
      const result = await axiosClient.post('/auth/signup',{
        name,
        email,
        password
       }) 
       console.log('result froms ignup',result)
     } catch (error) {
      console.log(error)
     }

  }

  return (
    <div className='signUp'>
       <div className="signup-box">
        <h2 className='heading'>SignUp</h2>
        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="name">name</label>
            <input type="text" onChange={(e)=>setName(e.target.value)} className='name' placeholder='Enter your name' id='name' />

            <label htmlFor="email">Email</label>
            <input type="email" onChange={(e)=>setEmail(e.target.value)} className='email' placeholder='Enter your email' id='email' />

            
            <label htmlFor="password">Password</label>
            <input type="text" onChange={(e)=>setPassword(e.target.value)} className='password' placeholder='Enter your password' id='password' />

            <input type="submit" value="submit" className='submit' />
        </form>
        <p className='subheading'>Already have an account? <Link to='/login'>Login</Link></p>
       </div>
    </div>
  )
}

export default SignUp
