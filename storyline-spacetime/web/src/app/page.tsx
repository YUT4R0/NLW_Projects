import { User } from 'lucide-react'

import Image from 'next/image'

import logo from '../assets/nlw-logo.svg'

export default function Home() {
  return (
    <main className="grid grid-cols-2 min-h-screen">
      {/* Left side */}
      <div className="relative overflow-hidden flex flex-col items-start justify-between px-24 py-16 border-r-2 border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover">
        {/* blur */}
        <div className="absolute h-[288px] w-[526px] bg-purple-700 opacity-50 right-0 top-1/2 translate-x-1/2 -translate-y-1/2 rounded-full blur-full"/>
        {/* stripes */}
        <div className="absolute right-2 top-0 bottom-0 w-2 bg-stripes" />

        {/* SignIn */}
        <a href="" className="flex items-center gap-4 text-left hover:text-gray-50 transition-colors">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
            <User className='h-6 w-6 text-gray-500' />
          </div>
          <p className='text-sm leading-snug max-w-[240px]'>
            <span className='underline'>Create your account</span>{'\n'}
            and save your memories!
          </p>
        </a>

        {/* Hero */}
        <div className="space-y-5">
          <Image src={logo} alt='Logo icon' title='logo made by rocketseat' />

          <div className="space-y-1">
            <h1 className='text-5xl text-gray-50 font-bold leading-tight '>Your time capsule 8{'^)'}</h1>
            <p className='text-lg leading-relaxed'>Collect memorable moments from your journey and share (if you like) with the world!</p>
          </div>

          <a href="" className='uppercase inline-block rounded-full bg-green-500 px-5 py-3 text-black font-alt text-sm font-bold leading-none hover:bg-green-700 transition-colors'>
            REGISTER MEMORIES
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm leading-relaxed text-gray-200">
          <p>
            Made with 💙 by{' '}
            <a
              className='underline hover:text-gray-50'
              target='_blank'
              rel='noreferrer'
              href="https://github.com/YUT4R0"
            >
              Yutaro
            </a>!{' '}
            <span className='ml-1 font-mono'>:3</span>
          </p>
          <span className='opacity-5'>(also, provided by Rocketseat XD)</span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex flex-col p-16 bg-[url(../assets/bg-stars.svg)] bg-cover">
        <div className="flex flex-1 items-center justify-center">
          <p className="text-center leading-relaxed w-[360px]" >
            You haven't created any memories yet, start{' '}
            <a href="" className="underline hover:text-gray-50">creating now</a>
            !
          </p>
        </div>
      </div>

    </main>
  )
}
