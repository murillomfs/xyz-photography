'use client'

import React, { createContext, useEffect, useState } from 'react'

import { app, presentation } from '@/utils/data'

export const AppContext = createContext<App>(app)

export function AppContextProvider({ children }: { children: React.ReactNode }) {
    const [fillPercentage, setFillPercentage] = useState(0)
    const [currentContentIndex, setCurrentContentIndex] = useState(0)
    const [totalImages] = useState(presentation.slides.length)
    const [slides, setSlides] = useState([presentation.slides[0]])
    const [isAnimating, setIsAnimating] = useState(false)
    const [isInitial, setIsInitial] = useState(true)

    useEffect(() => {
        console.log(currentContentIndex)
        if(isInitial) return
    }, [currentContentIndex])

    useEffect(() => {
        setIsInitial(false)
    }, [])

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
            setFillPercentage
        }}>
            { children }
        </AppContext.Provider>
    )
}