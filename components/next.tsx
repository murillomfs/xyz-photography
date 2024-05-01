'use client'

import Image from 'next/image'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useContext, useEffect, useState } from 'react'

import { AppContext } from '@/contexts/app-context'

import { presentation } from '@/utils/data'

export function Next() {
    const { 
        slides, 
        currentContentIndex, 
        totalImages, 
        isInitial,
        handleNext
    } = useContext(AppContext)

    const [nextSlides, setNextSlides] = useState([presentation.slides[1]])

    useGSAP(() => {
        if(isInitial) return

        gsap.set('.next .slide-active img', { autoAlpha: 0 })
        gsap.to('.next .slide-active', {
            scale: .95,
            duration: 1,
            ease: 'power4.out',
        })
        gsap.to('.next .slide-active img', {
            autoAlpha: 1,
            duration: 1,
            ease: 'power4.out',
            delay: .2
        })
        gsap.to('.next .slide-active', {
            scale: 1,
            duration: 1,
            ease: 'power4.out',
            delay: .2
        })
    }, { dependencies: [slides], revertOnUpdate: true })

    useEffect(() => {
        if(isInitial) return

        setNextSlides([
            presentation.slides[currentContentIndex == totalImages - 1 ? 0 : (currentContentIndex + 1) % totalImages]
        ])
    }, [slides])

    return(
        <div onClick={ handleNext } className="next cursor-pointer fixed top-4 right-4 z-[3]">
            { nextSlides.map((slide: Slide, index: number) => (
                <div key={ index } className={ `${ index == 0 ? 'slide-active' : 'slide-next' } w-[120px] h-[150px] md:w-[180px] md:h-[260px] lg:w-[250px] lg:h-[330px] relative bg-black rounded-[10px]` }>
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