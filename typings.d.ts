interface Settings {
    name: string
}

interface Slide {
    project: string | TrustedHTML
    author: string
    client: string
    month: string
    year: string
    image: string
    url: string
}

interface Presentation {
    settings: Settings
    slides: Slide[]
}

interface App {
    fillPercentage: number,
    slides: Slide[]
    totalImages: number
    currentContentIndex: number
    isAnimating: boolean,
    isInitial: boolean,
    init: boolean,
    setFillPercentage: Dispatch<SetStateAction<number>>
    setSlides: Dispatch<SetStateAction<Slide[]>>
    setCurrentContentIndex: Dispatch<SetStateAction<number>>
    setIsAnimating: Dispatch<SetStateAction<boolean>>,
    setIsInitial: Dispatch<SetStateAction<boolean>>,
    setInit: Dispatch<SetStateAction<boolean>>,
    handlePrev: () => void,
    handleNext: () => void
}

declare module 'preload-it'