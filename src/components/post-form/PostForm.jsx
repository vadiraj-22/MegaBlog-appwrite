import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import appwriteService from "../../appwrite/config"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
      status: post?.status || 'active',
    },
  })

  const navigate = useNavigate()
  const userData = useSelector(state => state.auth.userData)

  const submit = async (data) => {
    try {
      if (post) {
        const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null

        if (file) {
          appwriteService.deleteFile(post.featuredImage)
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data, featuredImage: file ? file.$id : undefined
        })
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`)
        }
      } else {
        // Check if image is selected
        if (!data.image || !data.image[0]) {
          alert('Please select an image')
          return
        }

        console.log('Uploading file:', data.image[0])
        const file = await appwriteService.uploadFile(data.image[0])
        console.log('File uploaded:', file)

        if (file) {
          const fileId = file.$id
          console.log('Creating post with fileId:', fileId)
          
          const dbPost = await appwriteService.createPost(
            data.title,
            data.content,
            fileId,
            data.status,
            userData.$id
          )
          
          console.log('Post created:', dbPost)
          
          if (dbPost) {
            navigate(`/post/${dbPost.$id}`)
          }
        } else {
          alert('Failed to upload image. Please try again.')
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('An error occurred. Check console for details.')
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-6">
      <div className="w-full lg:w-[65%] space-y-6">
        <Input
          label="Title"
          placeholder="Enter your post title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
      </div>
      <div className="w-full lg:w-[calc(35%-1.5rem)] space-y-6">
        <div>
          <Input
            label="Featured Image"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="w-full mb-4 mt-4">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg shadow-md w-full object-cover"
              />
            </div>
          )}
        </div>
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button 
          type="submit" 
          bgColor={post ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"} 
          className="w-full transition-colors duration-200"
        >
          {post ? "Update Post" : "Publish Post"}
        </Button>
      </div>
    </form>
  );
}