'use client'

import Question from './question'
import Header from './header'
import GameOver from './game-over'

export default function QuizPage() {
    return (
        <div className='min-h-screen py-10 px-5 relative'>
            <div className='grid gap-y-7 w-full max-w-xl mx-auto'>
                <Header />
                <Question />
            </div>
            <GameOver />
        </div>
    )
}