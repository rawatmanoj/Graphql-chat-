import React,{useState} from 'react'
import {useMutation} from "@apollo/client"
import { GET_FRIENDS } from '../../graphql/queries';

export default function SearchFriends() {


    const [value,setValue] = useState("orange");
    const setInputValue = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setValue(event.target.value)
      }

    const userId = JSON.parse(localStorage.getItem('user') as string)._id  

    const handleSubmit = (event:any)=>{
        if (event.key === 'Enter') {
           
           
            setValue("")
        }
    } 


    const handleChange = (e:any) => {
      setValue(e.target.value);
    };

  return (
<div></div>

  )
}
