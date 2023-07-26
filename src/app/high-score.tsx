'use client'

import { useInGames } from '../zustand';
import { soundEffects } from './func';
import { getCookie } from 'cookies-next';

export default function HighScore() {
    const { menu, sfx, setMenu } = useInGames()
    const highScoreCookie: any = getCookie('ingames-high-score')
    const highScore = highScoreCookie && JSON.parse(highScoreCookie)

    return (
        menu === 'High Score' &&
        <div onClick={() => setMenu('')} className='grid content-center bg-slate-950 absolute top-0 left-0 w-full min-h-full bg-opacity-50 py-10 px-5'>
            <div onClick={(e) => e.stopPropagation()} className="grid gap-y-5 bg-blue-400 border border-blue-700 w-full max-w-sm mx-auto py-3 px-5">
                <div className="flex justify-between items-center gap-x-3 text-lg sm:text-2xl">
                    <h1>High Score</h1>
                    <h1 onClick={() => {setMenu(''); sfx && soundEffects('click')}} className="cursor-pointer">X</h1>
                </div>
                {Array.isArray(highScore) && highScore.length ?
                <div className='sm:text-xl'>
                    <div className="grid grid-cols-5 py-1.5 px-3 font-bold">
                        <h1>Rank</h1>
                        <h1 className="col-span-2 text-center">Score(Correct)</h1>
                        <h1 className="col-span-2 text-right">Created at</h1>
                    </div>
                    {highScore.map((item, i) =>
                        <div key={i} className={`${i === 0 ? 'bg-green-400 border border-green-700 text-green-950' : ''} 
                        grid grid-cols-5 items-center py-1.5 px-3`}>
                            <h1>#{i+1}</h1>
                            <h1 className="col-span-2 text-center">{item.score}({item.correct})</h1>
                            <h1 className="col-span-2 text-right leading-tight">{new Date(item.date).toLocaleString()}</h1>
                        </div>
                    )}
                </div> : <h1 className='sm:text-xl'>No score yet, start playing!</h1>}
            </div>
        </div>
    )
}