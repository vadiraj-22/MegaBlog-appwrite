
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
            <div className=' w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl font-bold hover:text-gray-500'>
                                {authStatus ? 'No posts available' : 'Login to read Posts'}
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return(
        <div className='w-full py-8'>
            <Container>
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