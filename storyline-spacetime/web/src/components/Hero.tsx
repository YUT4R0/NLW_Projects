import Image from 'next/image'

import Link from 'next/link'
import logo from "../assets/nlw-logo.svg"

export default function Hero() {
    return (
        <div className="space-y-5">
          <Image src={logo} alt='Logo icon' title='logo made by rocketseat' />

          <div className="space-y-1">
            <h1 className='text-5xl text-gray-50 font-bold leading-tight '>Your time capsule 8{'^)'}</h1>
            <p className='text-lg leading-relaxed'>Collect memorable moments from your journey and share (if you like) with the world!</p>
          </div>

          <Link
            href="/posts/new"
            className='uppercase inline-block rounded-full bg-green-500 px-5 py-3 text-black font-alt text-sm font-bold leading-none hover:bg-green-700 transition-colors'
          >
            REGISTER MEMORIES
          </Link>
        </div>        
    )
}