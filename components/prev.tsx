'use client'

import Image from 'next/image'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useContext, useEffect, useState } from 'react'

import { AppContext } from '@/contexts/app-context'

import { presentation } from '@/utils/data'

export function Prev() {
    const { 
        slides, 
        currentContentIndex, 
        totalImages, 
        handlePrev,
        isInitial
    } = useContext(AppContext)

    const [prevSlides, setPrevSlides] = useState([presentation.slides[totalImages - 1]])

    useGSAP(() => {
        if(isInitial) return

        gsap.set('.prev .slide-active img', { autoAlpha: 0 })
        gsap.to('.prev .slide-active', {
            scale: .95,
            duration: 1,
            ease: 'power4.out',
        })
        gsap.to('.prev .slide-active img', {
            autoAlpha: 1,
            duration: 1,
            ease: 'power4.out',
            delay: .2
        })
        gsap.to('.prev .slide-active', {
            scale: 1,
            duration: 1,
            ease: 'power4.out',
            delay: .2
        })
    }, { dependencies: [slides], revertOnUpdate: true })

    useEffect(() => {
        if(isInitial) return

        setPrevSlides([
            presentation.slides[currentContentIndex == 0 ? totalImages - 1 : (currentContentIndex - 1) % totalImages],
        ])
    }, [slides])

    return(
        <div onClick={ handlePrev } className="prev cursor-pointer fixed bottom-4 left-4 z-[3]">
            { prevSlides.map((slide: Slide, index: number) => (
                <div key={ index } className={ `${ index == 0 ? 'slide-active' : 'slide-next' } bg-black w-[248px] h-[330px] relative rounded-[10px]` }>
                    <div className="slide-image absolute flex items-center justify-center w-full h-full top-0 left-0 border-black border rounded-[10px] overflow-hidden">
                        <Image 
                            src={ slide?.image }
                            className="w-full h-full object-cover absolute"
                            width={ 512 } 
                            height={ 680 } 
                            alt={ slide?.client }
                            aria-hidden 
                            priority
                        />
                    </div>
                </div>
            )) }
        </div>
    )
}