import type { Metadata } from 'next'
import QuizPage from './quiz'

export const metadata: Metadata = {
  title: 'Quiz - InGames',
}

export default function Quiz() {
  return <QuizPage />
}
