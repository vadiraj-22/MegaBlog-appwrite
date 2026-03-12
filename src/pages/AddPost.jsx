import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className='py-8 px-4'>
        <Container>
            <div className='bg-white rounded-lg shadow-lg p-6 md:p-8'>
                <h1 className='text-3xl font-bold text-gray-800 mb-6'>Create New Post</h1>
                <PostForm />
            </div>
        </Container>
    </div>
  )
}

export default AddPost