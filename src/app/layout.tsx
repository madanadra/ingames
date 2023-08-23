'use client'

import { useInGames } from '@/zustand'
import '../globals.css'
import { useEffect, useRef } from 'react'

export default function RootLayout({children}: {children: React.ReactNode}) {
  const { bgm } = useInGames()
  const backgroundMusic = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (backgroundMusic.current) {
      if (bgm) {
        backgroundMusic.current.loop = true
        backgroundMusic.current.volume = 0.5
        backgroundMusic.current.play()
      } else {
        backgroundMusic.current.pause()
      }
    }
  }, [bgm])

  return (
    <html lang="en">
      <meta name="description" content="InGames by Muhammad Laksmana Indra" />
      <body className='min-h-screen font-pixel text-blue-700'>
        <audio ref={backgroundMusic} src='./background-music.mp3' />
        <img src='./background-image.gif' alt='Background' className='fixed w-full h-full object-cover -z-50' />
        {children}    
      </body>
    </html>
  )
}
