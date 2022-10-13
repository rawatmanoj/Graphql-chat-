import React, { useState } from 'react'
import {useMutation} from "@apollo/client"
import { SEND_FRIEND_REQUEST } from '../../graphql/queries';
export default function AddFriends() {

    const[value,setValue] = useState("");
    const [senfFriendReq,{data}] = useMutation(SEND_FRIEND_REQUEST)
    const userId = JSON.parse(localStorage.getItem('user') as string)._id  

    const handleSubmit =async (event:React.KeyboardEvent<HTMLInputElement>)=>{
        console.log(event.key)
        if(event.key==="Enter"){
           await senfFriendReq({
                variables: {
                    sendFriendRequestInput:{
                    requester:userId,
                    recipient:value
                     }
                }
            })
            setValue("")
        }
        
    }

    const setInputValue = (event:React.ChangeEvent<HTMLInputElement>)=>{
        console.log(event.target.value)
        setValue(event.target.value)
    }
    
  return (
    <div className='flex justify-center h-full'>
        <div className='flex flex-col items-start justify-evenly text-light-slate ml-10 mt-10 w-full h-40'>
            <span>Add Friend</span>
         <input
        className='rounded-md bg-lightest-slate text-black h-10 w-10/12 outline-none border-none pl-2'
            onChange={setInputValue}
            value={value}
            onKeyDown={handleSubmit}
        />
        </div>
    </div>
  )
}
