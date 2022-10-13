import { gql } from '@apollo/client';

export const GET_USERS = gql`
query UsersQuery {
  getUsers {
    _id
    name
    email
    no_of_friends
    imageUrl
  }
}
`;
export const GET_MESSAGES = gql`
query getMessages($roomId: String!) {
  getMessages(roomId: $roomId) {
    _id
    text
    sender
  }
}
`;
export const GET_PENDING_REQUEST = gql`
query getPendingRequest($id:String){
  getPendingRequest(id:$id){
      _id,
      requester {
        _id
        email
        name
        email
        mobile
        imageUrl
        friends {
          id
          roomId
        }
      },
      recipient {
          _id
        email
        name
        email
        mobile
        imageUrl
        friends{
          id
          roomId
        }
      }
  }
}
`;

export const GET_ROOMS = gql`
query getRooms {
  getRooms {
    _id
    roomName
    roomType
    latestMessage {
        _id
    }
    participants {
        _id
        name
        imageUrl
    }
  } 
}
`;

export const ADD_MESSAGE = gql`
 mutation addMessage($messageInput:MessageInput) {
  addMessage(messageInput:$messageInput)
}
`;
export const SEND_FRIEND_REQUEST = gql`
mutation sendFriendRequest($sendFriendRequestInput:sendFriendRequestInput){
  sendFriendRequest(sendFriendRequestInput:$sendFriendRequestInput)
}
`;
export const RESPONSE_REQUEST = gql`
mutation responseRequest($responseFriendRequestInput:responseFriendRequestInput){
  responseFriendRequest(responseFriendRequestInput:$responseFriendRequestInput)
}
`;

export const MESSAGE_ADDED = gql`
subscription messageAdded($roomId: String){
  messageAdded(roomId: $roomId) {
    roomId
    text
  }
}
`;

export const LOGIN = gql`
mutation Login($token: String) {
  login(token: $token) {
    email
    _id
    mobile
    imageUrl
    friends {
      _id
      email
      name
      friends
      no_of_friends
      mobile
      imageUrl
    }
    name
    token
  }
}
`;

export const GET_ROOM = gql`
query getRoom($roomId: String!) {
  getRoom(roomId:$roomId){
      _id
  participants{
    _id
    name
  }
  roomName
  roomType
  }
}`

export const GET_FRIENDS = gql`
query getFriends($id:String) {
  getAllFriends(id:$id) {
    id {
     _id
     email
     imageUrl
     mobile
     name
   }
   roomId
  }
}`

export const REMOVE_FRIEND = gql`
mutation REMOVE_FRIEND($userId:String,$friendId:String,$roomId:String){
  removeFriend(userId:$userId,friendId:$friendId,roomId:$roomId)
}
`
