
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import service from '../appwrite/config'
import { Container, Postcard } from '../components'

function Home() {
    const [posts, setPosts] = useState([])
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        service.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className='w-full py-16 px-4'>
                <Container>
                    <div className='bg-white rounded-xl shadow-lg p-12 text-center'>
                        <div className='max-w-md mx-auto'>
                            <svg className='w-24 h-24 mx-auto mb-6 text-gray-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' />
                            </svg>
                            <h1 className='text-3xl font-bold text-gray-800 mb-4'>
                                {authStatus ? 'No posts available' : 'Welcome!'}
                            </h1>
                            <p className='text-gray-600 text-lg'>
                                {authStatus ? 'Be the first to create a post!' : 'Login to read and create amazing posts'}
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return(
        <div className='w-full py-8 px-4'>
            <Container>
                <div className='mb-8'>
                    <h1 className='text-4xl font-bold text-gray-800 mb-2'>Latest Posts</h1>
                    <p className='text-gray-600'>Discover amazing content from our community</p>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {posts.map((post)=>(
                        <Postcard key={post.$id} {...post}/>
                    ))}
                </div>
            </Container>
        </div>
    )

}

export default Home