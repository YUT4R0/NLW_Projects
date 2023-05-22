import { Bai_Jamjuree, Roboto_Flex } from 'next/font/google'
import { cookies } from 'next/headers'
import { ReactNode } from 'react'
import './globals.css'

import Background from '@/components/Background'
import Copyright from '@/components/Copyright'
import Hero from '@/components/Hero'
import Profile from '@/components/Profile'
import Signin from '@/components/Signin'

export const metadata = {
  title: 'Storyline',
  description: 'This app is adaptable to web and mobile devices and it was build using React, Next.js, Tailwindcss and TypeScript',
}

const roboto = Roboto_Flex({
  subsets: ['latin'],
  variable: '--font-roboto',
  preload: false,
})

const baijamjuree = Bai_Jamjuree({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-baijamjuree',
  preload: false,
})

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {

  const isAuthenticated = cookies().has('token')

  return (
    <html lang="en">
      <body className={`${roboto.variable} ${baijamjuree.variable} bg-gray-900 font-sans text-gray-100`}>
        <main className="grid grid-cols-2 min-h-screen max-w-screen overflow-x-hidden">
          {/* Left side */}
          <div className="relative overflow-hidden flex flex-col items-start justify-between px-24 py-16 border-r-2 border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover">  
            <Background />
            {
              isAuthenticated
              ? <Profile />
              : <Signin />
            }
            <Hero />
            <Copyright />
          </div>

          {/* Right side */}
          <div className="flex max-h-screen overflow-y-scroll flex-col bg-[url(../assets/bg-stars.svg)] bg-cover">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
