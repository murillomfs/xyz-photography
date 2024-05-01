'use client'

import { useContext } from 'react'

import { Cursor } from '@/components/cursor'
import { Logo } from '@/components/logo'
import { Preload } from '@/components/preload'
import { Info } from '@/components/info'
import { Slider } from '@/components/slider'
import { Prev } from '@/components/prev'
import { Next } from '@/components/next'
import { Background } from '@/components/background'

import { AppContext } from '@/contexts/app-context'

export default function Home() {
  const { init } = useContext<App>(AppContext)
  
  return (
    <main className="w-full h-screen p-4 flex items-center justify-center bg-black overflow-hidden">
      <Cursor />
      
      <Logo />
      <Preload />

      { init && (
        <>
          <Info />
          <Slider />
          <Prev />
          <Next />
          <Background />
        </>
      ) }
    </main>
  )
}
