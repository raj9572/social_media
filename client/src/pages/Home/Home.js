import React, { useEffect } from 'react'
// import { axiosClient } from '../../Utils/axiosClient'
import Navbar from '../../components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getMYInfo } from '../../redux/Slice/appConfigSlice'
const Home = () => {

  const dispatch = useDispatch()



    useEffect(()=>{
      dispatch(getMYInfo())
        
    },[])

    // async function fetchData(){
    //     const response = await axiosClient.get('/post/all')
    //     console.log(' respose get by home', response)
    // }
  return (
    <div>
      <Navbar/>
      <div className='outlet' style={{marginTop:'60px'}}>
      <Outlet/>
      </div>
    </div>
  )
}

export default Home
