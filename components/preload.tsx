import { useContext, useEffect, useState } from 'react'
import * as PreloadIt from 'preload-it'
import gsap from 'gsap'

import { presentation } from '@/utils/data'

import { AppContext } from '@/contexts/app-context'

export function Preload() {
    const { setInit, setIsInitial } = useContext<App>(AppContext)
    
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const preload = PreloadIt()

        preload.fetch(presentation.slides.map((slide) => slide.image))

        preload.oncomplete = () => {
            gsap.to('.preload', {
                autoAlpha: 0,
                duration: 2,
                ease: 'power4.out',
                delay: .6
            })

            gsap.to('.preload-progress span', {
                y: '-100%',
                duration: .6,
                ease: 'power4.out',
                stagger: .1,
                delay: .6
            }) 

            setInit(true)
            
            setTimeout(() => {
                setIsInitial(false)
            }, 1000)
        }
        
        preload.onprogress = (event: any) => {
            setProgress(event.progress)
        }
    }, [])

    return(
        <div className="preload fixed w-full h-screen top-0 left-0 p-4 z-[8] text-white bg-black leading-[20px] text-base uppercase tracking-[2px]">
            <div className="preload-progress fixed h-[20px] leading-[20px] gap-1 inline-flex items-center justify-center text-base uppercase top-4 left-4 z-[3] text-white tracking-[2px] overflow-hidden">
                <span>{ progress }</span>
                <span>%</span>
            </div>
        </div>
    )
}