'use client'

import { useInGames } from '../zustand';
import { soundEffects } from './func';

export default function Help() {
    const { menu, sfx, setMenu } = useInGames()

    return (
        menu === 'Help' &&
        <div onClick={() => setMenu('')} className='grid content-center bg-slate-950 absolute top-0 left-0 w-full min-h-full bg-opacity-50 py-10 px-5'>
            <div onClick={(e) => e.stopPropagation()} className="grid gap-y-5 bg-blue-400 border border-blue-700 w-full max-w-sm mx-auto py-3 px-5">
                <div className="flex justify-between items-center gap-x-3 text-lg sm:text-2xl">
                    <h1>Help</h1>
                    <h1 onClick={() => {setMenu(''); sfx && soundEffects('click')}} className="cursor-pointer">X</h1>
                </div>
                <div className='grid gap-y-2 sm:text-xl'>
                    <div>
                        <h1 className='font-bold'>A. Question</h1>
                        <h1>Questions are retrieved using the API from the Open Trivia Database. 
                        There are 24 categories, 3 difficulty levels and 2 question types.</h1>
                    </div>
                    <div>
                        <h1 className='font-bold'>B. Score</h1>
                        <h1>The score starts at 0. Every question that is successfully answered, 
                        the score will increase depending on the difficulty of the question.</h1>
                        <h1 className='text-green-700'>Easy: +100</h1>
                        <h1>Medium: +200</h1>
                        <h1 className='text-red-700'>Hard: +300</h1>
                    </div>
                    <div>
                        <h1 className='font-bold'>C. Time</h1>
                        <h1>10 seconds is the time given to each question. 
                        The quiz is over if the time runs out, you answer incorrectly or you return to the menu.</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}