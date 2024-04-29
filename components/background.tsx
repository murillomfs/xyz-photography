'use client'

import { useContext } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import { AppContext } from '@/contexts/app-context'

export function Background() {
    const { slides, isInitial } = useContext(AppContext)

    useGSAP(() => {
        if(isInitial) return

        gsap.to('.layer .slide-next', {
            autoAlpha: 1,
            duration: 2.6,
            delay: .2,
            ease: 'power4.out'
        })
    }, { dependencies: [slides], revertOnUpdate: true })

    return(
        <div>
            <div className="layer-blur fixed top-0 left-0 w-full h-screen z-[2]"></div>
            
            <div className="layer fixed flex items-center justify-center top-0 left-0 w-full h-screen z-[1]">
                { slides.map((slide: Slide, index: number) => (
                    <Image
                        key={ index } 
                        src={ slide?.image }
                        className={ `${ index == 0 ? 'slide-active' : 'slide-next' } w-full h-full object-cover absolute` }
                        width={ 1024 }
                        height={ 1360 }
                        alt={ slide?.client }
                        aria-hidden
                        priority
                    />
                )) }
            </div>
        </div>
    )
}