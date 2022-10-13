import React from 'react'
import { room } from '../../types/RoomType'


type ChatHeaderProps = {
    room:room
}

export default function ChatHeader({room}:ChatHeaderProps) {
    const userId = JSON.parse(localStorage.getItem('user') as string)._id  

    const getOtherUser = ()=>{
        let res:any = room?.participants.find((user:any)=>user._id !== userId);
        if(res){
            return res?.name;
        }else {
            return ""
        }
    }

  return (
    <div className='text-lightest-slate bg-light-navy h-14 outline-none border-none flex items-center pl-4'>
        <span>
           @{getOtherUser()}
        </span>
    </div>
  )
}
