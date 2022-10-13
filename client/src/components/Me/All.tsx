import React from 'react'
import  {useQuery,useMutation} from "@apollo/client"
import { GET_FRIENDS, REMOVE_FRIEND, } from '../../graphql/queries';
import {FcCheckmark} from "react-icons/fc"
import {AiOutlineClose} from "react-icons/ai"
export default function All() {

    const userId = JSON.parse(localStorage.getItem('user') as string)._id  
  const [removeFriend] = useMutation(REMOVE_FRIEND)
  const {data,refetch} = useQuery(GET_FRIENDS,{
    variables:{
        id:userId
    }
  });

  const handleRemoveFriend =async (friendId:string,roomId:string)=>{
    try {
       let res = await removeFriend({
            variables:{
                userId,
                friendId,
                roomId
            }
         })
         refetch();
    } catch (error) {
        console.log(error)
    }
   
  }

  
  const getAllFriends = ()=>{
   let result =  data?.getAllFriends.map((user:any)=>{

        return(
        <div className='text-lightest-slate  bg-dark-navy px-1 py-1 rounded-md h-14 w-11/12 ml-auto mr-auto pd-10 flex justify-between'>
            <div className='flex'>
              <img className='rounded-t-full rounded-b-full  rounded-l-full rounded-r-full mr-2' src={user.imageUrl || "https://picsum.photos/200"} width="50px" height={'50px'} alt={""}/>
            <div className='text-md flex flex-col'>
                <span>{user.id.name}</span>
            </div> 
           
            </div>
            <div className='w-2/6 self-center self-end flex justify-around cursor-pointer items-center '>
                <div onClick={()=>handleRemoveFriend(user.id._id,user.roomId)} className='text-xs'>Remove Friend</div>
            </div>
        </div>    
        )
    })

    return result
  }

  return (
    <div className='flex items-start justify-start h-full gap-y-10 flex-col p-10 '>
        {getAllFriends()}             
    </div>
  )
}
