import React from 'react'
import { useDispatch } from 'react-redux'
import {logout} from '../../store/authSlice'
import authService from '../../appwrite/auth'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler=() =>{
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }  
  return (
    <button 
      className='inline-block px-6 py-2 duration-200 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-all'
      onClick={logoutHandler}
    >
      Logout
    </button>
  )
}

export default LogoutBtn