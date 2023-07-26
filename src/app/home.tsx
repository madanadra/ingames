'use client'

import { useInGames } from '@/zustand'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import MenuList from './menu-list'
import HighScore from './high-score'
import Help from './help'
import Setting from './setting'
import { soundEffects } from './func'

export default function HomePage() {
    const { sfx, reset } = useInGames()
    const router = useRouter()
    const menuList = ['High Score', 'Help', 'Setting']

    useEffect(() => {
        reset()
    }, [])
    
    return (
        <div className='min-h-screen py-10 px-5 relative'>
        <div className='grid gap-y-10 w-full max-w-xl mx-auto'>
            <h1 className='text-6xl sm:text-8xl font-bold text-center tracking-widest'>InGames</h1>
            <div className='grid justify-items-center text-center text-4xl sm:text-6xl gap-y-3 mt-10'>
                <h1 onClick={() => {router.push('/quiz'); sfx && soundEffects('click')}} className="p-1 cursor-pointer">
                    Play Quiz
                </h1>
                {menuList.map((item, i) => <MenuList key={i} name={item} />)}
            </div>
        </div>
        <HighScore />
        <Help />
        <Setting />
        </div>
    )
}
