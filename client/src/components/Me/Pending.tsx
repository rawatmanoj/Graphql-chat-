import React from 'react'
import  {useQuery,useMutation} from "@apollo/client"
import { GET_PENDING_REQUEST, RESPONSE_REQUEST } from '../../graphql/queries';
import {FcCheckmark} from "react-icons/fc"
import {AiOutlineClose} from "react-icons/ai"
export default function Pending() {

    const userId = JSON.parse(localStorage.getItem('user') as string)._id  

  const {data} = useQuery(GET_PENDING_REQUEST,{
    variables:{
        id:userId
    }
  });

  const [giveBackReponse] = useMutation(RESPONSE_REQUEST)


  const responseFunc =async (type:string,recipient:any,requester:any,id:string)=>{
   let resp = await giveBackReponse({
        variables:{
            responseFriendRequestInput:{
                "friendshipId": id,
              "responseType": type,
              requester: requester,
              recipient: recipient
            }
        }
    })
    console.log(resp)
  }
  
  const getPendingRequest = ()=>{
   let result =  data?.getPendingRequest.map((req:any)=>{
        let otherUser;
        let reqType;
        if(req.recipient._id === userId){
             otherUser = req.requester;
            reqType = "requester"
        }else {
             otherUser = req.recipient;
            reqType = "recipient"
        }
        console.log(otherUser.imageUrl)
        return(
        <div className='text-lightest-slate  bg-dark-navy px-1 py-1 rounded-md h-14 w-11/12 ml-auto mr-auto pd-10 flex justify-between'>
            <div className='flex'>
              <img className='rounded-t-full rounded-b-full  rounded-l-full rounded-r-full mr-2' src={otherUser.imageUrl || "https://picsum.photos/200"} width="50px" height={'50px'} alt={""}/>
            <div className='text-md flex flex-col'>
                <span>{otherUser.name}</span>
                <span className='text-xs'>{reqType==="recipient" ? 'Outgoing request' : 'Incoming request'}</span>
            </div> 
            </div>
            {reqType ==="requester" && 
            <div className='w-1/6 flex justify-around items-center '>
                <FcCheckmark onClick={()=>responseFunc("accepted",req.recipient,req.requester,req._id)} size={"2rem"}/><AiOutlineClose color='red' size={"2rem"}/>
            </div>
            }

        </div>    
        )
    })

    return result
  }

  return (
    <div className='flex items-start justify-start h-full gap-y-10 flex-col p-10 '>
        {getPendingRequest()}             
    </div>
  )
}
