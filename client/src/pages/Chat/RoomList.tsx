import React from 'react'
import RoomListComp from '../../components/Chat/RoomListComp'
import { useQuery } from '@apollo/client';
import { GET_ROOMS } from '../../graphql/queries';
import {room} from "../../types/RoomType"
import {useNavigate} from "react-router-dom"
export default function RoomList() {

    const { loading, error, data } = useQuery(GET_ROOMS);
   
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user') as any)

    const handleChatThreadClick = (room:room)=>{
      navigate(`/me/${room._id}`)
    }

  return (
        <RoomListComp
         rooms={data?.getRooms} 
         user={user}
         handleChatThreadClick={handleChatThreadClick}
         />
  )
}
