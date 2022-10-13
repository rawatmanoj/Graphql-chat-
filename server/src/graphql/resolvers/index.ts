import {PubSub, withFilter} from "graphql-subscriptions"
import { OAuth2Client } from 'google-auth-library';
import Rooms from "../../Models/Rooms";
import Messages from "../../Models/Messages";
import Users from "../../Models/Users";
import Friends from "../../Models/Friends";
import { AuthenticationError, UserInputError } from "apollo-server-core";
const MESSAGE_ADDED = 'MESSAGE_ADDED';

const pubSub = new PubSub();
const client = new OAuth2Client(process.env.CLIENT_ID)

const Query = {
    getUsers: (_root:any, _args:any) => {
      return []
    },
    getMessages: async(_root:any, {roomId}:any) => {
        try {
            const data = await Messages.find({
              roomId
            });
            return data;
            // const data = await Messages.create({

            // })
        } catch (error) {
            
        }
      return []
    },
    getRooms: async (_root:any, _args:any) => {
      try {
        const data = await Rooms.find().populate('participants');

        return data;
      } catch (error) {
        console.log(error,"error")

        return []
      }
    },
    getRoom: async (_root:any, {roomId}:any) => {
      try {
        const data = await Rooms.findById(roomId).populate('participants')

        return data;
      } catch (error) {
        console.log(error,"error")

        return []
      }
    },
    getAllFriends: async (_root:any, {id}:any) => {
      try {
        const data = await Users.findById(id).populate({path:"friends",populate:{path:"id"}})
        return data?.friends;
      } catch (error) {
        throw new UserInputError(error as string)
      }
    },
    getPendingRequest: async (_root:any,{id}:any) => {
      try {
         
          
            const requests = await Friends.find({$or:[
              {
              requester:id
              },
              {
                recipient:id
              }
          ]}).populate(['requester','recipient']);
          console.log(requests)
         return requests;
      } catch (error) {
        console.log(error)
          return false
      }
  },
  };

  const Mutation = {
    addMessage: async (_root:any,{messageInput}:any) => {
      console.log(messageInput,"messageInput")
        try {
             await Messages.create({
                sender:messageInput.sender,
                roomId:messageInput.roomId,
                text:messageInput.text
            })
            pubSub.publish(MESSAGE_ADDED, {messageAdded: messageInput});
            return true;
        } catch (error) {
          console.log(error)
            return false
        }
    },
    sendFriendRequest: async (_root:any,{sendFriendRequestInput}:any) => {
      console.log(sendFriendRequestInput,"sendFriendRequestInput")
        try {
         
            const ifUserExist:any = await Users.findOne({
              email:sendFriendRequestInput.recipient
            });
            if(ifUserExist){
              const ifUserAlreadyFriend = await Users.findOne({
                friends:ifUserExist._id
              })
              console.log(ifUserAlreadyFriend,"ifUserAlreadyFriend")
              if(ifUserAlreadyFriend){
                throw new UserInputError("already friend")
              }
              console.log(ifUserExist)
               await Friends.create({
                requester:sendFriendRequestInput.requester,
                recipient:ifUserExist._id,
                status:0
              })
            
              return true;

            }else {
              throw new UserInputError("user doest exist")
            }
        } catch (error) {
          console.log(error)
          throw new UserInputError(error as string)
        }
    },
    responseFriendRequest: async (_root:any,{responseFriendRequestInput}:any) => {
      console.log(responseFriendRequestInput,"responseFriendRequestInput")
        try {
           if(responseFriendRequestInput.responseType==="accepted"){
            let resultRoom = await Rooms.create({
              roomName:"",
              roomtype:"private",   
              participants:[responseFriendRequestInput.requester._id,responseFriendRequestInput.recipient._id] 
            })
               let user1 = Users.findByIdAndUpdate(responseFriendRequestInput.requester._id,{
                  "$push":{
                    "friends":{id:responseFriendRequestInput.recipient,roomId:resultRoom._id},
                    "rooms":resultRoom._id
                  }
                });

               let user2 = Users.findByIdAndUpdate(responseFriendRequestInput.recipient._id,{
                  "$push":{
                    "friends":{id:responseFriendRequestInput.requester,roomId:resultRoom._id},
                    "rooms":resultRoom._id
                  }
                });

                let deleteFriendSchema = Friends.findByIdAndDelete(responseFriendRequestInput.friendshipId)

             let res = await Promise.all([user1,user2,deleteFriendSchema]);
             console.log(res,"ressssssss",)
             if(res){
                return true
             }
           }else if(responseFriendRequestInput.responseType==="rejected") {
            let deleteFriendSchema = await Friends.findByIdAndDelete(responseFriendRequestInput.friendshipId);
              if(deleteFriendSchema){
                return true;
              }
           }
        } catch (error) {
          console.log(error)
            return false
        }
    },
    login: async (_root:any,{token}:any) => {
        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.CLIENT_ID
            });
            const data = ticket.getPayload();
            const ifUserAlreadyPresent = await Users.findOne({
                email:data?.email
            }).populate('friends')
            
            if(!ifUserAlreadyPresent){
                const user = await Users.create({
                    name:data?.name,
                    email:data?.email,
                    friends:[],
                    mobile:"",
                    imageUrl:data?.picture
                });    
                const populatedUser = await Users.findById(user._id).populate("friends")            
                let result = {
                  name:populatedUser?.name,
                  email:populatedUser?.email,
                  friends:populatedUser?.friends,
                  imageUrl:populatedUser?.imageUrl,
                  mobile:populatedUser?.mobile,
                  _id:populatedUser?._id,      
                  token:token            
                }
               
                return result
            }

            let result = {
              name:ifUserAlreadyPresent.name,
              email:ifUserAlreadyPresent.email,
              friends:ifUserAlreadyPresent.friends,
              imageUrl:ifUserAlreadyPresent.imageUrl,
              mobile:ifUserAlreadyPresent.mobile,
              _id:ifUserAlreadyPresent._id,      
              token:token            
            }
          return result

        } catch (error) {
            throw new AuthenticationError(error as string)
        }
    },
    
  // createRoom:async (_root:any,{messageInput}:any) => {

  //       try {
  //            await Messages.create({
  //               sender:messageInput.sender,
  //               roomId:messageInput.roomId,
  //               text:messageInput.text
  //           })
  //           pubSub.publish(MESSAGE_ADDED, {messageAdded: messageInput});
  //           return true;
  //       } catch (error) {
  //           return false
  //       }
  //   },
  removeFriend:async (_root:any,{userId,friendId,roomId}:any) => {
      console.log(userId,friendId,roomId)
        try {
             let user1 = Users.updateOne({
              _id:userId
             },{
              $pull:{
                friends:{
                  id:friendId
                },
                rooms:roomId
              }
             })

             let user2 = Users.updateOne({
              _id:friendId
             },{
              $pull:{
                friends:{
                  id:userId
                },
                rooms:roomId
              }
             })
             let deleteAllRoomMessages = Messages.deleteMany({
              roomId:roomId
             })
             let deleteRoom =  Rooms.findByIdAndDelete(roomId)

            let res =  await Promise.all([user1,user2,deleteAllRoomMessages,deleteRoom]);
            console.log(res)

            return true;
        } catch (error) {
          console.log(error)
          throw new UserInputError(error as string)
        }
    },
  };

  
const Subscription = {
    messageAdded: {
        subscribe: withFilter(
            () => pubSub.asyncIterator(MESSAGE_ADDED),
            (payload, variables) => {
              console.log(payload.messageAdded.roomId,variables.roomId,"yo")
            return payload.messageAdded.roomId === variables.roomId
            },
          ),
    }
  };


  export default {
    Query,
    Mutation,
    Subscription
  }