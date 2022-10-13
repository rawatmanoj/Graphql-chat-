import React, { useCallback, useState } from 'react'
import {useMutation} from "@apollo/client"
import { ADD_MESSAGE } from '../../graphql/queries';
import { room } from '../../types/RoomType';


type ChatInputProps = {
    room:room
}

export default function ChatInput({room}:ChatInputProps) {
    const [value,setValue] = useState("");
    const [addMessage,{data}] = useMutation(ADD_MESSAGE)
    const setInputValue = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setValue(event.target.value)
      }

    const userId = JSON.parse(localStorage.getItem('user') as string)._id  

    const handleSubmit = (event:any)=>{
        if (event.key === 'Enter') {
            addMessage({
                variables:{
                    messageInput:{
                    roomId:room._id,
                    text:value,
                    sender:userId
                }
                } 
            })
           
            setValue("")
        }
    }  

  return (
    <input
        className='rounded-md bg-lightest-slate h-10 mb-10 w-11/12 m-auto outline-none border-none pl-2'
        onChange={setInputValue}
        value={value}
        onKeyDown={handleSubmit}
        />
  )
}
