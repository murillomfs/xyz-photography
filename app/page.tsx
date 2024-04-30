'use client'

import Preload from 'preload-it'

import { Cursor } from '@/components/cursor'
import { Logo } from '@/components/logo'
import { Info } from '@/components/info'
import { Slider } from '@/components/slider'
import { Prev } from '@/components/prev'
import { Next } from '@/components/next'
import { Background } from '@/components/background'
import { useEffect, useState } from 'react'
import gsap from 'gsap'

const preload = Preload()

preload.fetch([
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
])

export default function Home() {
  const [progress, setProgress] = useState(0)
  const [init, setInit] = useState(false)

  useEffect(() => {
    preload.oncomplete = (items: any) => {
      gsap.to('.progress', {
        autoAlpha: 0,
        duration: 1
      })

      setInit(true)
    }
    
    preload.onprogress = (event: any) => {
      setProgress(event.progress)
    }
  }, [progress])
  
  return (
    <main className="w-full h-screen p-4 flex items-center justify-center bg-black overflow-hidden">
      <Cursor />

      <div className="progress fixed top-4 left-4 z-[8] text-white">{ progress }%</div>

      { init && (
        <>
          <Logo />
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
