'use client'

import { useInGames } from "@/zustand"
import { useEffect, useState } from "react"
import { request, getShuffle, decode, soundEffects, setHighScore } from "../func";

export default function Question(){
  const { token, num, score, quiz, answered, error, sfx,
  setToken, setNum, setScore, setTime, setQuiz, setAnswered, setMenu, setError } = useInGames()
  const question = quiz[num] && quiz[num]
  const [shuffle, setShuffle] =useState<string[]>([])

  const getToken = () => {
    request('https://opentdb.com/api_token.php?command=request')
    .then((res: any) => {
      if (res.data.response_code === 0) {
        setToken(res.data.token)
        getQuestion()
      } else {
        setError(true)
      }
    }).catch(() => setError(true))
  }

  const getQuestion = () => {
    request(`https://opentdb.com/api.php?amount=${quiz.length ? '1' : '5'}&encode=base64&token=${token}`)
    .then((res: any) => {
      if (res.data.response_code === 0) {
        setQuiz([...quiz, ...res.data.results])
      } else {
        setError(true)
      }
    }).catch(() => setError(true))
  }

  const handleAnswer = (item: string) => {
    const value = 
    decode(question.difficulty) === 'easy' ? 100 :
    decode(question.difficulty) === 'medium' ? 200 :
    decode(question.difficulty) === 'hard' ? 300 : 0

    setAnswered(true)
    const answer = setTimeout(() => {
      setAnswered(false)
      if (item === question.correct_answer) {
        getQuestion()
        setNum(num+1)
        setScore(score + value)
        setAnswered(false)
        setTime(10)
        setHighScore({token: token, score: score + value, correct: num+1, date: new Date().getTime()})
        sfx && soundEffects('success')
      } else {
        setMenu('Game Over')
      }
    }, 500)

    return () => { 
      clearTimeout(answer)
    }
  }

  useEffect(() => {
    if (!token) {
      getToken()
      sfx && soundEffects('start')
    }
  }, [token])

  useEffect(() => {
    question && setShuffle(getShuffle([...question.incorrect_answers, question.correct_answer]))
  }, [question])

  return (question ? <>
    <div className="grid gap-y-1.5 text-center">
      <h1 className='text-lg sm:text-2xl'>{decode(question.category)}</h1>
      <h1 className={`sm:text-xl capitalize selection:${decode(question.difficulty) === 'easy' ? 'text-green-700' : 
      decode(question.difficulty) === 'hard' ? 'text-red-700' : ''}`}>{decode(question.difficulty)}</h1>
    </div>
    <div className='grid grid-cols-2 gap-5 text-blue-950'>
      <div className="bg-blue-400 border border-blue-700 grid place-content-center aspect-[2/1] col-span-2 py-1.5 px-3">
        <h1 className="text-center text-lg sm:text-2xl">{decode(question.question)}</h1>
      </div>
      {shuffle.map((item, i) => 
        <div key={i} onClick={() => {!answered && handleAnswer(item); sfx && soundEffects('click')}} 
        className={`${!answered ? 'bg-blue-400 border border-blue-700' : 
        item === question.correct_answer ? 'bg-green-400 border border-green-700 text-green-950' : 
        'bg-red-400 border border-red-700 text-red-950'} grid content-center cursor-pointer`}>
          <h1 className='text-center py-1.5 px-3 sm:text-xl'>
            {(i+10).toString(36).toUpperCase()}. {decode(item)}
          </h1>
        </div>
      )}
    </div></> 
    : error ? <h1 className='text-lg sm:text-2xl text-center text-red-700'>Something went wrong</h1> :
    <div className="grid gap-y-5 justify-items-center">
      <div className='w-7 aspect-square bg-blue-700 animate-spin mt-3' />
      <h1 className='text-lg sm:text-2xl'>Preparing Your Question</h1>
    </div>
  )
}