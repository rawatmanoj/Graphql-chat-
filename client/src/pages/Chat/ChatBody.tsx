import {useParams} from "react-router-dom"
import {useQuery,useSubscription} from "@apollo/client"
import {  GET_MESSAGES, GET_ROOM, MESSAGE_ADDED } from '../../graphql/queries'
import ChatBodyComp from "../../components/Chat/ChatBodyComp"
import React from "react"
export default function ChatBody() {
      const {id} = useParams();

      const {data,refetch} = useQuery(GET_MESSAGES,{
        variables:{
          roomId:id
        }
      })
      
      const {data:room} = useQuery(GET_ROOM,{
        variables:{
          roomId:id
        }
      })

       useSubscription(MESSAGE_ADDED,{ 
        variables: { roomId:id },
        onSubscriptionData:()=>{
          refetch();
        }
      },
        );

    


  return (
        <React.Fragment>
           <ChatBodyComp messages={data} room={room} />
        </React.Fragment>
  )
}
