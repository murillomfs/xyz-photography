'use client'

import { useContext } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import { AppContext } from '@/contexts/app-context'

export function Info() {
    const { slides, isInitial } = useContext<App>(AppContext)

    useGSAP(() => {
        gsap.to('.slide-active .mask span', {
            y: 0,
            duration: .6,
            ease: 'power4.out',
            stagger: .1,
            delay: 1.6
        })
        
        gsap.to('.slide-active a', {
            y: 0,
            autoAlpha: 1,
            duration: 1.6,
            ease: 'power4.out',
            stagger: .1,
            delay: 2
        })
    })

    useGSAP(() => {
        if(isInitial) return

        gsap.to('.slide-active .mask span', {
            y: '-100%',
            duration: .6,
            ease: 'power4.out',
            stagger: .1,
            delay: .2
        }) 

        gsap.to('.slide-next .mask span', {
            y: 0,
            duration: .6,
            ease: 'power4.out',
            stagger: .1,
            delay: .6
        })
    }, { dependencies: [slides], revertOnUpdate: true })
    
    return(
        <div className="info fixed bottom-[40px] right-[15px] md:bottom-[60px] md:right-[100px] lg:bottom-[90px] lg:right-[155px] z-[4]">
            { slides?.map((slide: Slide, index: number) => (
                <div key={ index } className={ `${ index == 0 ? 'slide-active' : 'slide-next' } flex flex-col gap-4` }>
                    <div className="flex flex-col">   
                        <div>
                            <div className="mask">
                                { slide?.author.split(' ').map((word: string) => (
                                    <span key={ word }>{ word }</span>
                                )) }
                            </div>
                        </div>

                        <div>
                            <div className="mask">
                                <span>For</span> <span>{ slide?.client }</span>
                            </div>
                        </div>
                    </div>

                    <div className="self-end">
                        <div className="mask">
                            <span>{ slide?.month }</span> <span>{ slide?.year }</span>
                        </div>
                    </div>

                    <div>
                        <div>
                            <a href={ slide?.url } target="_blank" className="inline-flex items-center justify-center min-w-[110px] h-[30px] bg-white text-black text-[10px] leading-[12px] tracking-[.8px] uppercase rounded-full text-bold transition-colors hover:bg-black hover:text-white">Have a look</a>
                        </div>
                    </div>
                </div>
            )) }
        </div>
    )
}