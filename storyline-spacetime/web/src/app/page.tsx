import dayjs from 'dayjs'
import { cookies } from 'next/headers'
import Image from 'next/image'

import EmptyMemories from '@/components/EmptyMemories'
import { api } from '@/lib/api'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface Post {
  coverUrl: string
  excerpt: string
  id: string
  createdAt: string
}

export default async function Home() {

  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) {
    return <EmptyMemories /> 
  }  

  const token = cookies().get('token')?.value
  const res = await api.get('posts', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const posts: Post[] = res.data

  if (posts.length === 0) {
    return <EmptyMemories />
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      {
        posts.map(({ coverUrl, createdAt, excerpt, id }) => {
          return (
            <div className="space-y-4" key={id}>
              <time className='flex items-center gap-2 text-sm text-gray-100 -ml-8 before:h-px before:w-5 before:bg-gray-50'>
                {dayjs(createdAt).format('D of MMM, YYYY')}
              </time>
               <Image
                src={coverUrl}
                alt="[image here]"
                width={592}
                height={280}
                className='w-full aspect-video object-cover rounded-lg'
               />
               <p className='text-lg leading-relaxed text-gray-50 break-all'>
                {excerpt}
               </p>
               <Link href={`/posts/${id}`} className='flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100'>
                Read more...
                <ArrowRight className='w-4 h-4' />
               </Link>
            </div>
          )
        })
      }
    </div>
  )
}
