import * as React from 'react'
import {room} from "../types/RoomType"

// type Action = {type: 'getUser'} | {type: 'decrement'}
type Action = {
  type:'setUser' | 'setChatRoom' | "friends",
  payload:{
    user?:any,
    currentChatRoom?:room,
    friends?:[any]
  }
}
type Dispatch = (action: Action) => void
type State = {user: any}
type GlobalProviderProps = {children: React.ReactNode}

const GlobalStateContext = React.createContext<
  {state: State; dispatch: Dispatch} | undefined
>(undefined)

function globalReducer(state: State, action: Action) {
  switch (action.type) {
    case 'setUser': {
      return {...state,user:action.payload.user}
    }
    case 'setChatRoom': {
      return {...state,currentChatRoom:action.payload.currentChatRoom}
    }
    case 'friends': {
      return {...state,friends:action.payload.friends}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function GlobalProvider({children}: GlobalProviderProps) {
  const [state, dispatch] = React.useReducer(globalReducer, {user:null})

  const value = {state, dispatch}
  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  )
}

function useGlobalContext() {
  const context = React.useContext(GlobalStateContext)
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a Provider')
  }
  return context
}

export {GlobalProvider, useGlobalContext}
