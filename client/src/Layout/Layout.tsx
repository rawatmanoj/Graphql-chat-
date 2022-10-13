import React from 'react'
import Content from './Content/Content'
import Sidebar from './Sidebar/Sidebar'

export default function Layout() {
  return (
    <div className='flex bg-red h-screen font-RobotoMono'>
        <Sidebar/>
        <Content/>
    </div>
  )
}
