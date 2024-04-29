'use client'

import Image from 'next/image'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useContext, useState } from 'react'

import { AppContext } from '@/contexts/app-context'

import { presentation } from '@/utils/data'

export function Next() {
    const { 
        slides, 
        currentContentIndex, 
        totalImages, 
        setSlides, 
        isAnimating,
        isInitial,
        setIsAnimating,
        setCurrentContentIndex,
        fillPercentage,
        setFillPercentage
    } = useContext(AppContext)

    const [nextSlides] = useState([presentation.slides[1]])

    useGSAP(() => {
        if(isInitial) return

        gsap.to('.next .slide-next img', {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: 1,
            ease: 'power4.out',
            delay: .3
        })
    }, { dependencies: [slides], revertOnUpdate: true })

    function handleNext() {
        if(isAnimating) return

        setIsAnimating(true)

        setSlides([
            presentation.slides[(currentContentIndex) % totalImages],
            presentation.slides[(currentContentIndex + 1) % totalImages]
        ])

        setCurrentContentIndex((currentContentIndex + 1) % totalImages)

        if (fillPercentage < 100) {
            setFillPercentage((prev: number) => prev + 20)
        }
    }

    return(
        <div onClick={ handleNext } className="next cursor-pointer fixed top-4 right-4 z-[3]">
            { nextSlides.map((slide: Slide, index: number) => (
                <div key={ index } className={ `${ index == 0 ? 'slide-active' : 'slide-next' } w-[248px] h-[330px] relative` }>
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