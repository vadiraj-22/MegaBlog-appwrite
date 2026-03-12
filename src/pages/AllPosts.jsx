import React, { useEffect, useState } from 'react'
import { Container, Postcard } from '../components'
import appwriteService from "../appwrite/config"

function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if(posts){
                setPosts(posts.documents)
            }
        })
    }, [])


    return (
        <div className='w-full py-8 px-4'>
            <Container>
                <div className='mb-8'>
                    <h1 className='text-4xl font-bold text-gray-800 mb-2'>All Posts</h1>
                    <p className='text-gray-600'>Browse through all available posts</p>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {posts.map((post) =>(
                        <Postcard key={post.$id} {...post}/>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts