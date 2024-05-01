'use client'

import { useContext, useEffect, useRef } from 'react'
import gsap from 'gsap'

import { AppContext } from '@/contexts/app-context'

export function Cursor() {
    const { fillPercentage, setFillPercentage } = useContext(AppContext)
    
    const size = 4 
    const circle = useRef<any>()
    const progress = useRef<any>()
    const mouse = useRef({
        x: 0,
        y: 0
    })
    const delayedMouse = useRef({
        x: 0,
        y: 0
    })

    function lerp(x: number, y: number, a: number) {
        return x * (1 - a) + y * a
    }

    function handleMouseMove(e: MouseEvent) {
        const { clientX, clientY } = e

        mouse.current = {
            x: clientX,
            y: clientY
        }
    }

    function moveCircle(x: number, y: number) {
        gsap.set(circle.current, {
            x,
            y,
            xPercent: -50,
            yPercent: -50
        })

        gsap.set(progress.current, {
            xPercent: -46,
            yPercent: -46
        })
    }

    function animate() {
        const { x, y } = delayedMouse.current

        delayedMouse.current = {
            x: lerp(x, mouse.current.x, 0.175),
            y: lerp(y, mouse.current.y, 0.175)
        }

        moveCircle(delayedMouse.current.x, delayedMouse.current.y)
        window.requestAnimationFrame(animate)
    }

    useEffect(() => {
        gsap.to('#buttonFill', {
          strokeDashoffset: 301.59 * (1 - fillPercentage / 100),
          duration: 0.5
        });

        setTimeout(() => {
            if(fillPercentage == 100) {
                setFillPercentage(0)
            }
        }, 600)

        console.log(fillPercentage)
    }, [fillPercentage])

    useEffect(() => {
        animate()

        window.addEventListener('mousemove', handleMouseMove)

        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return(
        <>
            <div 
                ref={ circle } 
                className="fixed top-0 left-0 opacity-0 md:opacity-100 bg-[#fff] rounded-full pointer-events-none z-[6]" 
                style={{width: size, height: size, transition: 'all .3s ease-out' }}
            >
                <svg ref={ progress } className="relative" width="42" height="42" viewBox="0 0 100 100">
                    <circle 
                        id="buttonFill" 
                        cx="50" 
                        cy="50" 
                        r="48" 
                        stroke="white" 
                        strokeWidth="1" 
                        fill="transparent" 
                        strokeDasharray="301.59" 
                        strokeDashoffset="301.59"
                        transform="rotate(-90 50 50)"
                    />

                    <circle 
                        cx="50" 
                        cy="50" 
                        r="48" 
                        stroke="white" 
                        strokeWidth="1" 
                        fill="transparent"
                        className="opacity-10"
                        transform="rotate(-90 50 50)"
                    />
                </svg>
            </div>
        </>
    ) 
}