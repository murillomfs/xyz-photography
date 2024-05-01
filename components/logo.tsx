'use client'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import { presentation } from '@/utils/data'

export function Logo() {
    useGSAP(() => {
        gsap.to('.logo span', {
            y: 0,
            duration: .6,
            ease: 'power4.out',
            stagger: .1,
            delay: .6
        }) 
    })

    return(
        <div className="logo fixed h-[20px] leading-[20px] gap-1 inline-flex items-center justify-center text-base uppercase top-4 left-4 z-[3] text-white tracking-[2px] overflow-hidden">
            { presentation.settings.name.split(' ').map((item: string) => (
                <span key={ item } className="translate-y-full">{ item }</span>
            )) }
        </div>
    )
}