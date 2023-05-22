'use client'

import Cookie from 'js-cookie'
import { Camera } from "lucide-react"
import { FormEvent } from "react"

import { api } from "@/lib/api"
import { useRouter } from 'next/navigation'
import MediaPicker from "./MediaPicker"

export default function NewPostForm() {

    const router = useRouter()

    const handleSubmitPost = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const fileToUpload = formData.get('coverURL')

        let coverUrl = ''

        if (fileToUpload) {
            const uploadFormData = new FormData()
            uploadFormData.set('file', fileToUpload)

            const uploadResponse = await api.post('upload', uploadFormData)

            coverUrl = uploadResponse.data.fileUrl
        }

        const token = Cookie.get('token')

        await api.post('/posts', {
            coverUrl,
            content: formData.get('content'),
            isPublic: formData.get('isPublic'),
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        router.push('/')
    }

    return (
        <form
          className="flex w-full flex-col gap-2"
          onSubmit={handleSubmitPost}
        >
          <div className="flex gap-4 items-center">
            <label
              htmlFor="media"
              className="flex items-center cursor-pointer gap-1.5 text-sm text-gray-200 hover:text-gray-100"
            >
              <Camera className="w-3.5 h-3.5"/>
              Attach media (max: 5MB)
            </label>

            <label
              htmlFor="isPublic"
              className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
            >
              <input
                type="checkbox"
                name="isPublic"
                id="isPublic"
                value="true"
                className="h-3.5 w-3.5 rounded border-gray-400 bg-gray-700 text-purple-500 focus:ring-0" 
              />
              Make this post public
            </label>
          </div>

          <MediaPicker />

          <textarea
           name="content"
           spellCheck={false}
           rows={15}
           className="w-full flex-1 resize-none rounded border-0 bg-transparent px-0 py-0 text-md leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
           placeholder="Feel free to add photos, videos, and stories about that experience you want to remember forever! ^_^"
          />

            <button
              type="submit"
              className='uppercase self-end inline-block rounded-full bg-green-500 px-5 py-3 text-black font-alt text-sm font-bold leading-none hover:bg-green-700 transition-colors'
            >
              Submit post
            </button>

        </form>
    )
}