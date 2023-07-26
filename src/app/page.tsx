import type { Metadata } from 'next'
import HomePage from './home'

export const metadata: Metadata = {
  title: 'Menu - InGames',
}

export default function Home() {
  return <HomePage />
}
