import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function Postcard({$id, title, featuredImage}) {
  const [imageError, setImageError] = React.useState(false)
  
  const getImageUrl = () => {
    if (!featuredImage) {
      return null
    }
    return appwriteService.getFilePreview(featuredImage)
  }
  
  const imageUrl = getImageUrl()
  
  return (
   <Link to={`/post/${$id}`}>
    <div className='bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full'>
      <div className='w-full h-48 overflow-hidden bg-gray-200'>
        {imageUrl && !imageError ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
            onError={() => {
              console.error('Failed to load image for:', title, 'File ID:', featuredImage)
              setImageError(true)
            }}
            onLoad={() => {
              console.log('✓ Image loaded for:', title)
            }}
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center text-gray-400'>
            <div className='text-center'>
              <svg className='w-16 h-16 mx-auto mb-2' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z' clipRule='evenodd' />
              </svg>
              <p className='text-sm'>No Image</p>
            </div>
          </div>
        )}
      </div>
      <div className='p-4'>
        <h2 className='text-xl font-bold text-gray-800 line-clamp-2'>{title}</h2>
      </div>
    </div>
   </Link>
  )
}

export default Postcard