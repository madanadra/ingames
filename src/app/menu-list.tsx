'use client'

import { useInGames } from '../zustand';
import { soundEffects } from './func';

export default function MenuList({name}: {name: string}) {
    const { sfx, setMenu } = useInGames()

    return (
        <h1 onClick={() => {setMenu(name); sfx && soundEffects('click')}} className='cursor-pointer p-1'>{name}</h1>
    )
}