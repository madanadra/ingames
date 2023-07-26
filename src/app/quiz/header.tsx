'use client'

import { useRouter } from "next/navigation"
import { useInGames } from "@/zustand"
import { useEffect } from "react"
import { soundEffects } from "../func"

export default function Header(){
    const router = useRouter()
    const { num, score, date, time, quiz, answered, menu, sfx, setDate, setTime, setMenu } = useInGames()
    const question = quiz[num] && quiz[num]

    useEffect(() => {
      if (!question && date > 0) {
        setDate(0)
      } else {
        setDate(new Date().getTime())
      }
    }, [question])

    useEffect(() => {
      if (date > 0 && !answered && question && menu != 'Game Over') {
        if (time > 0) {
          if (time === 5) {
            sfx && soundEffects('countdown')
          }
          const timer = setTimeout(() => {
            setTime(10 - Math.floor((new Date().getTime() - date)/1000))
          }, 1000)

          return () => { 
            clearTimeout(timer)
          }
        } else {
          setMenu('Game Over')
        }
      }
    }, [date, time, answered, question, menu])
    
    return (
        <div className='flex justify-between gap-x-3 sm:text-xl'>
          <div className='flex items-center gap-x-1.5 bg-green-400 border border-green-700 text-green-950 py-1.5 px-3'>
            <h1>{num}</h1>|<h1>{score}</h1>
          </div>
          <div className='flex items-center gap-x-1.5 bg-red-400 border border-red-700 text-red-950 py-1.5 px-3'>
            <h1>{time}</h1>|<h1 onClick={() => {router.push('/'); sfx && soundEffects('click')}} className="cursor-pointer">X</h1>
          </div>
        </div>
    )
}