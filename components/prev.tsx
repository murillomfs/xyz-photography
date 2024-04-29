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
        setSlides, 
        isAnimating,
        isInitial,
        setIsAnimating,
        setCurrentContentIndex,
        fillPercentage,
        setFillPercentage
    } = useContext(AppContext)

    const [prevSlides, setPrevSlides] = useState([presentation.slides[4]])

    useGSAP(() => {
        if(isInitial) return

        gsap.to('.prev .slide-next img', {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: 1,
            ease: 'power4.out',
            delay: .3
        })
    }, { dependencies: [slides], revertOnUpdate: true })

    function handlePrev() {
        if(isAnimating) return

        setIsAnimating(true)
        
        setSlides([
            presentation.slides[currentContentIndex == -1 ? totalImages - 1 : (currentContentIndex) % totalImages],
            presentation.slides[currentContentIndex - 1 == -1 ? totalImages - 1 : (currentContentIndex - 1) % totalImages]
        ])

        setCurrentContentIndex(currentContentIndex - 1 == -1 ? totalImages - 1 : (currentContentIndex - 1) % totalImages)

        if(fillPercentage == 0) {
            setFillPercentage(100 - 20)
        }

        if (fillPercentage > 0) {
            setFillPercentage((prev: number) => prev - 20)
        }
    }

    return(
        <div onClick={ handlePrev } className="prev cursor-pointer fixed bottom-4 left-4 z-[3]">
            { prevSlides.map((slide: Slide, index: number) => (
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