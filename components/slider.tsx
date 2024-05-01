'use client'

import { useContext } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

import { AppContext } from '@/contexts/app-context'

import { presentation } from '@/utils/data'

export function Slider() {
    const { 
        slides,  
        currentContentIndex, 
        setIsAnimating,
        isInitial
    } = useContext(AppContext)

    useGSAP(() => {
        gsap.to('.slide-active', {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: 'power4.out'
        })

        gsap.to('.slide-active .slide-title, .slide-active .slide-title-stroke', {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: 'power4.out',
            delay: .6
        }) 

        gsap.to('.slider-control', {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: 'power4.out',
            delay: 1
        })
    })

    useGSAP(() => {
        if(isInitial) return

        gsap.to('.slider .slide-next img', {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: 1.4,
            ease: 'power4.out'
        })

        gsap.to('.slide-active .slide-content', {
            autoAlpha: 0,
            y: -100,
            ease: 'power3.out',
            duration: .5
        })

        gsap.set('.slide-next .slide-content', { y: 100 })
        gsap.to('.slide-next .slide-content', {
            autoAlpha: 1,
            y: 0,
            ease: 'power3.out',
            duration: .5,
            onComplete: () => {
                setTimeout(() => {
                    setIsAnimating(false)
                }, 600)
            }
        })
    }, { dependencies: [slides], revertOnUpdate: true })

    return(
        <div className="slider relative w-full md:w-[412px] lg:w-[512px] h-[430px] md:h-[480px] lg:h-[680px] max-h-[80vh] z-[3]">
            { slides.map((slide: Slide, index: number) => (
                <div key={ index } className={ `slide ${ index == 0 ? 'slide-active' : 'slide-next' } absolute flex items-center justify-center w-full h-full top-0 left-0` }>
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
                        
                        <div className="slide-title slide-content absolute text-white font-semibold text-[80px] md:text-[160px] lg:text-[220px] uppercase tracking-[8px] leading-[80%] text-center" dangerouslySetInnerHTML={{ __html: slide?.project}}></div>
                    </div>

                    <div className="slide-title-stroke slide-content absolute font-semibold text-[80px] md:text-[160px] lg:text-[220px] uppercase tracking-[8px] leading-[80%] text-center" dangerouslySetInnerHTML={{ __html: slide?.project}}></div>
                </div>
            )) }

            <div className="slider-control absolute flex gap-6 items-center w-full justify-center bottom-[100px] md:bottom-[60px] left-0">
                <div className="slider-control-text">
                    <span className="text-white text-[10px] leading-[30px] uppercase">{ currentContentIndex + 1 } of 5</span>
                </div>

                <div className="slider-control-bullets flex gap-2">
                    { presentation.slides.map((_, index: number) => (
                        <span key={ index + 1 } className={ `${ index + 1 == currentContentIndex + 1 ? 'active': '' }` }></span>
                    )) }
                </div>
            </div>
        </div>
    )
}