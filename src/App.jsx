import React, { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import {login,logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'

const App = () => {
  const[loading,SetLoading] = useState(true)
  const dispatch =  useDispatch()
 
  useEffect(()=>{
     authService.getCurrentuser()
     .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
     })
     .finally(()=>SetLoading(false))
  },[])

  return !loading ? (
    <Router>
      <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
        <div className='w-full block'>
          <Header/>
          <main>
            <Outlet/>
          </main>
          <Footer/>
        </div>
      </div>
    </Router>
  ) :null
  
}

export default App