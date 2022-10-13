import React from 'react'
import { IoPersonAddSharp } from 'react-icons/io5';
import { MdPendingActions ,MdOutgoingMail} from 'react-icons/md';
import { GiThreeFriends} from 'react-icons/gi';


type MeHeaderProps = {
    handleAddFriends:()=>void,
    handlePendingRequest:()=>void,
    showAllFriends:()=>void
}
export default function MeHeader({handleAddFriends,handlePendingRequest,showAllFriends}:MeHeaderProps) {
    return (
        <div className='text-lightest-slate bg-light-navy h-14 outline-none border-none flex items-center pl-4 gap-x-4'>
            <div 
            className='flex justify-center items-center justify-between w-fit hover:bg-navy p-1 rounded-md'
            onClick={handleAddFriends}
            >
                <IoPersonAddSharp />
                <span className='ml-1 cursor-pointer'>
                    Friends
                </span>
            </div>
            <div 
            className='flex justify-center items-center justify-between w-fit hover:bg-navy p-1 rounded-md'
            onClick={handlePendingRequest}
            >
                <MdPendingActions />
                <span className='ml-1 cursor-pointer'>
                    Pending
                </span>
            </div>
            <div 
            className='flex justify-center items-center justify-between w-fit hover:bg-navy p-1 rounded-md'
            onClick={showAllFriends}
            >
                <GiThreeFriends />
                <span className='ml-1 cursor-pointer'>
                    All friends
                </span>
            </div>
        </div>
    )
}
