import {room} from "../../types/RoomType"
import {useNavigate} from "react-router-dom";
import { FaUserFriends } from 'react-icons/fa';
import SearchFriends from "./SearchFriends";

type RoomListProps = {
    rooms:[room],
    user:any,
    handleChatThreadClick:(room:room)=>void
}

export default function RoomListComp({rooms,user,handleChatThreadClick}:RoomListProps) {

    const navigate = useNavigate()

    const renderRooms = ()=>{
       let result = rooms?.map((room,index)=>{
         let room_name:any = room.participants.filter((item:any)=>item?._id !== user?._id);
            return(            
                <div key={room._id} onClick={()=>handleChatThreadClick(room)} className='cursor-pointer bg-navy px-1 py-1 rounded-md h-10 w-11/12 m-auto pd-10 flex mt-4'>
                  <img className='rounded-t-full rounded-b-full  rounded-l-full rounded-r-full mr-2' src={room_name[0].imageUrl || "https://picsum.photos/200"} width="30px" height={'30px'} alt={""}/>
                  <div> {room_name[0].name}</div> 
                </div>            
                )
        })
      return result;
    }
    
  return (
        <div className='text-lightest-slate h-full pt-2 w-full'>
         <SearchFriends/>
            <div 
            onClick={()=>{
                navigate('/me')
            }} 
            className='cursor-pointer mb-4 bg-navy px-1 py-1 rounded-md h-10 w-11/12 m-auto pd-10 flex justify-evenly items-center'>
              <FaUserFriends />
                  <div>Invite Friends</div> 
            </div>    
            {rooms && renderRooms()}
        </div>
  )
}
