'use client'

import React, { WheelEvent, createContext, useEffect, useState } from 'react'

import { app, presentation } from '@/utils/data'

export const AppContext = createContext<App>(app)

export function AppContextProvider({ children }: { children: React.ReactNode }) {
    const [fillPercentage, setFillPercentage] = useState(0)
    const [currentContentIndex, setCurrentContentIndex] = useState(0)
    const [totalImages] = useState(presentation.slides.length)
    const [slides, setSlides] = useState([presentation.slides[0]])
    const [isAnimating, setIsAnimating] = useState(false)
    const [isInitial, setIsInitial] = useState(true)
    const [wheelTimeout, setWheelTimeout] = useState(false)

    useEffect(() => {
        console.log(currentContentIndex)
        if(isInitial) return
    }, [currentContentIndex])

    useEffect(() => {
        setIsInitial(false)
    }, [])

    function handleWheel(event: WheelEvent) {
        if (!wheelTimeout) {
            if (event.deltaY < 0) {
                setTimeout(() => {
                    handlePrev()
                }, 200)
            } else if (event.deltaY > 0) {
                setTimeout(() => {
                    handleNext()
                }, 200)
            }

            setWheelTimeout(true)
            setTimeout(() => {
                setWheelTimeout(false)
            }, 2000)
        }
    }

    function handlePrev() {
        if(isAnimating) return

        setIsAnimating(true)
        
        setSlides([
            presentation.slides[currentContentIndex == -1 ? totalImages - 1 : (currentContentIndex) % totalImages],
            presentation.slides[currentContentIndex - 1 == -1 ? totalImages - 1 : (currentContentIndex - 1) % totalImages]
        ])

        setCurrentContentIndex(currentContentIndex - 1 == -1 ? totalImages - 1 : (currentContentIndex - 1) % totalImages)

        if(fillPercentage == 0) {
            setFillPercentage(100 - (100 / totalImages))
        }

        if (fillPercentage > 0) {
            setFillPercentage((prev: number) => prev - (100 / totalImages))
        }
    }

    function handleNext() {
        if(isAnimating) return

        setIsAnimating(true)

        setSlides([
            presentation.slides[(currentContentIndex) % totalImages],
            presentation.slides[(currentContentIndex + 1) % totalImages]
        ])

        setCurrentContentIndex((currentContentIndex + 1) % totalImages)

        if (fillPercentage < 100) {
            setFillPercentage((prev: number) => prev + (100 / totalImages))
        }
    }

    return (
        <AppContext.Provider value={{ 
            fillPercentage,
            slides,
            totalImages,
            currentContentIndex,
            isAnimating,
            isInitial,
            setSlides,
            setCurrentContentIndex,
            setIsAnimating,
            setFillPercentage,
            handlePrev,
            handleNext
        }}>
            <div onWheel={handleWheel}>
                { children }
            </div>
        </AppContext.Provider>
    )
}