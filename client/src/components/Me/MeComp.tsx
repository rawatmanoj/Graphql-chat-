import React, { useState } from 'react'
import AddFriends from './AddFriends'
import All from './All'
import MeHeader from './MeHeader'
import Pending from './Pending'

export default function MeComp() {

    const [tab,setTab] = useState("addFriends")

    const handleAddFriends = ()=>{
        setTab("addFriends")
    }

    const handlePendingRequest = ()=>{
        setTab("PendingRequest")
    }

    const showAllFriends = ()=>{
        setTab("showallfriends")
    }
    console.log(tab)
  return (
    <div className='h-screen'>
        <MeHeader handleAddFriends={handleAddFriends} handlePendingRequest={handlePendingRequest} showAllFriends={showAllFriends}/>
       {tab === "addFriends" && <AddFriends/>} 
       {tab === "PendingRequest" && <Pending />} 
       {tab === "showallfriends" && <All />} 
    </div>
  )
}
