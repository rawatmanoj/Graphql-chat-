import React,{memo, useCallback, useEffect, useRef, useState} from 'react'
import { room } from '../../types/RoomType'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'



type ChatBodyCompProp = {
    messages:any,
    room:{
        getRoom:room,
       
    },
}

function ChatBodyComp({messages,room}:ChatBodyCompProp) {
    console.log(messages)
    const ref = useRef<HTMLInputElement>(null)

    useEffect(()=>{
        console.log(ref.current)
        ref?.current?.scrollIntoView()
    },[messages?.getMessages?.length])



    const getSender = (id:string)=>{
        return room?.getRoom?.participants.find((user:any)=>user._id === id);
    }

    



    const renderMessages = ()=>{
       let messagesList =  messages?.getMessages.map((msg:any)=>{
            const sender:any = getSender(msg.sender);
            return(
                <React.Fragment key={msg._id}>
                    <div className='pl-10 rounded-xl h-fit flex mb-10 text-lightest-slate '>
                        <img className='rounded-t-full rounded-b-full  rounded-l-full rounded-r-full mr-2' src={"https://picsum.photos/200"} width="50px" height={'50px'} alt={""}/>
                        <div className='flex flex-col'>
                            <span className='h-fit'>{sender?.name}</span> 
                            <span className='text-xs'>{msg.text}</span>
                        </div>
                    </div>
                </React.Fragment>
            )
        })

        return messagesList;
    }
  return (
    <div  className='h-full flex flex-col w-full'>
        <ChatHeader room={room?.getRoom}/>
       <div className='scrollbar-styles' style={{overflowY:"scroll",height:"100%",}}
       // className='flex flex-col'
       >
        <div className='h-1/2 w-full'>
                dscdc
        </div>
            {renderMessages()}
            <div ref={ref}></div>
       </div>
      <ChatInput room={room?.getRoom} />
    
    </div>
  )
}

export default memo(ChatBodyComp)
