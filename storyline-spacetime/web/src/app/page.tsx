import { cookies } from 'next/headers'

import Background from '@/components/Background'
import Copyright from '@/components/Copyright'
import EmptyMemories from '@/components/EmptyMemories'
import Hero from '@/components/Hero'
import Profile from '@/components/Profile'
import Signin from '@/components/Signin'

export default function Home() {

  const isAuthenticated = cookies().has('token')

  return (
    <main className="grid grid-cols-2 min-h-screen">
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
      <div className="flex flex-col p-16 bg-[url(../assets/bg-stars.svg)] bg-cover">
        <EmptyMemories />
      </div>
    </main>
  )
}
