import React, { useEffect } from 'react'
import Content from './Content/Content'
import Sidebar from './Sidebar/Sidebar'
import {useNavigate} from "react-router-dom"
export default function Layout() {
  const token = localStorage.getItem('token') 
  const navigate = useNavigate()


  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[navigate,token])

  return (
    <div className='flex bg-red h-screen font-RobotoMono'>
        
        <Sidebar/>
        <Content/>
    </div>
  )
}
