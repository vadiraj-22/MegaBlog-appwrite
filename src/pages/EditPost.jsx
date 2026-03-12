import React,{useEffect, useState} from 'react'
import { Container, PostForm } from '../components'
import service from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {

  const[post, setPost] =useState(null)

  const {slug} = useParams()
  const navigate = useNavigate()


  useEffect(() => {
   if(slug){
    service.getPost(slug).then((post)=>{
      if(post){
        setPost(post)
      }
    })
   } else {
    navigate('/')
   }
  }, [slug, navigate])
  
  return  post ?(
    <div className='py-8 px-4'>
      <Container>
        <div className='bg-white rounded-lg shadow-lg p-6 md:p-8'>
          <h1 className='text-3xl font-bold text-gray-800 mb-6'>Edit Post</h1>
          <PostForm post={post}/>
        </div>
      </Container>
    </div>
  ) :null
}

export default EditPost