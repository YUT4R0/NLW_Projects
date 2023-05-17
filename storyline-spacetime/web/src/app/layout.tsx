import { Bai_Jamjuree, Roboto_Flex } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'

const roboto = Roboto_Flex({
  subsets: ['latin'],
  variable: '--font-roboto'
})

const baijamjuree = Bai_Jamjuree({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-baijamjuree'
})

export const metadata = {
  title: 'Storyline',
  description: 'This app is adaptable to web and mobile devices and it was build using React, Next.js, Tailwindcss and TypeScript',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${baijamjuree.variable} bg-gray-900 font-sans text-gray-100`}>
        {children}
      </body>
    </html>
  )
}
