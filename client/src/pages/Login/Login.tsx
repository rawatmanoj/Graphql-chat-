import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import {useMutation} from "@apollo/client"
import { LOGIN } from '../../graphql/queries';
import {useNavigate} from "react-router"
import { useGlobalContext } from '../../context/GlobalContext';
export default function Login() {

    const [loginMutate, { data }] = useMutation(LOGIN);
    const {dispatch} = useGlobalContext();
    const navigate = useNavigate();
    if(data){
        localStorage.setItem('token',data.login.token);
        localStorage.setItem('user',JSON.stringify(data.login));
        // console.log(data,"dataaaaa")
        dispatch({
            type:"friends",
            payload:{friends:data.login.friends}
        })
        navigate("/")
    }


  return (
    <div className='bg-navy h-screen w-screen flex justify-center items-center'>
        <div className='w-72'>
        <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    loginMutate({
                        variables:{token:credentialResponse.credential}
                    })
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
        />;
        </div>
    </div>
  )
}
