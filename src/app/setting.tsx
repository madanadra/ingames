'use client'

import { useInGames } from '../zustand';
import { soundEffects } from './func';

export default function Setting() {
    const { menu, bgm, sfx, setMenu, setBgm, setSfx } = useInGames()

    return (
        menu === 'Setting' &&
        <div onClick={() => setMenu('')} className='grid content-center bg-slate-950 absolute top-0 left-0 w-full min-h-full bg-opacity-50 py-10 px-5'>
            <div onClick={(e) => e.stopPropagation()} className="grid gap-y-5 bg-blue-400 border border-blue-700 w-full max-w-sm mx-auto py-3 px-5">
                <div className="flex justify-between items-center gap-x-3 text-lg sm:text-2xl">
                    <h1>Setting</h1>
                    <h1 onClick={() => {setMenu(''); sfx && soundEffects('click')}} className="cursor-pointer">X</h1>
                </div>
                <div className='grid gap-y-2 sm:text-xl'>
                    <div className="flex justify-between items-center">
                        <h1>Background music</h1>
                        <h1 onClick={() => {setBgm(!bgm); sfx && soundEffects('click')}} 
                        className={`${bgm ? 'bg-green-400 border border-green-700 text-green-950' : 
                        'bg-red-400 border border-red-700 text-red-950'} text-sm sm:text-lg text-center 
                        py-1 px-3 cursor-pointer`}>{bgm ? 'on' : 'off'}</h1>
                    </div>
                    <div className="flex justify-between items-center">
                        <h1>Sound effects</h1>
                        <h1 onClick={() => {setSfx(!sfx); sfx && soundEffects('click')}} 
                        className={`${sfx ? 'bg-green-400 border border-green-700 text-green-950' : 
                        'bg-red-400 border border-red-700 text-red-950'} text-sm sm:text-lg text-center 
                        py-1 px-3 cursor-pointer`}>{sfx ? 'on' : 'off'}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}