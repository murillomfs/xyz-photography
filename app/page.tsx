import { Cursor } from '@/components/cursor'
import { Logo } from '@/components/logo'
import { Info } from '@/components/info'
import { Slider } from '@/components/slider'
import { Prev } from '@/components/prev'
import { Next } from '@/components/next'
import { Background } from '@/components/background'

export default function Home() {
  return (
    <main className="w-full h-screen p-4 flex items-center justify-center bg-black overflow-hidden">
      <Cursor />

      <Logo />
      <Info />
      <Slider />
      <Prev />
      <Next />
      <Background />
    </main>
  )
}
