'use client'

import { useInGames } from "@/zustand"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { soundEffects } from "../func"

export default function GameOver() {
    const { menu, sfx, reset } = useInGames()
    const router = useRouter()

    useEffect(() => {
        menu === 'Game Over' && sfx && soundEffects('fail')
    }, [menu])

    return (
        menu === 'Game Over' &&
        <div className='grid content-center bg-slate-950 absolute top-0 left-0 w-full min-h-full bg-opacity-50 py-10 px-5'>
            <div className="grid place-content-center gap-y-5 w-full max-w-sm mx-auto py-3 px-5">
                <div className="grid gap-y-3">
                    <h1 className='text-5xl sm:text-7xl font-bold text-center text-red-700 tracking-widest'>Game Over</h1>
                    <div className="flex gap-x-3 justify-center">
                        <h1 onClick={() => {router.push('/'); sfx && soundEffects('click')}} 
                        className="py-1.5 px-3 bg-red-400 border border-red-700 text-red-950 cursor-pointer">Menu</h1>
                        <h1 onClick={() => {reset(); sfx && soundEffects('click')}} className="py-1.5 px-3 bg-green-400 border border-green-700 text-green-950 cursor-pointer">Again</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}